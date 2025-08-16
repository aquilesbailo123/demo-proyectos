import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { IoChevronBack } from 'react-icons/io5'

import Card from '@/components/common/Card/Card'
import PasswordEyeInput from '@/components/forms/PasswordEyeInput/PasswordEyeInput'
import Button from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner/Spinner'
import { usePasswordResetConfirm } from '@/hooks/auth'

import '@/styles/LoginRegister.css'
import '@/styles/General.css'

const ResetPassword = () => {
    const { t } = useTranslation('common')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const uid = searchParams.get('uid') || ''
    const token = searchParams.get('token') || ''

    const [formData, setFormData] = useState({ new_password1: '', new_password2: '' })
    const confirmMutation = usePasswordResetConfirm()

    useEffect(() => {
        if (!uid || !token) {
            toast.error(t('invalid_reset_link') || 'Invalid or expired reset link')
        }
    }, [uid, token, t])

    const onSubmit = async (e: any) => {
        e.preventDefault()
        if (!uid || !token) return
        try {
            await confirmMutation.mutateAsync({
                uid,
                token,
                new_password1: formData.new_password1,
                new_password2: formData.new_password2,
            })
            toast.success(t('password_changed') || 'Password changed')
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
                <div className="section-title">{t('reset_password_title') || 'Set a new password'}</div>
                <form className="login-register-form-cont" onSubmit={onSubmit}>
                    <PasswordEyeInput
                        name="new_password1"
                        value={formData.new_password1}
                        setValue={(v) => setFormData((p) => ({ ...p, new_password1: v }))}
                        label={t('login_password_label') || 'New password'}
                        placeholder={t('login_password_placeholder') || 'Enter a new password'}
                    />
                    <PasswordEyeInput
                        name="new_password2"
                        value={formData.new_password2}
                        setValue={(v) => setFormData((p) => ({ ...p, new_password2: v }))}
                        label={t('login_confirm_password_label') || 'Confirm new password'}
                        placeholder={t('login_confirm_password_placeholder') || 'Repeat your new password'}
                    />

                    <Button variant="primary" size="lg" type="submit" disabled={confirmMutation.isPending}>
                        {confirmMutation.isPending ? <Spinner variant="primary" /> : (t('save_new_password') || 'Save new password')}
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default ResetPassword
