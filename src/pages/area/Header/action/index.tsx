import { ButtonHTMLAttributes } from 'react';
import { classNames } from '../../../../util';

type ButtonProps = {
    className?: string;
    description?:string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function HeaderAction({
    description,
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        'font-medium transition-color h-full focus:ring-2 rounded-xs border-border-main focus:outline-none border hover:bg-dark-800';
    return (
        <button
            className={classNames(
                baseStyles,
                "px-3 py-2 text-sm group relative",
                className
            )}
            {...props}
        >
            {children}
            {description &&<abbr className="hidden m_border group-hover:block tip -translate-x-15 translate-y-8">{description}</abbr>}
        </button>
    );
}
