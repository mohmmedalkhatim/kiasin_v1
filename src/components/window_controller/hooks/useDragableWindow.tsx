import { useRef, useEffect, useCallback, useState } from 'react';
import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';

interface UseDraggableWindowProps {
    excludeSelectors?: string[];
    onDragStart?: () => void;
    onDragEnd?: () => void;
}

export const useDraggableWindow = ({
    excludeSelectors = ['button', '[data-no-drag]', '[data-window-control]'],
    onDragStart,
    onDragEnd
}: UseDraggableWindowProps) => {
    const appWindow = getCurrentWindow();
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);

    // Check if element should be excluded from dragging
    const shouldExclude = useCallback((target: HTMLElement): boolean => {
        return excludeSelectors.some(selector => target.closest(selector));
    }, [excludeSelectors]);

    // Update window position
    const updateWindowPosition = useCallback((clientX: number, clientY: number) => {
        if (!isDragging.current) return;

        const newPosition = new LogicalPosition(
            clientX - dragOffset.current.x,
            clientY - dragOffset.current.y
        );

        appWindow.setPosition(newPosition).catch(console.error);
    }, []);

    // Start dragging
    const startDragging = useCallback(async (clientX: number, clientY: number) => {
        try {
            if (isMaximized) {
                // If window is maximized, restore it first
                await appWindow.toggleMaximize();
            }

            isDragging.current = true;
            const position = await appWindow.innerPosition();

            dragOffset.current = {
                x: clientX - position.x,
                y: clientY - position.y
            };

            onDragStart?.();
        } catch (error) {
            console.error('Failed to start dragging:', error);
            isDragging.current = false;
        }
    }, [isMaximized, onDragStart]);

    // Stop dragging
    const stopDragging = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        onDragEnd?.();
    }, [onDragEnd]);

    // Global event handlers
    const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        updateWindowPosition(e.clientX, e.clientY);
    }, [updateWindowPosition]);

    const handleGlobalTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging.current || e.touches.length !== 1) return;
        e.preventDefault();
        updateWindowPosition(e.touches[0].clientX, e.touches[0].clientY);
    }, [updateWindowPosition]);

    const handleGlobalMouseUp = useCallback(() => stopDragging(), [stopDragging]);
    const handleGlobalTouchEnd = useCallback(() => stopDragging(), [stopDragging]);

    const handleEscapeKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isDragging.current) {
            stopDragging();
        }
    }, [stopDragging]);

    // Setup event listeners
    const setupListeners = useCallback(() => {
        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);
        document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
        document.addEventListener('touchend', handleGlobalTouchEnd);
        document.addEventListener('keydown', handleEscapeKey);
    }, [
        handleGlobalMouseMove,
        handleGlobalMouseUp,
        handleGlobalTouchMove,
        handleGlobalTouchEnd,
        handleEscapeKey
    ]);

    const removeListeners = useCallback(() => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        document.removeEventListener('touchmove', handleGlobalTouchMove);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
        document.removeEventListener('keydown', handleEscapeKey);
    }, [
        handleGlobalMouseMove,
        handleGlobalMouseUp,
        handleGlobalTouchMove,
        handleGlobalTouchEnd,
        handleEscapeKey
    ]);

    // Mouse down handler
    const handleMouseDown = useCallback((e: React.MouseEvent | MouseEvent) => {
        const target = e.target as HTMLElement;
        if (shouldExclude(target)) return;

        e.preventDefault();
        startDragging(e.clientX, e.clientY);
        setupListeners();
    }, [shouldExclude, startDragging, setupListeners]);

    // Touch start handler
    const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
        const target = e.target as HTMLElement;
        if (shouldExclude(target) || e.touches.length !== 1) return;

        e.preventDefault();
        startDragging(e.touches[0].clientX, e.touches[0].clientY);
        setupListeners();
    }, [shouldExclude, startDragging, setupListeners]);

    // Double click to maximize
    const handleDoubleClick = useCallback(async (e: React.MouseEvent | MouseEvent) => {
        const target = e.target as HTMLElement;
        if (shouldExclude(target)) return;

        await appWindow.toggleMaximize();
    }, [shouldExclude]);

    // Initialize window state tracking
    useEffect(() => {
        const checkWindowState = async () => {
            try {
                const maximized = await appWindow.isMaximized();
                setIsMaximized(maximized);
            } catch (error) {
                console.error('Failed to check window state:', error);
            }
        };

        checkWindowState();

        const unlistenResize = appWindow.onResized(async () => {
            const maximized = await appWindow.isMaximized();
            setIsMaximized(maximized);
        });

        return () => {
            unlistenResize.then(fn => fn());
            if (isDragging.current) {
                removeListeners();
            }
        };
    }, [removeListeners]);

    return {
        isDragging: isDragging.current,
        isMaximized,
        handleMouseDown,
        handleTouchStart,
        handleDoubleClick,
        stopDragging
    };
};