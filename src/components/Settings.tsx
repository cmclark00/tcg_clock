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
        { name: 'Pokemon', url: 'https://images.unsplash.com/photo-1613771404721-c5b425876d90?q=80&w=2574&auto=format&fit=crop' },
        { name: 'Magic', url: 'https://images.unsplash.com/photo-1620336655052-b57972f3a260?q=80&w=2574&auto=format&fit=crop' },
        { name: 'Lorcana', url: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2603&auto=format&fit=crop' },
        { name: 'Dark', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop' },
    ];

    return (
        <div className="absolute inset-0 bg-black/90 text-white z-50 flex overflow-hidden font-[Inter]">
            {/* Sidebar */}
            <div className="w-80 bg-gray-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col p-6">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                        <SettingsIcon size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight">Tournament<br />Clock</h1>
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    <button
                        onClick={() => setActiveTab('global')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'global'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Layout size={20} />
                        <span className="font-medium">Global Settings</span>
                        {activeTab === 'global' && <ChevronRight size={16} className="ml-auto opacity-50" />}
                    </button>

                    <button
                        onClick={() => setActiveTab('tables')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'tables'
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Monitor size={20} />
                        <span className="font-medium">Table Config</span>
                        {activeTab === 'tables' && <ChevronRight size={16} className="ml-auto opacity-50" />}
                    </button>
                </nav>

                <button
                    onClick={onClose}
                    className="mt-auto w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <Check size={20} />
                    <span>Start Event</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 to-black p-12">
                <div className="max-w-4xl mx-auto animate-fadeIn">

                    {activeTab === 'global' && (
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Global Settings</h2>
                                <p className="text-gray-400">Configure the rules and appearance for the entire event.</p>
                            </div>

                            {/* Section: Game Rules */}
                            <section className="space-y-6">
                                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={16} /> Game Rules
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Active Tables</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(num => (
                                                <button
                                                    key={num}
                                                    onClick={() => onUpdateSettings({ ...settings, numberOfTimers: num as 1 | 2 | 3 | 4 })}
                                                    className={`h-12 w-12 rounded-lg font-bold transition-all ${settings.numberOfTimers === num
                                                        ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-500/50'
                                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Round Duration</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[30, 45, 50, 60, 90].map(mins => (
                                                <button
                                                    key={mins}
                                                    onClick={() => onUpdateSettings({ ...settings, defaultDurationMinutes: mins })}
                                                    className={`px-4 py-3 rounded-lg font-bold transition-all ${settings.defaultDurationMinutes === mins
                                                        ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-500/50'
                                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
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
                                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                    <Type size={16} /> Typography
                                </h3>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Font Theme</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {['Modern', 'Retro', 'Gothic'].map(font => (
                                                <button
                                                    key={font}
                                                    onClick={() => onUpdateSettings({ ...settings, fontTheme: font as any })}
                                                    className={`py-4 rounded-xl font-bold transition-all border ${settings.fontTheme === font
                                                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                                        : 'bg-gray-800/50 border-transparent text-gray-400 hover:bg-gray-800'
                                                        }`}
                                                >
                                                    {font}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-gray-300">Text Color</label>
                                            <div className="flex items-center gap-3 p-2 bg-gray-900 rounded-lg border border-gray-700">
                                                <input
                                                    type="color"
                                                    value={settings.timerTextColor}
                                                    onChange={(e) => onUpdateSettings({ ...settings, timerTextColor: e.target.value })}
                                                    className="h-8 w-8 rounded cursor-pointer bg-transparent border-none"
                                                />
                                                <span className="text-sm font-mono text-gray-400">{settings.timerTextColor}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-gray-300">Font Size</label>
                                            <select
                                                value={settings.timerFontSize}
                                                onChange={(e) => onUpdateSettings({ ...settings, timerFontSize: e.target.value as any })}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                                            >
                                                {['Small', 'Medium', 'Large', 'Extra Large'].map(size => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Vertical Position</label>
                                        <div className="flex bg-gray-900 rounded-lg p-1">
                                            {['Top', 'Center', 'Bottom'].map(pos => (
                                                <button
                                                    key={pos}
                                                    onClick={() => onUpdateSettings({ ...settings, timerTextPosition: pos as any })}
                                                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${settings.timerTextPosition === pos
                                                        ? 'bg-blue-600 text-white shadow'
                                                        : 'text-gray-400 hover:text-white'
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
                                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                    <Palette size={16} /> Appearance
                                </h3>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-300">Background Opacity</label>
                                            <span className="text-sm font-mono text-blue-400">{settings.timerBackgroundOpacity}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={settings.timerBackgroundOpacity}
                                            onChange={(e) => onUpdateSettings({ ...settings, timerBackgroundOpacity: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'tables' && (
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Table Configuration</h2>
                                <p className="text-gray-400">Customize individual tables with names and backgrounds.</p>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {timers.map(timer => (
                                    <button
                                        key={timer.id}
                                        onClick={() => setSelectedTimerId(timer.id)}
                                        className={`flex-shrink-0 px-6 py-4 rounded-xl font-bold transition-all border ${selectedTimerId === timer.id
                                            ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/30'
                                            : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:border-gray-600'
                                            }`}
                                    >
                                        Table {timer.id}
                                    </button>
                                ))}
                            </div>

                            {timers.map(timer => timer.id === selectedTimerId && (
                                <div key={timer.id} className="space-y-8 animate-fadeIn">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Table Name</label>
                                        <input
                                            type="text"
                                            value={timer.label || ''}
                                            onChange={(e) => onUpdateTimer(timer.id, { label: e.target.value })}
                                            className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-2xl font-bold focus:border-purple-500 focus:outline-none transition-colors"
                                            placeholder="e.g. Feature Match"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-medium text-gray-300">Background Image</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {backgroundPresets.map(bg => (
                                                <button
                                                    key={bg.name}
                                                    onClick={() => onUpdateTimer(timer.id, { backgroundUrl: bg.url })}
                                                    className={`aspect-video rounded-xl bg-cover bg-center relative overflow-hidden group transition-all border-2 ${timer.backgroundUrl === bg.url
                                                        ? 'border-purple-500 ring-2 ring-purple-500/30'
                                                        : 'border-transparent opacity-60 hover:opacity-100'
                                                        }`}
                                                    style={{ backgroundImage: bg.url ? `url(${bg.url})` : 'none', backgroundColor: '#1f2937' }}
                                                >
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                                        <span className="font-bold text-xs shadow-black drop-shadow-md">{bg.name}</span>
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
                                                className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:border-purple-500 focus:outline-none pl-10"
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
