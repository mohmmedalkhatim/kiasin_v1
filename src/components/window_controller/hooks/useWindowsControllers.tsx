import { useCallback } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';

interface UseWindowControlsProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export const useWindowControls = ({
    onClose,
    onMinimize,
    onMaximize
}: UseWindowControlsProps = {}) => {
    const appWindow = getCurrentWindow();
    const handleMinimize = useCallback(async () => {
        if (onMinimize) {
            onMinimize();
        } else {
            try {
                await appWindow.minimize();
            } catch (error) {
                console.error('Failed to minimize:', error);
            }
        }
    }, [onMinimize]);

    const handleMaximize = useCallback(async () => {
        if (onMaximize) {
            onMaximize();
        } else {
            try {
                await appWindow.toggleMaximize();
            } catch (error) {
                console.error('Failed to toggle maximize:', error);
            }
        }
    }, [onMaximize]);

    const handleClose = useCallback(async () => {
        if (onClose) {
            onClose();
        } else {
            try {
                await appWindow.close();
            } catch (error) {
                console.error('Failed to close:', error);
            }
        }
    }, [onClose]);

    return {
        handleMinimize,
        handleMaximize,
        handleClose
    };
};