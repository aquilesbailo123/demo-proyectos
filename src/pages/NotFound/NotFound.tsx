import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button/Button'
import './NotFound.css'

const NotFound = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('common')

    return (
        <div className="not-found-container">
            <div className="not-found-content animated-gradient-background">
                <h1>404</h1>
                <h2>{t('notFound.title')}</h2>
                <p>{t('notFound.message')}</p>
                <Button 
                    variant="primary" 
                    onClick={() => navigate('/')}
                >
                    {t('notFound.backToHome')}
                </Button>
            </div>
        </div>
    )
}

export default NotFound