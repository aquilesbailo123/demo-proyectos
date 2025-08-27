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
import useAuthStore, { LoginRequest, AuthResult } from '@/stores/AuthStore'

import './Login.css'
import '@/styles/LoginRegister.css'
import '@/styles/General.css'

const Login = () => {
    const navigate = useNavigate()
    const { logIn, isLoading } = useAuthStore()
    const { t } = useTranslation('common')

    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: '',
    })

    const handleFormDataChange = (key: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    }

    const validateForm = (formData: LoginRequest) => {
        const { email, password } = formData
        
        if (!email || !password) {
            return { isValid: false, message: t('missing_fields') }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return { isValid: false, message: t('invalid_email') }
        }
        
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
            const status: AuthResult = await logIn(formData, () => console.log('2FA required'));

            if (status === 'success') {
                toast.success(t('login_success'))
                navigate('/home')
            }

            if (status === 'confirm_email') {
                toast.success(t('login_confirm_email'))
                navigate('/check-email')
            }

            return
        } catch (error) {
            toast.error('error')
            console.error('Login error:', error)
        }
    }

    // const handleLoginWithGoogle = async () => {
    //     return
    // }

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
                <div className="section-title">
                    {t('login_welcome')}
                </div>

                <form 
                    className="login-register-form-cont" 
                    onSubmit={(e) => handleFormSubmit(e)}
                >
                    <Input
                        name="email"
                        value={formData.email}
                        setValue={(value) => handleFormDataChange('email', value)}
                        label={t('login_email_label')}
                        placeholder={t('login_email_placeholder')}
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
                        {isLoading ? <Spinner variant="secondary" /> : t('login_submit_button')}
                    </Button>

                    {/* <Button
                        variant="secondary"
                        size="lg"
                        type="button"
                        onClick={handleLoginWithGoogle}
                    >
                        {t('login_with_google')}
                    </Button> */}
                </form>
            
                <button 
                    className="text-btn login-register-footer" 
                    onClick={() => navigate('/forgot-password')}
                >
                    <span>{t('login_forgot_password')}</span>
                </button>
            
                <button 
                    className="text-btn login-register-footer"
                    onClick={() => navigate('/register')}
                >
                    <span>{t('login_new_user')}</span>
                    <span className="login-register-color-text">
                        {t('login_create_account_button')}
                    </span>
                </button>
            </Card>
        </div>
    )
}

export default Login
