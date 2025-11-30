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
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getFontSizeClass = () => {
        switch (settings.timerFontSize) {
            case 'Small': return 'text-6xl md:text-7xl';
            case 'Medium': return 'text-7xl md:text-[7rem] leading-none';
            case 'Large': return 'text-8xl md:text-[9rem] leading-none';
            case 'Extra Large': return 'text-9xl md:text-[11rem] leading-none';
            default: return 'text-8xl md:text-[9rem] leading-none';
        }
    };

    const getLabelSizeClass = () => {
        switch (settings.timerFontSize) {
            case 'Small': return 'text-2xl md:text-3xl';
            case 'Medium': return 'text-3xl md:text-5xl';
            case 'Large': return 'text-4xl md:text-6xl';
            case 'Extra Large': return 'text-5xl md:text-7xl';
            default: return 'text-4xl md:text-6xl';
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
            className={`relative w-full h-full flex flex-col justify-center overflow-hidden cursor-pointer group transition-all duration-500 rounded-3xl border border-white/5 ${isActive
                ? 'ring-2 ring-neon-blue shadow-[0_0_50px_rgba(0,243,255,0.3)] z-10 scale-[1.01]'
                : 'hover:border-white/20 hover:bg-white/5'
                }`}
        >
            {/* Base Card Background with Glassmorphism */}
            <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl" />

            {/* Background Image with Opacity Control */}
            {timer.backgroundUrl && (
                <img
                    src={timer.backgroundUrl}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 mix-blend-overlay"
                    style={{
                        opacity: settings.timerBackgroundOpacity / 100
                    }}
                />
            )}

            {/* Gradient Overlay for Readability */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 transition-opacity duration-500 ${isActive ? 'opacity-90' : 'opacity-70'}`} />

            {/* Active State Glow Effects */}
            {isActive && (
                <>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent shadow-[0_0_20px_#00f3ff]" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent shadow-[0_0_20px_#00f3ff]" />
                </>
            )}

            {/* Content Overlay */}
            <div className={`relative z-10 w-full h-full flex flex-col items-center ${getPositionClass()} p-8 transition-all`}>

                {/* Label */}
                <div className={`mb-4 md:mb-8 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md transition-all duration-500 ${isActive ? 'bg-neon-blue/10 border-neon-blue/30' : 'bg-black/40'}`}>
                    <span
                        className={`font-rajdhani font-bold uppercase tracking-[0.2em] ${getLabelSizeClass()} drop-shadow-lg transition-colors duration-300`}
                        style={{ color: isActive ? 'var(--color-neon-blue)' : 'rgba(255,255,255,0.7)' }}
                    >
                        {timer.label}
                    </span>
                </div>

                {/* Time Display */}
                <div
                    className={`font-orbitron font-black tabular-nums tracking-wider drop-shadow-2xl transition-all duration-300 ${getFontSizeClass()}`}
                    style={{
                        color: settings.timerTextColor,
                        textShadow: isActive ? `0 0 30px ${settings.timerTextColor}80` : 'none',
                        filter: isActive ? 'brightness(1.2)' : 'brightness(1)'
                    }}
                >
                    {formatTime(timer.remainingSeconds)}
                </div>

                {/* Controls (Visible on Hover or Active) */}
                <div className={`mt-8 flex gap-6 transition-all duration-300 ${isActive || 'group-hover:opacity-100 opacity-0 translate-y-4 group-hover:translate-y-0'}`}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggle(); }}
                        className={`p-4 rounded-full backdrop-blur-md border shadow-xl transition-all hover:scale-110 active:scale-95 ${isActive
                            ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                            : 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue hover:bg-neon-blue hover:text-black hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]'
                            }`}
                    >
                        {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onReset(); }}
                        className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-400 shadow-xl transition-all hover:scale-110 hover:bg-white/10 hover:text-white hover:border-white/30 active:scale-95"
                    >
                        <RotateCcw size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
};
