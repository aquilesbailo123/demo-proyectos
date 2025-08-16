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
// import { mainLogo } from '@/utils/constants/common'
import { useAuthStore } from '@/stores/AuthStore'

import './Login.css'
import '@/styles/LoginRegister.css'
import '@/styles/General.css'

const Login = () => {
    const navigate = useNavigate()
    const { login, isLoading } = useAuthStore()
    const { t } = useTranslation('common')

    // Wallet login temporarily disabled
    // const [authMethod, setAuthMethod] = useState<'credentials' | 'wallet'>('credentials')
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
            toast.success(t('login_success'))
            navigate('/home')
        } catch (error) {
            toast.error(t('login_general_error'))
            console.error(error)
        }
    }

    // const handleConnectWallet = async () => {
    //     try {
    //         await connectWallet('metamask') // Passing a default wallet type
    //         toast.success(t('login.wallet.success'))
    //         navigate('/home')
    //     } catch (error) {
    //         toast.error(t('login.wallet.error'))
    //         console.error(error)
    //     }
    // }

    const handleLoginWithGoogle = async () => {
        // TODO: Implement Google OAuth flow
    }

    return (
        <div className="login-register-main-cont animated-gradient-background">
            <div className="login-register-header">
                <button 
                    className="login-register-back-button" 
                    onClick={() => navigate('/home')}
                    aria-label="Back to home"
                >
                    <IoChevronBack /> {t('login_back_to_home_button')}
                </button>
            </div>
            <Card className="login-register-card-cont">
                <div className="section-title">{t('login_welcome')}</div>
                
                
                {/* Wallet login disabled for now */}
                {/* <div className="login-tabs">
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
                </div> */}

                {/* Only credentials login enabled */}
                <form className="login-register-form-cont" onSubmit={(e) => handleFormSubmit(e)}>
                    <Input
                        name="username"
                        value={formData.username}
                        setValue={(value) => handleFormDataChange('username', value)}
                        label={t('login_username_label')}
                        placeholder={t('login_username_placeholder')}
                    />
                    <PasswordEyeInput
                        name="password"
                        value={formData.password}
                        setValue={(value) => handleFormDataChange('password', value)}
                        label={t('login_password_label')}
                        placeholder={t('login_password_placeholder')}
                    />

                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner variant="primary" /> : t('login_submit_button')}
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        type="button"
                        onClick={handleLoginWithGoogle}
                    >
                        {t('login_with_google') || 'Continue with Google'}
                    </Button>
                </form>
            
                <button className="text-btn login-register-footer" onClick={() => navigate('/register')}>
                    <span>{t('login_new_user')}</span>
                    <span className="login-register-color-text">{t('login_create_account_button')}</span>
                </button>
            </Card>
        </div>
    )
}

export default Login
