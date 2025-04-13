import React from 'react'
import './Select.css'

interface SelectOption {
    value: string
    label: string
}

interface SelectProps {
    label?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: SelectOption[]
    error?: string
    disabled?: boolean
    required?: boolean
}

const Select = ({
    label,
    value,
    onChange,
    options,
    error,
    disabled = false,
    required = false
}: SelectProps) => {
    return (
        <div className="select-container">
            {label && (
                <label className="select-label">
                    {label}
                    {required && <span className="required-mark">*</span>}
                </label>
            )}
            <select
                className={`select-input ${error ? 'error' : ''}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="select-error">{error}</span>}
        </div>
    )
}

export default Select
