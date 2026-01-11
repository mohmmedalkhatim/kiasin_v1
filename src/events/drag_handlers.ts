import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';

let appWindow = getCurrentWindow();

interface DragState {
  isDragging: boolean;
  offset: { x: number; y: number };
}

export class DraggableHeader {
  private dragState: DragState = {
    isDragging: false,
    offset: { x: 0, y: 0 }
  };

  constructor(private elementId: string) {
    this.init();
  }

  private init(): void {
    const titlebar = document.getElementById(this.elementId);
    if (!titlebar) {
      console.warn(`Element with id "${this.elementId}" not found`);
      return;
    }

    titlebar.addEventListener('mousedown', this.handleMouseDown.bind(this));
    
    // Clean up event listeners on destroy
    window.addEventListener('beforeunload', () => {
      titlebar.removeEventListener('mousedown', this.handleMouseDown.bind(this));
      this.cleanup();
    });
  }

  private handleMouseDown(e: MouseEvent): void {
    // Type-safe check for button inside the target
    const target = e.target;
    
    if (target instanceof HTMLElement) {
      const button = target.closest('button');
      const noDragButton = target.closest('[data-no-drag]');
      
      // Don't start dragging if clicking on buttons or no-drag elements
      if (button || noDragButton) {
        return;
      }
    }

    e.preventDefault();
    this.startDragging(e);
  }

  private async startDragging(e: MouseEvent): Promise<void> {
    try {
      this.dragState.isDragging = true;
      const position = await appWindow.innerPosition();
      
      this.dragState.offset = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };

      // Add global listeners
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      
      // Add escape key support
      document.addEventListener('keydown', this.handleKeyDown);
    } catch (error) {
      console.error('Failed to start dragging:', error);
      this.dragState.isDragging = false;
    }
  }

  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.dragState.isDragging) return;

    const newPosition = new LogicalPosition(
      e.screenX - this.dragState.offset.x,
      e.screenY - this.dragState.offset.y
    );

    appWindow.setPosition(newPosition).catch(console.error);
  };

  private handleMouseUp = (): void => {
    this.dragState.isDragging = false;
    this.cleanup();
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.dragState.isDragging) {
      this.dragState.isDragging = false;
      this.cleanup();
    }
  };

  private cleanup(): void {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}