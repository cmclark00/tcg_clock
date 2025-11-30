import React from 'react';
import type { TimerConfig, AppSettings } from '../types';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
    timer: TimerConfig;
    isActive: boolean;
    settings: AppSettings;
    onToggle: () => void;
    onReset: () => void;
}

export const Timer: React.FC<TimerProps> = ({
    timer,
    isActive,
    settings,
    onToggle,
    onReset
}) => {
    console.log(`Timer ${timer.id} Render:`, {
        url: timer.backgroundUrl,
        opacity: settings.timerBackgroundOpacity,
        settings
    });
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getFontSizeClass = () => {
        switch (settings.timerFontSize) {
            case 'Small': return 'text-7xl';
            case 'Medium': return 'text-[7rem] leading-none';
            case 'Large': return 'text-[9rem] leading-none';
            case 'Extra Large': return 'text-[11rem] leading-none';
            default: return 'text-[9rem] leading-none';
        }
    };

    const getLabelSizeClass = () => {
        switch (settings.timerFontSize) {
            case 'Small': return 'text-3xl';
            case 'Medium': return 'text-5xl';
            case 'Large': return 'text-6xl';
            case 'Extra Large': return 'text-7xl';
            default: return 'text-6xl';
        }
    };

    const getPositionClass = () => {
        switch (settings.timerTextPosition) {
            case 'Top': return 'justify-start pt-12';
            case 'Bottom': return 'justify-end pb-12';
            case 'Center': return 'justify-center';
            default: return 'justify-center';
        }
    };

    return (
        <div
            onClick={onToggle}
            className={`relative w-full h-full flex flex-col justify-center overflow-hidden cursor-pointer group transition-all duration-500 ${isActive
                ? 'ring-4 ring-blue-500 shadow-[0_0_100px_rgba(59,130,246,0.5)] z-10 scale-[1.02]'
                : 'opacity-80 hover:opacity-100 hover:scale-[1.01]'
                }`}
        >
            {/* Base Card Background */}
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" />

            {/* Background Image with Opacity Control */}
            {timer.backgroundUrl && (
                <img
                    src={timer.backgroundUrl}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    style={{
                        opacity: settings.timerBackgroundOpacity / 100
                    }}
                />
            )}

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* Content Overlay */}
            <div className={`relative z-10 w-full h-full flex flex-col items-center ${getPositionClass()} p-8 transition-all`}>

                {/* Label */}
                <div className="mb-8 px-8 py-2 bg-black/40 rounded-full backdrop-blur-xl border border-white/10 shadow-lg">
                    <span
                        className={`font-black uppercase tracking-[0.2em] ${getLabelSizeClass()} drop-shadow-lg`}
                        style={{ color: settings.timerTextColor }}
                    >
                        {timer.label}
                    </span>
                </div>

                {/* Time Display */}
                <div
                    className={`font-black tabular-nums tracking-tighter drop-shadow-2xl transition-all duration-300 ${getFontSizeClass()}`}
                    style={{
                        color: settings.timerTextColor,
                        textShadow: isActive ? '0 0 40px rgba(255,255,255,0.3)' : 'none'
                    }}
                >
                    {formatTime(timer.remainingSeconds)}
                </div>

                {/* Controls (Visible on Hover or Active) */}
                <div className={`mt-8 flex gap-4 transition-all duration-300 ${isActive || 'group-hover:opacity-100 opacity-0'}`}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggle(); }}
                        className={`p-4 rounded-full backdrop-blur-md border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 ${isActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onReset(); }}
                        className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
                    >
                        <RotateCcw size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
};
