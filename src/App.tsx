import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerConfig, AppSettings } from './types';
import { TimerGrid } from './components/TimerGrid';
import { Settings } from './components/Settings';
import { useRemoteNavigation } from './hooks/useRemoteNavigation';
import { Settings as SettingsIcon } from 'lucide-react';

const DEFAULT_SETTINGS: AppSettings = {
  defaultDurationMinutes: 50,
  numberOfTimers: 4,
  fontTheme: 'Modern',
  timerTextColor: '#ffffff',
  timerFontSize: 'Large',
  timerTextPosition: 'Center',
  timerBackgroundOpacity: 50,
};

function App() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [timers, setTimers] = useState<TimerConfig[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<number>(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true); // Default to Setup screen
  const [settingsIndex, setSettingsIndex] = useState(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Timers based on settings (Non-destructive)
  useEffect(() => {
    setTimers(prev => {
      const currentCount = prev.length;
      const targetCount = settings.numberOfTimers;

      if (currentCount === targetCount) return prev;

      if (currentCount < targetCount) {
        // Add new timers
        const newTimers = [...prev];
        for (let i = currentCount; i < targetCount; i++) {
          newTimers.push({
            id: i + 1,
            durationSeconds: settings.defaultDurationMinutes * 60,
            remainingSeconds: settings.defaultDurationMinutes * 60,
            isRunning: false,
            label: `Table ${i + 1}`,
          });
        }
        return newTimers;
      } else {
        // Remove timers (from the end)
        return prev.slice(0, targetCount);
      }
    });
  }, [settings.numberOfTimers]);

  // Update timers when default duration changes
  useEffect(() => {
    setTimers(prev => prev.map(t => ({
      ...t,
      durationSeconds: settings.defaultDurationMinutes * 60,
      remainingSeconds: settings.defaultDurationMinutes * 60,
      isRunning: false
    })));
  }, [settings.defaultDurationMinutes]);

  // Font Theme Classes
  const fontClasses = {
    'Modern': 'font-[Inter]',
    'Retro': 'font-[\'JetBrains_Mono\']',
    'Gothic': 'font-[Cinzel]',
  };

  // Timer Tick Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(currentTimers =>
        currentTimers.map(timer => {
          if (timer.isRunning && timer.remainingSeconds > 0) {
            const nextSeconds = timer.remainingSeconds - 1;
            if (nextSeconds === 0) {
              playAlert();
            }
            return { ...timer, remainingSeconds: nextSeconds };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio Alert
  const playAlert = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, []);

  // Navigation Handlers
  const handleUp = () => {
    if (isSettingsOpen) {
      setSettingsIndex(prev => Math.max(0, prev - 1));
    } else {
      // Grid navigation logic (simplified for 2x2)
      if (activeTimerId > 2) setActiveTimerId(prev => prev - 2);
    }
  };

  const handleDown = () => {
    if (isSettingsOpen) {
      setSettingsIndex(prev => Math.min(3, prev + 1)); // 3 is "Start Timers"
    } else {
      if (activeTimerId <= timers.length - 2) setActiveTimerId(prev => prev + 2);
    }
  };

  const handleLeft = () => {
    if (isSettingsOpen) {
      // Change setting value logic
      handleSettingChange(-1);
    } else {
      if (activeTimerId % 2 === 0) setActiveTimerId(prev => prev - 1);
    }
  };

  const handleRight = () => {
    if (isSettingsOpen) {
      handleSettingChange(1);
    } else {
      if (activeTimerId % 2 !== 0 && activeTimerId < timers.length) setActiveTimerId(prev => prev + 1);
    }
  };

  const handleEnter = () => {
    if (isSettingsOpen) {
      if (settingsIndex === 3) { // Start Timers
        setIsSettingsOpen(false);
      }
    } else {
      toggleTimer(activeTimerId);
    }
  };

  const handleBack = () => {
    if (isSettingsOpen) {
      // Already at home, do nothing or maybe show exit prompt?
    } else {
      setIsSettingsOpen(true); // Return to Setup
    }
  };

  // Helper for settings changes
  const handleSettingChange = (direction: number) => {
    // Logic to cycle through options based on settingsIndex
    // This is a bit complex to inline, but let's do a simple version
    const currentSetting = settingsIndex;
    if (currentSetting === 0) { // Number of Timers
      const opts = [1, 2, 3, 4];
      const idx = opts.indexOf(settings.numberOfTimers);
      const newIdx = (idx + direction + opts.length) % opts.length;
      setSettings(s => ({ ...s, numberOfTimers: opts[newIdx] as 1 | 2 | 3 | 4 }));
    } else if (currentSetting === 1) { // Duration
      const opts = [30, 45, 50, 60, 90];
      const idx = opts.indexOf(settings.defaultDurationMinutes);
      const newIdx = (idx + direction + opts.length) % opts.length;
      setSettings(s => ({ ...s, defaultDurationMinutes: opts[newIdx] }));
    }
  };

  const toggleTimer = (id: number) => {
    setTimers(prev => prev.map(t => {
      if (t.id === id) {
        if (t.remainingSeconds === 0) return t; // Don't start if finished
        return { ...t, isRunning: !t.isRunning };
      }
      return t;
    }));
  };

  const resetTimer = (id: number) => {
    setTimers(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, isRunning: false, remainingSeconds: settings.defaultDurationMinutes * 60 };
      }
      return t;
    }));
  };

  const updateTimer = (id: number, updates: Partial<TimerConfig>) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  useRemoteNavigation({
    onUp: handleUp,
    onDown: handleDown,
    onLeft: handleLeft,
    onRight: handleRight,
    onEnter: handleEnter,
    onBack: handleBack,
  });

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black text-white transition-all duration-500 ${fontClasses[settings.fontTheme]}`}
    >

      {!isSettingsOpen && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-50">
          <SettingsIcon size={20} />
          <span className="text-sm">Press BACK for Setup</span>
        </div>
      )}

      {!isSettingsOpen ? (
        <div className="relative z-10 w-full h-full">
          <TimerGrid
            timers={timers}
            activeTimerId={activeTimerId}
            settings={settings}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </div>
      ) : (
        <Settings
          settings={settings}
          timers={timers}
          onUpdateSettings={setSettings}
          onUpdateTimer={updateTimer}
          onClose={() => setIsSettingsOpen(false)}
          activeSettingIndex={settingsIndex}
        />
      )}
    </div>
  );
}

export default App;
