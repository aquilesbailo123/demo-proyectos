import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Card from '@/components/common/Card/Card'
import Button from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner/Spinner'
import toast from 'react-hot-toast'
import { useVerifyEmail, getApiErrorMessage } from '@/hooks/auth'

const VerifyEmail = () => {
    const { t } = useTranslation('common')
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const key = params.get('key') || ''
    const verifyMutation = useVerifyEmail()
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>(key ? 'pending' : 'error')

    useEffect(() => {
        const run = async () => {
          if (!key) return
          try {
              await verifyMutation.mutateAsync({ key })
              setStatus('success')
              toast.success(t('login_verify_email_success'))
          } catch (e) {
              setStatus('error')
              toast.error(getApiErrorMessage(e))
          }
        }
        run()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])

    return (
      <div className="login-register-main-cont animated-gradient-background">
          <div className="login-register-header" />
          <Card className="login-register-card-cont">
              <div className="section-title">{t('login_verify_email')}</div>
              {status === 'pending' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Spinner variant="primary" /> {t('login_verify_email_loading')}
                    </div>
              )}
              {status === 'success' && (
                  <>
                      <p>{t('login_verify_email_success')}</p>
                      <Button variant="primary" size="lg" onClick={() => navigate('/login')}>{t('login_back_to_login_button')}</Button>
                  </>
              )}
              {status === 'error' && (
                  <>
                      <p>{t('login_verify_email_invalid')}</p>
                      <Button variant="primary" size="lg" onClick={() => navigate('/login')}>{t('login_back_to_login_button')}</Button>
                  </>
              )}
          </Card>
      </div>
  )
}

export default VerifyEmail
