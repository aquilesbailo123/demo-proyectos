import { useEffect, useState } from 'react'
import { RiCheckLine, RiUploadLine, RiCloseLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner/Spinner'

import './ProjectUploadModal.css'

interface ProjectUploadModalProps {
    isUploading: boolean
    onSuccess: () => void
    handleClose?: () => void
}

const ProjectUploadModal = ({ isUploading, onSuccess, handleClose }: ProjectUploadModalProps) => {
    const { t } = useTranslation('common')
    const [uploadStage, setUploadStage] = useState<'uploading' | 'success'>('uploading')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (isUploading) {
            setUploadStage('uploading')
            setProgress(0)
            
            // Simulate upload progress
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval)
                        return 90
                    }
                    return prev + Math.random() * 15
                })
            }, 200)

            return () => clearInterval(interval)
        } else if (!isUploading && progress > 0) {
            // Upload completed
            setProgress(100)
            setTimeout(() => {
                setUploadStage('success')
                setTimeout(() => {
                    onSuccess()
                }, 2000)
            }, 500)
        }
    }, [isUploading, progress, onSuccess])

    const handleCloseClick = () => {
        if (!isUploading && handleClose) {
            handleClose()
            setProgress(0)
            setUploadStage('uploading')
        }
    }

    return (
        <div className="upload-modal-content">
            {uploadStage === 'uploading' ? (
                <>
                    <div className="upload-icon">
                        <RiUploadLine className="upload-icon-svg animate-bounce" />
                    </div>
                    <h2>{t('projectUpload.uploading.title')}</h2>
                    <p>{t('projectUpload.uploading.description')}</p>
                    
                    <div className="upload-progress">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="progress-text">{Math.round(progress)}%</span>
                    </div>

                    <div className="upload-steps">
                        <div className={`upload-step ${progress > 20 ? 'completed' : 'active'}`}>
                            {progress > 20 ? <RiCheckLine /> : <Spinner />}
                            <span>{t('projectUpload.steps.validating')}</span>
                        </div>
                        <div className={`upload-step ${progress > 50 ? 'completed' : progress > 20 ? 'active' : ''}`}>
                            {progress > 50 ? <RiCheckLine /> : progress > 20 ? <Spinner /> : <div className="step-dot" />}
                            <span>{t('projectUpload.steps.uploading')}</span>
                        </div>
                        <div className={`upload-step ${progress > 80 ? 'completed' : progress > 50 ? 'active' : ''}`}>
                            {progress > 80 ? <RiCheckLine /> : progress > 50 ? <Spinner /> : <div className="step-dot" />}
                            <span>{t('projectUpload.steps.processing')}</span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="success-icon">
                        <RiCheckLine className="success-icon-svg animate-scale" />
                    </div>
                    <h2>{t('projectUpload.success.title')}</h2>
                    <p>{t('projectUpload.success.description')}</p>
                    
                    <Button 
                        variant="primary" 
                        onClick={onSuccess}
                        className="success-button"
                    >
                        {t('projectUpload.success.viewProject')}
                    </Button>
                </>
            )}
            
            {!isUploading && uploadStage === 'uploading' && (
                <Button 
                    variant="secondary" 
                    onClick={handleCloseClick}
                    className="cancel-button"
                >
                    <RiCloseLine />
                    {t('common_cancel')}
                </Button>
            )}
        </div>
    )
}

export default ProjectUploadModal
