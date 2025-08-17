import { useSearchParams, useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Card from '@/components/common/Card/Card'
import Spinner from '@/components/common/Spinner/Spinner'
import toast from 'react-hot-toast'
import { useResendConfirmation, getApiErrorMessage } from '@/hooks/auth'
import { useTranslation } from 'react-i18next'

const CheckEmail = () => {
    const { t } = useTranslation('common')
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const email = params.get('email') || ''
    const resend = useResendConfirmation()

    const handleResend = async () => {
        if (!email) return toast.error('Missing email')
        try {
            await resend.mutateAsync({ email })
            toast.success(t('login_verify_email_sent'))
        } catch (e) {
            toast.error(getApiErrorMessage(e))
        }
    }

    return (
      <div className="login-register-main-cont animated-gradient-background">
          <div className="login-register-header" />
          <Card className="login-register-card-cont">
              <div className="section-title">{t('login_verify_email')}</div>
              <p>{t('login_verify_email_message', { email: email })}</p>
              <div style={{ display: 'flex', gap: 12 }}>
                  <Button variant="primary" size="lg" onClick={() => navigate('/login')}>{t('login_back_to_login_button')}</Button>
                  <Button variant="secondary" size="lg" type="button" onClick={handleResend} disabled={resend.isPending}>
                      {resend.isPending ? <Spinner variant="primary" /> : t('login_verify_resend_email')}
                  </Button>
              </div>
          </Card>
      </div>
    )
}

export default CheckEmail
