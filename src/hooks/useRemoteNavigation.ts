import { useEffect, useCallback } from 'react';



export const useRemoteNavigation = (handlers: {
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
    onEnter?: () => void;
    onBack?: () => void;
}) => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            // Prevent default scrolling for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
            }

            switch (event.key) {
                case 'ArrowUp':
                    handlers.onUp?.();
                    break;
                case 'ArrowDown':
                    handlers.onDown?.();
                    break;
                case 'ArrowLeft':
                    handlers.onLeft?.();
                    break;
                case 'ArrowRight':
                    handlers.onRight?.();
                    break;
                case 'Enter':
                case 'Select': // Some remotes send 'Select'
                    handlers.onEnter?.();
                    break;
                case 'Escape':
                case 'Back': // Some remotes send 'Back'
                case 'Backspace':
                    handlers.onBack?.();
                    break;
            }
        },
        [handlers]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};
