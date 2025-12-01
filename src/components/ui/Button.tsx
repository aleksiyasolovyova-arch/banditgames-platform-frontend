import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// utility function to merge tailwind classes safely
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'white' | 'glass';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
                           children,
                           variant = 'primary',
                           size = 'md',
                           className = '',
                           ...props
                       }: ButtonProps) {
    const baseStyles = 'rounded-lg font-bold transition-all duration-300 flex items-center justify-center';

    const variants = {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-lg hover:shadow-brand-primary/25',

        secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white',

        //
        danger: 'bg-red-600 text-white hover:bg-red-700',

        white: 'bg-white text-black hover:bg-zinc-200 border border-transparent shadow-xl',

        glass: 'bg-black/30 backdrop-blur-md text-white border border-white/10 hover:bg-black/50 hover:border-white/20',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}