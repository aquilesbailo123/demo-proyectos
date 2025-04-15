import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './Input.css'

interface InputProps {
    /** Unique identifier for the input field */
    name: string
    /** Current value of the input field */
    value: string
    /** Callback function to update the input value */
    setValue: (value: string) => void
    /** Visual style variant of the input */
    variant?: 'flat' | 'bordered' | 'faded' | 'underlined'
    /** Color scheme based on theme variables */
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
    /** Size preset from global size variables */
    size?: 'sm' | 'md' | 'lg'
    /** Border radius preset from global radius variables */
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    /** Label text displayed adjacent to the input */
    label?: string
    /** Placeholder text when input is empty */
    placeholder?: string
    /** Validation error message displayed below the input */
    errorMessage?: string
    /** Minimum allowed character length */
    minLength?: number
    /** Maximum allowed character length */
    maxLength?: number
    /** HTML input type attribute */
    type?: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file'
    /** Content to display before the input */
    startContent?: React.ReactNode
    /** Content to display after the input */
    endContent?: React.ReactNode
    /** Position of the label relative to the input */
    labelPlacement?: 'inside' | 'outside' | 'outside-left'
    /** Whether the input should span full container width */
    fullWidth?: boolean
    /** Show clear button when input has content */
    isClearable?: boolean
    /** Mark field as required with asterisk */
    isRequired?: boolean
    /** Prevent user interaction while maintaining value */
    isReadOnly?: boolean
    /** Disable input interaction completely */
    isDisabled?: boolean
    /** Manual validation state override */
    isInvalid?: boolean
    /** Ref object for the wrapper div element */
    baseRef?: React.RefObject<HTMLDivElement>
    /** Additional CSS classes for custom styling */
    classNames?: string
}

// TODO when labelPlacement outside and no placeholder, the label should get inside and when isFocused get outside
// TODO add validation for type email type tel type url and min and max length, which should make errorMessage


const Input = ({
    name,
    value,
    setValue,
    variant = 'flat',
    color = 'default',
    size = 'md',
    radius = 'md',
    label,
    placeholder,
    errorMessage,
    minLength,
    maxLength,
    type = 'text',
    startContent,
    endContent,
    labelPlacement = 'outside',
    fullWidth = true,
    isClearable = false,
    isRequired = false,
    isReadOnly = false,
    isDisabled = false,
    isInvalid,
    baseRef,
    classNames = ''
}: InputProps) => {

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const invalid = isInvalid || !!errorMessage
    const showClearButton = isClearable && value.length > 0 && !isDisabled
    const hasInsideLabel = labelPlacement === 'inside' && label
    const shouldFloat = hasInsideLabel && (isFocused || value.length > 0 || placeholder || startContent || endContent)

    const handleClear = () => setValue('')

    const getHeightSize = () => {
        if (labelPlacement === "inside") return size
        switch(size) {
            case 'sm': return 'xs'
            case 'md': return 'sm'
            case 'lg': return 'md'
            default: return 'xs'
        }
    }

    const getBorderColor = () => {
        if (variant === "flat") return "transparent"
        switch(color) {
            case 'primary': return 'var(--main-primary)'
            case 'secondary': return 'var(--main-secondary)'
            case 'success': return 'var(--state-success)'
            case 'warning': return 'var(--state-warning)'
            case 'danger': return 'var(--state-danger)'
            default: return 'var(--border-primary)'
        }
    }

    return (
        <div
            ref={baseRef}
            className={`basic-input-group ${fullWidth ? 'full-width' : ''} label-placement-${labelPlacement} ${classNames}`}
        >
            {labelPlacement !== 'inside' && label && (
                <label className="basic-input-label">
                    {label}
                    {isRequired && <span className="required-mark">*</span>}
                </label>
            )}
            
            <div className="input-container">
                {startContent && <div className={`input-start-content ${hasInsideLabel ? 'has-inside-label' : ''}`}>{startContent}</div>}
                
                {hasInsideLabel && (
                    <label 
                        className={`inside-label ${shouldFloat ? 'floating' : ''}`}
                        htmlFor={name}
                    >
                        {label}
                        {isRequired && <span className="required-mark">*</span>}
                    </label>
                )}

                <input
                    id={name}
                    className={`basic-input-field variant-${variant} size-${getHeightSize()} ${variant !== "underlined" ? `radius-${radius}` : ""} ${hasInsideLabel ? 'has-inside-label' : ''} ${invalid ? 'input-invalid' : ''} ${startContent ? 'has-start' : ''} ${endContent || type === 'password' ? 'has-end' : ''}`}
                    style={{
                        borderColor: getBorderColor(),
                        backgroundColor: variant === 'flat' || variant === 'faded'
                            ? 'var(--background-secondary)' 
                            : 'transparent'
                    }}
                    name={name}
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    minLength={minLength}
                    maxLength={maxLength}
                    aria-invalid={invalid}
                    aria-describedby={errorMessage ? `${name}-error` : undefined}
                    pattern={type === 'tel' ? '[0-9]*' : type === 'url' ? 'https?://.*' : undefined}
                />

                {showClearButton && (
                    <button
                        type="button"
                        className="input-clear"
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        ×
                    </button>
                )}

                {(endContent || type === 'password') && (
                    <div className={`input-end-content ${hasInsideLabel ? 'has-inside-label' : ''} `}>
                        {endContent}
                        {type === 'password' && (labelPlacement === "outside" || shouldFloat) && (
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {errorMessage && (
                <span id={`${name}-error`} className="input-error">
                    {errorMessage}
                </span>
            )}
        </div>
    )
}

export default Input