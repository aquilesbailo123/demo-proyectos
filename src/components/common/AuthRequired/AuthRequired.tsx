import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Card from '../Card/Card';
import './AuthRequired.css';

interface AuthRequiredProps {
    /**
     * The namespace prefix for translations (e.g., 'profile', 'donations', 'createProject')
     */
    namespace: string;
    /**
     * Optional button size (defaults to 'md')
     */
    buttonSize?: 'sm' | 'md' | 'lg';
    /**
     * Optional button variant (defaults to 'primary')
     */
    buttonVariant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
}

/**
 * A reusable component that displays a message and login button for unauthenticated users.
 * Used across multiple pages that require authentication.
 */
const AuthRequired: React.FC<AuthRequiredProps> = ({
    namespace,
    buttonSize = 'md',
    buttonVariant = 'primary'
}) => {
    const { t } = useTranslation('common');
    const navigate = useNavigate();

    return (
        <div className="auth-required-container">
            <Card className="auth-required-card">
                <div className="auth-required-content">
                    <h2>{t('auth_required_title')}</h2>
                    <p>{t('auth_required_message')}</p>
                    <div className="auth-buttons">
                        <Button 
                            variant={buttonVariant} 
                            size={buttonSize} 
                            onClick={() => navigate('/login')}
                        >
                            {t('auth_required_button')}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AuthRequired;
