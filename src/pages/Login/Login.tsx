import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { IoChevronBack } from 'react-icons/io5'

import Input from '@/components/forms/Input/Input'
import PasswordEyeInput from '@/components/forms/PasswordEyeInput/PasswordEyeInput'
import Button from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner/Spinner'
import Card from '@/components/common/Card/Card'
import { mainLogo } from '@/utils/constants/common'
import { useAuthStore } from '@/stores/AuthStore'

import './Login.css'
import '../../animations.css'

const Login = () => {
    const navigate = useNavigate()
    const { login, connectWallet, isLoading } = useAuthStore()
    const { t } = useTranslation('common')

    const [authMethod, setAuthMethod] = useState<'credentials' | 'wallet'>('credentials')
    const [formData, setFormData] = useState<{ [key: string]: any }>({
        username: '',
        password: '',
    })

    const handleFormDataChange = (key: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    }

    const validateForm = (formData: { [key: string]: any }) => {
        const { username, password } = formData
        console.log(username, password)

        // const alphanumericRegex = /^[a-zA-Z0-9]+$/

        // if (!username || !password) {
        //     return { isValid: false, message: t('login.error.missing_fields') }
        // }
        // if (!alphanumericRegex.test(username)) {
        //     return { isValid: false, message: t('login.fields.username.invalid') }
        // }
        // if (!alphanumericRegex.test(password)) {
        //     return { isValid: false, message: t('login.fields.password.invalid') }
        // }

        return { isValid: true, message: '' }
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault()

        const validation = validateForm(formData)
        if (!validation.isValid) {
            toast.error(validation.message)
            return
        }

        try {
            await login(formData.username, formData.password)
            toast.success(t('login.success'))
            navigate('/home')
        } catch (error) {
            toast.error(t('login.error.general'))
            console.error(error)
        }
    }

    const handleConnectWallet = async () => {
        try {
            await connectWallet('metamask') // Passing a default wallet type
            toast.success(t('login.wallet.success'))
            navigate('/home')
        } catch (error) {
            toast.error(t('login.wallet.error'))
            console.error(error)
        }
    }

    return (
        <div className="login-main-cont animated-gradient-background">
            <div className="login-header">
                <button 
                    className="back-button" 
                    onClick={() => navigate('/home')}
                    aria-label="Back to home"
                >
                    <IoChevronBack /> {t('common_back')}
                </button>
                <img className="login-logo" src={mainLogo.src} alt={mainLogo.alt} />
            </div>
            <Card className="login-card-cont">
                <div className="login-card-title section-title">{t('login.welcome')}</div>
                
                <div className="login-tabs">
                    <button 
                        className={`login-tab ${authMethod === 'credentials' ? 'active' : ''}`}
                        onClick={() => setAuthMethod('credentials')}
                        type="button"
                    >
                        {t('login.tabs.credentials')}
                    </button>
                    <button 
                        className={`login-tab ${authMethod === 'wallet' ? 'active' : ''}`}
                        onClick={() => setAuthMethod('wallet')}
                        type="button"
                    >
                        {t('login.tabs.wallet')}
                    </button>
                </div>

                {authMethod === 'credentials' ? (
                    <form className="login-form-cont" onSubmit={(e) => handleFormSubmit(e)}>
                        <Input
                            name="username"
                            value={formData.username}
                            setValue={(value) => handleFormDataChange('username', value)}
                            label={t('login.fields.username.label')}
                            placeholder={t('login.fields.username.placeholder')}
                        />
                        <PasswordEyeInput
                            name="password"
                            value={formData.password}
                            setValue={(value) => handleFormDataChange('password', value)}
                            label={t('login.fields.password.label')}
                            placeholder={t('login.fields.password.placeholder')}
                        />

                        <Button
                            variant="primary"
                            size="lg"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner variant="primary" /> : t('login.buttons.login')}
                        </Button>
                    </form>
                ) : (
                    <div className="wallet-login-cont">
                        <div className="wallet-info">
                            <p>{t('login.wallet.info')}</p>
                            <p className="wallet-support">{t('login.wallet.support')}</p>
                        </div>
                        
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleConnectWallet}
                            disabled={isLoading}
                            className="wallet-connect-btn"
                        >
                            {isLoading ? <Spinner variant="primary" /> : t('login.buttons.connectWallet')}
                        </Button>
                    </div>
                )}
                
                <div className="login-footer">
                    <p>{t('login.footer.newUser')} <button type="button" className="text-btn">{t('login.footer.createAccount')}</button></p>
                </div>
            </Card>
        </div>
    )
}

export default Login
