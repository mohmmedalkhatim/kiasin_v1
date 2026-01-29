import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  ReactNode,
  KeyboardEvent,
} from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { IconChevronDown } from "@tabler/icons-react";

/* =======================
   Context
======================= */

interface SelectContextValue {
  selectedValue: string | null;
  activeIndex: number;
  registerItem: (value: string, label: string) => number;
  selectItem: (index: number) => void;
  setActiveIndex: (index: number) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(
  null
);

/* =======================
   Select Props
======================= */

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;

  className?: string;
  buttonClassName?: string;
  listClassName?: string;

  children: ReactNode;
}

/* =======================
   Select Component
======================= */

export function Select({
  value,
  onValueChange,
  placeholder = "Select an option",

  className,
  buttonClassName,
  listClassName,

  children,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(
    value ?? null
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const itemsRef = useRef<
    { value: string; label: string }[]
  >([]);

  const selectedValue = value ?? internalValue;

  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const registerItem = (val: string, label: string) => {
    const index = itemsRef.current.length;
    itemsRef.current.push({ value: val, label });
    return index;
  };

  const selectItem = (index: number) => {
    const item = itemsRef.current[index];
    if (!item) return;

    setInternalValue(item.value);
    onValueChange?.(item.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) =>
        Math.min(i + 1, itemsRef.current.length - 1)
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      selectItem(activeIndex);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const selectedLabel =
    itemsRef.current.find(
      (i) => i.value === selectedValue
    )?.label ?? null;

  itemsRef.current = [];

  return (
    <div className={twMerge("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        className={twMerge(
          clsx(
            "w-full h-10 px-3 rounded-sm border border-border-main bg",
            "flex items-center justify-between text-left",
            "focus:outline-none focus:border-2 focus:border-primary-500"
          ),
          buttonClassName
        )}
      >
        <span
          className={clsx(
            !selectedLabel && ""
          )}
        >
          {selectedLabel ?? placeholder}
        </span>
        <span className=""><IconChevronDown size={"1rem"}/></span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className={twMerge(
            clsx(
              "absolute z-50 mt-1 w-full max-h-60 overflow-auto",
              "rounded-sm border border-border-main bg shadow-md"
            ),
            listClassName
          )}
        >
          <SelectContext.Provider
            value={{
              selectedValue,
              activeIndex,
              registerItem,
              selectItem,
              setActiveIndex,
            }}
          >
            {children}
          </SelectContext.Provider>
        </ul>
      )}
    </div>
  );
}


interface SelectItemProps {
  value: string;
  children: string;
}

export function SelectItem({
  value,
  children,
}: SelectItemProps) {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error("Select.Item must be used inside Select");
  }

  const {
    selectedValue,
    activeIndex,
    registerItem,
    selectItem,
    setActiveIndex,
  } = ctx;

  const indexRef = useRef<number | null>(null);

  if (indexRef.current === null) {
    indexRef.current = registerItem(value, children);
  }

  const index = indexRef.current;
  const isActive = index === activeIndex;
  const isSelected = value === selectedValue;

  return (
    <li
      role="option"
      aria-selected={isSelected}
      onMouseEnter={() => setActiveIndex(index)}
      onClick={() => selectItem(index)}
      className={twMerge(
        clsx(
          "px-3 py-2 text-sm cursor-pointer",
          isActive && "bg-dark-800/80",
          isSelected && "font-medium"
        )
      )}
    >
      {children}
    </li>
  );
};
