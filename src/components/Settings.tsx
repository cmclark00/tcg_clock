import React, { useState } from 'react';
import type { AppSettings, TimerConfig } from '../types';
import { Settings as SettingsIcon, Layout, Type, Clock, Palette, Monitor, ChevronRight, Check } from 'lucide-react';

interface SettingsProps {
    settings: AppSettings;
    timers: TimerConfig[];
    onUpdateSettings: (newSettings: AppSettings) => void;
    onUpdateTimer: (timerId: number, updates: Partial<TimerConfig>) => void;
    onClose: () => void;
    activeSettingIndex: number;
}

export const Settings: React.FC<SettingsProps> = ({
    settings,
    timers,
    onUpdateSettings,
    onUpdateTimer,
    onClose,
}) => {
    const [activeTab, setActiveTab] = useState<'global' | 'tables'>('global');
    const [selectedTimerId, setSelectedTimerId] = useState<number>(1);

    const backgroundPresets = [
        { name: 'None', url: '' },
        { name: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=2574&auto=format&fit=crop' },
        { name: 'Neon City', url: 'https://images.unsplash.com/photo-1565626424178-c699f6601afd?q=80&w=2574&auto=format&fit=crop' },
        { name: 'Matrix', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop' },
        { name: 'Abstract', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop' },
    ];

    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl text-white z-50 flex overflow-hidden font-rajdhani">
            {/* Sidebar */}
            <div className="w-80 bg-[#0a0a0a]/90 border-r border-white/10 flex flex-col p-6 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="p-2 bg-neon-blue/10 border border-neon-blue/30 rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                        <SettingsIcon size={24} className="text-neon-blue" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-wider text-white">SYSTEM<br /><span className="text-neon-blue">CONFIG</span></h1>
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    <button
                        onClick={() => setActiveTab('global')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border ${activeTab === 'global'
                            ? 'bg-neon-blue/10 border-neon-blue/50 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.1)]'
                            : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Layout size={20} />
                        <span className="font-bold tracking-wide">GLOBAL SETTINGS</span>
                        {activeTab === 'global' && <ChevronRight size={16} className="ml-auto opacity-50" />}
                    </button>

                    <button
                        onClick={() => setActiveTab('tables')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border ${activeTab === 'tables'
                            ? 'bg-neon-purple/10 border-neon-purple/50 text-neon-purple shadow-[0_0_15px_rgba(188,19,254,0.1)]'
                            : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Monitor size={20} />
                        <span className="font-bold tracking-wide">TABLE CONFIG</span>
                        {activeTab === 'tables' && <ChevronRight size={16} className="ml-auto opacity-50" />}
                    </button>
                </nav>

                <button
                    onClick={onClose}
                    className="mt-auto w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/50 font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                    <Check size={20} />
                    <span>Initialize Event</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#050505] to-[#0a0a0a] p-12">
                <div className="max-w-4xl mx-auto animate-fadeIn">

                    {activeTab === 'global' && (
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-bold mb-2 font-orbitron tracking-wider text-white">GLOBAL SETTINGS</h2>
                                <p className="text-gray-400 font-medium">Configure system-wide parameters and visual themes.</p>
                            </div>

                            {/* Section: Game Rules */}
                            <section className="space-y-6">
                                <h3 className="text-sm font-bold text-neon-blue uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/10 pb-2">
                                    <Clock size={16} /> Game Rules
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Active Tables</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(num => (
                                                <button
                                                    key={num}
                                                    onClick={() => onUpdateSettings({ ...settings, numberOfTimers: num as 1 | 2 | 3 | 4 })}
                                                    className={`h-14 w-14 rounded-lg font-bold text-xl transition-all border ${settings.numberOfTimers === num
                                                        ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                                                        : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Round Duration</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[30, 45, 50, 60, 90].map(mins => (
                                                <button
                                                    key={mins}
                                                    onClick={() => onUpdateSettings({ ...settings, defaultDurationMinutes: mins })}
                                                    className={`px-6 py-3 rounded-lg font-bold transition-all border ${settings.defaultDurationMinutes === mins
                                                        ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                                                        : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                                                        }`}
                                                >
                                                    {mins}m
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Typography */}
                            <section className="space-y-6">
                                <h3 className="text-sm font-bold text-neon-blue uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/10 pb-2">
                                    <Type size={16} /> Typography
                                </h3>
                                <div className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Font Theme</label>
                                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                            {['Sci-Fi', 'Industrial', 'Modern', 'Retro', 'Gothic'].map(font => (
                                                <button
                                                    key={font}
                                                    onClick={() => onUpdateSettings({ ...settings, fontTheme: font as any })}
                                                    className={`py-4 rounded-xl font-bold transition-all border ${settings.fontTheme === font
                                                        ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                                                        : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                                                        }`}
                                                >
                                                    {font}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Text Color</label>
                                            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/10">
                                                <input
                                                    type="color"
                                                    value={settings.timerTextColor}
                                                    onChange={(e) => onUpdateSettings({ ...settings, timerTextColor: e.target.value })}
                                                    className="h-10 w-10 rounded cursor-pointer bg-transparent border-none"
                                                />
                                                <span className="text-lg font-mono text-gray-300">{settings.timerTextColor}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Font Size</label>
                                            <select
                                                value={settings.timerFontSize}
                                                onChange={(e) => onUpdateSettings({ ...settings, timerFontSize: e.target.value as any })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-gray-300 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all"
                                            >
                                                {['Small', 'Medium', 'Large', 'Extra Large'].map(size => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Vertical Position</label>
                                        <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                                            {['Top', 'Center', 'Bottom'].map(pos => (
                                                <button
                                                    key={pos}
                                                    onClick={() => onUpdateSettings({ ...settings, timerTextPosition: pos as any })}
                                                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all uppercase tracking-wide ${settings.timerTextPosition === pos
                                                        ? 'bg-gray-700 text-white shadow-lg'
                                                        : 'text-gray-500 hover:text-gray-300'
                                                        }`}
                                                >
                                                    {pos}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Appearance */}
                            <section className="space-y-6">
                                <h3 className="text-sm font-bold text-neon-blue uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/10 pb-2">
                                    <Palette size={16} /> Appearance
                                </h3>
                                <div className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Background Opacity</label>
                                            <span className="text-sm font-mono text-neon-blue">{settings.timerBackgroundOpacity}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={settings.timerBackgroundOpacity}
                                            onChange={(e) => onUpdateSettings({ ...settings, timerBackgroundOpacity: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neon-blue"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'tables' && (
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-bold mb-2 font-orbitron tracking-wider text-white">TABLE CONFIG</h2>
                                <p className="text-gray-400 font-medium">Customize individual table parameters.</p>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {timers.map(timer => (
                                    <button
                                        key={timer.id}
                                        onClick={() => setSelectedTimerId(timer.id)}
                                        className={`flex-shrink-0 px-8 py-4 rounded-xl font-bold transition-all border ${selectedTimerId === timer.id
                                            ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_15px_rgba(188,19,254,0.3)]'
                                            : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                                            }`}
                                    >
                                        Table {timer.id}
                                    </button>
                                ))}
                            </div>

                            {timers.map(timer => timer.id === selectedTimerId && (
                                <div key={timer.id} className="space-y-8 animate-fadeIn">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Table Name</label>
                                        <input
                                            type="text"
                                            value={timer.label || ''}
                                            onChange={(e) => onUpdateTimer(timer.id, { label: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-2xl font-bold text-white focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all placeholder-gray-700"
                                            placeholder="e.g. Feature Match"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Background Image</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {backgroundPresets.map(bg => (
                                                <button
                                                    key={bg.name}
                                                    onClick={() => onUpdateTimer(timer.id, { backgroundUrl: bg.url })}
                                                    className={`aspect-video rounded-xl bg-cover bg-center relative overflow-hidden group transition-all border-2 ${timer.backgroundUrl === bg.url
                                                        ? 'border-neon-purple ring-2 ring-neon-purple/30 opacity-100'
                                                        : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/30'
                                                        }`}
                                                    style={{ backgroundImage: bg.url ? `url(${bg.url})` : 'none', backgroundColor: '#111' }}
                                                >
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                                        <span className="font-bold text-xs uppercase tracking-wider text-white shadow-black drop-shadow-md">{bg.name}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Paste image URL..."
                                                value={timer.backgroundUrl || ''}
                                                onChange={(e) => onUpdateTimer(timer.id, { backgroundUrl: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:border-neon-purple focus:outline-none pl-10 transition-all"
                                            />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                <Palette size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
