import { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next"

import './LanguageToggle.css'

interface LanguageToggleProps {
    /** Size preset from global size variables */
    size?: 'sm' | 'md' | 'lg'
}

const LanguageToggle = ({ size = 'md' }: LanguageToggleProps) => {

    const { i18n } = useTranslation("common")
    const [ languageSelected, setLanguageSelected ] = useState<string>(i18n.language || "en")

    useEffect(() => {
        i18n.changeLanguage(languageSelected)
        localStorage.setItem("language", languageSelected)
    }, [languageSelected, i18n])

    const handleToggle = () => {
        setLanguageSelected(languageSelected === "es" ? "en" : "es")
    }

    return (
        <button
            type="button"
            role="switch"
            aria-checked={languageSelected === "es"}
            onClick={handleToggle}
            className={`language-toggle size-${size}`}
        >
            <div className="language-toggle-track">
                <div className="language-toggle-ball">
                    {languageSelected === "en" ? (
                        <span className="language-icon">EN</span>
                    ) : (
                        <span className="language-icon">ES</span>
                    )}
                </div>
            </div>
        </button>
    )
}

export default LanguageToggle