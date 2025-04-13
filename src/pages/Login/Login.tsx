import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import Input from '@/components/forms/Input/Input'
import PasswordEyeInput from '@/components/forms/PasswordEyeInput/PasswordEyeInput'
import Button from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner/Spinner'
import { mainLogo } from '@/utils/constants/common'

import './Login.css'

const Login = () => {
    const { t } = useTranslation('common')
    const navigate = useNavigate()

    // TODO replace this with an actual hook
    const [isLoading, setIsLoading] = useState(false)

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

    const handleFormSubmit = (e: any) => {
        e.preventDefault()

        const validation = validateForm(formData)
        if (!validation.isValid) {
            toast.error(validation.message)
            return
        }

        setIsLoading(true)
        setFormData({ username: '', password: '' })

        // TODO replace this with the query
        setTimeout(() => {
            setIsLoading(false)
            navigate('/home')
        }, 200)
    }

    return (
        <div className="login-main-cont">
            <img className="login-logo" src={mainLogo.src} alt={mainLogo.alt} />
            <div className="login-card-cont">
                <div className="login-card-title">{t('login.title')}</div>
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

                    {isLoading ? (
                        <Spinner
                            variant="primary"
                        />
                    ) : (
                        <Button
                            variant="primary"
                        >
                            {t('login.submit')}
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
