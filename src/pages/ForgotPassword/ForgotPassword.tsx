import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { IoChevronBack } from 'react-icons/io5'

import Card from '@/components/common/Card/Card'
import Input from '@/components/forms/Input/Input'
import Button from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner/Spinner'
import { usePasswordReset } from '@/hooks/auth'

import '@/styles/LoginRegister.css'
import '@/styles/General.css'

const ForgotPassword = () => {
    const { t } = useTranslation('common')
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const resetMutation = usePasswordReset()

    const onSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await resetMutation.mutateAsync({ email })
            toast.success(t('reset_email_sent') || 'If an account exists, a reset email was sent')
            navigate('/login')
        } catch (e) {
            toast.error(t('login_general_error') || 'Something went wrong')
        }
    }

    return (
        <div className="login-register-main-cont animated-gradient-background">
            <div className="login-register-header">
                <button
                    className="login-register-back-button"
                    onClick={() => navigate('/login')}
                    aria-label="Back to login"
                >
                    <IoChevronBack /> {t('login_back_to_home_button')}
                </button>
            </div>

            <Card className="login-register-card-cont">
                <div className="section-title">{t('login_forgot_password_title') || 'Forgot your password?'}</div>
                <form className="login-register-form-cont" onSubmit={onSubmit}>
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        setValue={setEmail}
                        label={t('login_email_label') || 'Email'}
                        placeholder={t('login_email_placeholder') || 'you@example.com'}
                    />
                    <Button variant="primary" size="lg" type="submit" disabled={resetMutation.isPending}>
                        {resetMutation.isPending ? <Spinner variant="primary" /> : (t('login_reset_password') || 'Send reset link')}
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default ForgotPassword
