import React from 'react';
import type { TimerConfig, AppSettings } from '../types';
import { Timer } from './Timer';

interface TimerGridProps {
    timers: TimerConfig[];
    activeTimerId: number;
    settings: AppSettings;
    onToggle: (id: number) => void;
    onReset: (id: number) => void;
}

export const TimerGrid: React.FC<TimerGridProps> = ({
    timers,
    activeTimerId,
    settings,
    onToggle,
    onReset
}) => {
    // Determine grid layout class based on timer count
    let gridClass = "grid h-full w-full gap-4 p-6"; // Adjusted gap and padding to match original

    if (timers.length === 1) {
        gridClass += " grid-cols-1";
    } else if (timers.length === 2) {
        gridClass += " grid-cols-2";
    } else if (timers.length === 3) {
        gridClass += " grid-cols-2 grid-rows-2";
    } else { // For 4 or more timers
        gridClass += " grid-cols-2 grid-rows-2";
    }

    return (
        <div className={gridClass}>
            {timers.map((timer, index) => {
                // Special handling for 3 timers layout
                // Timer 1 takes left column (row-span-2)
                // Timer 2 & 3 take right column slots
                let itemClass = "relative overflow-hidden rounded-xl transition-all duration-300 w-full h-full min-h-0"; // Added original w/h/min-h

                if (timers.length === 3) {
                    if (index === 0) itemClass += " row-span-2";
                }

                return (
                    <div key={timer.id} className={itemClass}>
                        <Timer
                            timer={timer}
                            isActive={timer.id === activeTimerId}
                            settings={settings}
                            onToggle={() => onToggle(timer.id)}
                            onReset={() => onReset(timer.id)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
