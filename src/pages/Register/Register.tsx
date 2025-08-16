import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoChevronBack } from 'react-icons/io5'

import Input from '@/components/forms/Input/Input'
import PasswordEyeInput from '@/components/forms/PasswordEyeInput/PasswordEyeInput'
import Button from '@/components/common/Button/Button'
import Card from '@/components/common/Card/Card'
import Spinner from '@/components/common/Spinner/Spinner'
import toast from 'react-hot-toast'
import { useRegister, getApiErrorMessage } from '@/hooks/auth'

import './Register.css'
import '@/styles/LoginRegister.css'
import '@/styles/General.css'

const Register = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('common')
    const registerMutation = useRegister()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        username: '', // optional depending on backend settings
        email: '',
        password1: '',
        password2: '',
    })

    const handleFormDataChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            const payload: any = {
                email: formData.email,
                password1: formData.password1,
                password2: formData.password2,
            }
            if (formData.username) payload.username = formData.username
            await registerMutation.mutateAsync(payload)
            toast.success(t('register_success') || 'Account created')
            navigate('/login')
        } catch (error) {
            const msg = getApiErrorMessage(error)
            toast.error(msg || (t('registration_failed') as string) || 'Registration failed')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleLoginWithGoogle = () => {
        // TODO: implement Google OAuth flow
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
                <div className="section-title">{t('login_create_account_button') || 'Create your account'}</div>

                <form className="login-register-form-cont" onSubmit={handleSubmit}>
                    <Input
                        name="username"
                        type="text"
                        value={formData.username}
                        setValue={(v) => handleFormDataChange('username', v)}
                        label={t('login_username_label') || 'Username'}
                        placeholder={t('login_username_placeholder') || 'your-username'}
                    />

                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        setValue={(v) => handleFormDataChange('email', v)}
                        label={t('login_email_label') || 'Email'}
                        placeholder={t('login_email_placeholder') || 'you@example.com'}
                    />
                    <PasswordEyeInput
                        name="password1"
                        value={formData.password1}
                        setValue={(v) => handleFormDataChange('password1', v)}
                        label={t('login_password_label') || 'Password'}
                        placeholder={t('login_password_placeholder') || 'Create a password'}
                    />
                    <PasswordEyeInput
                        name="password2"
                        value={formData.password2}
                        setValue={(v) => handleFormDataChange('password2', v)}
                        label={t('login_confirm_password_label') || 'Confirm password'}
                        placeholder={t('login_confirm_password_placeholder') || 'Repeat your password'}
                    />

                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting || registerMutation.isPending}
                    >
                        {(isSubmitting || registerMutation.isPending) ? <Spinner variant="primary" /> : (t('login_create_account_button') || 'Create account')}
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

                <button className="text-btn login-register-footer" onClick={() => navigate('/login')}>
                    <span>{t('login_old_user')}</span>
                    <span className="login-register-color-text">{t('login_submit_button')}</span>
                </button>
            </Card>
        </div>
    )
}

export default Register
