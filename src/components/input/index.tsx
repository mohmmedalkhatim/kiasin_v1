// Input.tsx
import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from 'react';
import {
  IconX,
  IconEye,
  IconEyeOff,
  IconSearch,
  IconLoader2,
  IconAlertCircle,
  IconCheck,
  IconMail,
  IconLock,
  IconPhone
} from '@tabler/icons-react';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'default' | 'filled' | 'underline';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  variant?: InputVariant;
  type?: InputType;
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;
  fullWidth?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  leftSectionWidth?: number;
  rightSectionWidth?: number;
  clearable?: boolean;
  debounceDelay?: number;
  loading?: boolean;
  withCount?: boolean;
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrapperClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      type = 'text',
      label,
      helperText,
      error,
      success,
      warning,
      disabled,
      fullWidth,
      leftSection,
      rightSection,
      leftSectionWidth = 40,
      rightSectionWidth = 40,
      clearable,
      debounceDelay = 0,
      loading,
      withCount,
      radius = 'sm',
      wrapperClassName,
      inputWrapperClassName,
      inputClassName,
      value,
      defaultValue,
      onChange,
      onClear,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>| undefined>(undefined);

    const [internalValue, setInternalValue] = useState(
      value ?? defaultValue ?? ''
    );
    const [showPassword, setShowPassword] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    useEffect(() => {
      if (!isControlled) return;
      setInternalValue(String(value ?? ''));
    }, [value, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }

      if (debounceDelay > 0) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => onChange?.(e), debounceDelay);
      } else {
        onChange?.(e);
      }
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue('');
      onClear?.();
      inputRef.current?.focus();
    };

    const isPassword = type === 'password';
    const resolvedType =
      isPassword && showPassword ? 'text' : type;

    const defaultLeftIcon = useMemo(() => {
      if (leftSection) return leftSection;
      if (type === 'email') return <IconMail size={18} />;
      if (type === 'password') return <IconLock size={18} />;
      if (type === 'search') return <IconSearch size={18} />;
      if (type === 'tel') return <IconPhone size={18} />;
      return null;
    }, [type, leftSection]);

    const inputPaddingStyle = useMemo(
      () => ({
        paddingLeft: defaultLeftIcon ? leftSectionWidth : undefined,
        paddingRight:
          rightSection || clearable || isPassword || loading
            ? rightSectionWidth
            : undefined
      }),
      [
        defaultLeftIcon,
        rightSection,
        clearable,
        isPassword,
        loading,
        leftSectionWidth,
        rightSectionWidth
      ]
    );

    const sizeClasses = {
      xs: 'h-7 text-xs',
      sm: 'h-8 text-sm',
      md: 'h-9 text-sm',
      lg: 'h-10 text-base',
      xl: 'h-12 text-lg'
    }[size];

    const radiusClasses = {
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl'
    }[radius];

    const variantClasses = disabled
      ? 'border-gray-200 text-gray-400'
      : error
      ? 'border-red-500 focus:ring-red-500'
      : success
      ? 'border-green-500 focus:ring-green-500'
      : warning
      ? 'border-yellow-500 focus:ring-yellow-500'
      : variant === 'filled'
      ? 'bg-gray-50 focus:bg-white'
      : variant === 'underline'
      ? 'border-x-0 border-t-0 border-b-2 border-border-main rounded-none'
      : 'bg border-border-main px-2';

    return (
      <div className={wrapperClassName}>
        {label && (
          <label className="block mb-1 text-sm font-medium">
            {label}
          </label>
        )}

        <div
          className={`relative ${fullWidth ? 'w-full' : ''} ${inputWrapperClassName}`}
        >
          {defaultLeftIcon && (
            <div
              className="absolute left-0 inset-y-0 flex items-center justify-center "
              style={{ width: leftSectionWidth }}
            >
              {defaultLeftIcon}
            </div>
          )}

          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            type={resolvedType}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            style={inputPaddingStyle}
            className={`
              w-full border outline-none transition
              ${sizeClasses}
              ${radiusClasses}
              ${variantClasses}
              ${inputClassName}
            `}
            {...props}
          />

          <div
            className="absolute right-0 inset-y-0 flex items-center justify-center gap-1"
            style={{ width: rightSectionWidth }}
          >
            {loading && <IconLoader2 className="animate-spin" size={16} />}
            {error && <IconAlertCircle size={16} />}
            {success && <IconCheck size={16} />}

            {clearable && currentValue && !loading && (
              <button type="button" onClick={handleClear}>
                <IconX size={16} />
              </button>
            )}

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? (
                  <IconEyeOff size={16} />
                ) : (
                  <IconEye size={16} />
                )}
              </button>
            )}

            {rightSection}
          </div>
        </div>

        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
