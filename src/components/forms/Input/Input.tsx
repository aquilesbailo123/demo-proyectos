import React from 'react';
import './Input.css';

interface InputProps {
    /** Unique identifier for the input field */
    name: string;
    /** Label text displayed above the input */
    label: string;
    /** HTML input type (text, number, date, etc.) */
    type?: string;
    /** Placeholder text shown when input is empty */
    placeholder?: string;
    /** Current value of the input */
    value: string;
    /** Callback function to handle value changes */
    setValue: (value: string) => void;
    /** Whether the input should be multiline (textarea) */
    multiline?: boolean;
    /** Number of rows for multiline input */
    rows?: number;
    /** Error message to display */
    error?: string;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Whether the input is required */
    required?: boolean;
    /** Prefix to show before the input (e.g., currency symbol) */
    prefix?: string;
}

const Input= ({
    name,
    label,
    type = "text",
    placeholder = "",
    value = "",
    setValue,
    multiline = false,
    rows = 3,
    error,
    disabled = false,
    required = false,
    prefix
}: InputProps) => {
    const inputProps = {
        className: `basic-input-field ${error ? 'error' : ''} ${prefix ? 'with-prefix' : ''}`,
        name,
        placeholder,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
        disabled,
        required,
        type
    };

    return (
        <div className="basic-input-group">
            <label className="basic-input-label" htmlFor={name}>
                {label}
                {required && <span className="required-mark">*</span>}
            </label>
            <div className="input-container">
                {prefix && <span className="input-prefix">{prefix}</span>}
                {multiline ? (
                    <textarea
                        {...inputProps}
                        rows={rows}
                    />
                ) : (
                    <input {...inputProps} />
                )}
            </div>
            {error && <span className="input-error">{error}</span>}
        </div>
    );
};

export default Input;
