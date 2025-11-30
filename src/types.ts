export interface TimerConfig {
    id: number;
    durationSeconds: number;
    remainingSeconds: number;
    isRunning: boolean;
    backgroundUrl?: string; // URL or preset name
    label?: string;
}

export interface AppSettings {
    defaultDurationMinutes: number;
    numberOfTimers: 1 | 2 | 3 | 4;
    fontTheme: 'Modern' | 'Retro' | 'Gothic' | 'Sci-Fi' | 'Industrial';
    timerTextColor: string;
    timerFontSize: 'Small' | 'Medium' | 'Large' | 'Extra Large';
    timerTextPosition: 'Top' | 'Center' | 'Bottom';
    timerBackgroundOpacity: number;
}

export type NavigationDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'ENTER' | 'BACK';
