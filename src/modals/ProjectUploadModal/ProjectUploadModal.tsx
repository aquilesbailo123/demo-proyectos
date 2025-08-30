import { useTranslation } from 'react-i18next';
import { RiCheckLine, RiUploadLine, RiErrorWarningLine } from 'react-icons/ri';
import useModalStore from '@/stores/ModalStore';
import './ProjectUploadModal.css';

interface ProjectUploadModalProps {
    isUploading: boolean;
    uploadProgress?: number;
    error?: string;
    success?: boolean;
    handleClose?: () => void;
}

const ProjectUploadModal = ({ 
    isUploading, 
    uploadProgress = 0, 
    error, 
    success = false,
    handleClose 
}: ProjectUploadModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const handleModalClose = () => {
        if (handleClose) {
            handleClose();
        }
        closeModal();
    };

    return (
        <div className="projectupload-content">
            <div className="projectupload-header">
                {success ? (
                    <div className="projectupload-icon success">
                        <RiCheckLine size={32} />
                    </div>
                ) : error ? (
                    <div className="projectupload-icon error">
                        <RiErrorWarningLine size={32} />
                    </div>
                ) : (
                    <div className="projectupload-icon uploading">
                        <RiUploadLine size={32} className={isUploading ? 'spin' : ''} />
                    </div>
                )}
                
                <h3 className="projectupload-title">
                    {success 
                        ? t('createProject.upload.success.title')
                        : error 
                        ? t('createProject.upload.error.title')
                        : t('createProject.upload.uploading.title')
                    }
                </h3>
            </div>

            <div className="projectupload-body">
                {success ? (
                    <p className="projectupload-message success">
                        {t('createProject.upload.success.message')}
                    </p>
                ) : error ? (
                    <div className="projectupload-error">
                        <p className="projectupload-message error">
                            {t('createProject.upload.error.message')}
                        </p>
                        <p className="projectupload-error-detail">
                            {error}
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="projectupload-message">
                            {t('createProject.upload.uploading.message')}
                        </p>
                        
                        <div className="projectupload-progress">
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <span className="progress-text">
                                {Math.round(uploadProgress)}%
                            </span>
                        </div>
                        
                        <div className="projectupload-steps">
                            <div className={`upload-step ${uploadProgress >= 25 ? 'completed' : 'active'}`}>
                                {t('createProject.upload.steps.validating')}
                            </div>
                            <div className={`upload-step ${uploadProgress >= 50 ? 'completed' : uploadProgress >= 25 ? 'active' : ''}`}>
                                {t('createProject.upload.steps.uploading')}
                            </div>
                            <div className={`upload-step ${uploadProgress >= 75 ? 'completed' : uploadProgress >= 50 ? 'active' : ''}`}>
                                {t('createProject.upload.steps.processing')}
                            </div>
                            <div className={`upload-step ${uploadProgress >= 100 ? 'completed' : uploadProgress >= 75 ? 'active' : ''}`}>
                                {t('createProject.upload.steps.finalizing')}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {(success || error) && (
                <div className="projectupload-actions">
                    <button 
                        className="projectupload-close-btn"
                        onClick={handleModalClose}
                    >
                        {success ? t('common_continue') : t('common_close')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectUploadModal;
