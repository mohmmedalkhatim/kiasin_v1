import React, { useRef } from 'react';
import { useDraggableWindow } from './hooks/useDragableWindow';
import { useWindowControls } from './hooks/useWindowsControllers';
import './index.css';

interface DraggableHeaderProps {
  title?: string;
  showControls?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
}

const DraggableHeader: React.FC<DraggableHeaderProps> = ({
  title = 'My Tauri App',
  showControls = true,
  onClose,
  onMinimize,
  onMaximize,
  className = ''
}) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  
  const {
    handleMouseDown,
    handleTouchStart,
    handleDoubleClick
  } = useDraggableWindow({
    
    excludeSelectors: ['.draggable-header__button', '[data-no-drag]']
  });

  const {
    handleMinimize,
    handleMaximize,
    handleClose
  } = useWindowControls({ onClose, onMinimize, onMaximize });

  return (
    <div 
      ref={draggableRef}
      className={`draggable-header ${className}`}
      data-tauri-drag-region
    >
      {/* Draggable area with title - THIS IS THE KEY FIX */}
      <div 
        className="draggable-header__area" 
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={handleDoubleClick}
        data-tauri-drag-region
      >
        <div className="draggable-header__title">
          {title}
        </div>
      </div>

      {/* Window control buttons - SEPARATE from draggable area */}
      {showControls && (
        <div className="draggable-header__controls" data-window-control>
          <button
            className="draggable-header__button draggable-header__button--minimize"
            onClick={handleMinimize}
            title="Minimize"
            aria-label="Minimize window"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M0,5 H10" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          
          <button
            className="draggable-header__button draggable-header__button--maximize"
            onClick={handleMaximize}
            title="Maximize"
            aria-label="Maximize window"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          
          <button
            className="draggable-header__button draggable-header__button--close"
            onClick={handleClose}
            title="Close"
            aria-label="Close window"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M1,1 L9,9 M9,1 L1,9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableHeader;