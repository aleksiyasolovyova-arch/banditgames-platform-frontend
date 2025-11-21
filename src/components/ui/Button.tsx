import type {ButtonHTMLAttributes, ReactNode} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
                           children,
                           variant = 'primary',
                           size = 'md',
                           className = '',
                           ...props
                       }: ButtonProps) {
    const baseStyles = 'rounded font-medium transition-colors';

    const variants = {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary-hover',
        secondary: 'bg-background-tertiary text-gray-800 hover:bg-brand-secondary-hover hover:text-white',
        danger: 'bg-status-danger text-white hover:bg-red-600',
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
