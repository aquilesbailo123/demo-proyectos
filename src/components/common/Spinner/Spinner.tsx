import React from 'react';
import './Spinner.css';

interface SpinnerProps {
    /** Style variant of the spinner */
    variant?: 'primary' | 'secondary';
    /** Additional CSS classes */
    className?: string;
}

/**
 * Spinner component for loading states.
 * Supports primary and secondary variants.
 */
const Spinner: React.FC<SpinnerProps> = ({
    variant = 'primary',
    className = '',
}) => {
    return (
        <div className={`spinner spinner-${variant} ${className}`}></div>
    );
};

export default Spinner;
