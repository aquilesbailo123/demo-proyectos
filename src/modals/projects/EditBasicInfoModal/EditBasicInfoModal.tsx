import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useModalStore from '@/stores/ModalStore';
import Button from '@/components/common/Button/Button';
import Input from '@/components/forms/Input/Input';
import FileUpload from '@/components/forms/FileUpload/FileUpload';
import Spinner from '@/components/common/Spinner/Spinner';

import '../ProjectModals.css';

interface BasicInfoData {
    name: string;
    slogan: string;
    logo?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
}

interface EditBasicInfoModalProps {
    data: {
        name: string;
        slogan: string;
        logo?: string;
        website?: string;
        twitter?: string;
        linkedin?: string;
    };
    onSubmit: (data: any) => Promise<void>;
}

const EditBasicInfoModal = ({ data, onSubmit }: EditBasicInfoModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BasicInfoData>({
        name: data.name || '',
        slogan: data.slogan || '',
        logo: data.logo || '',
        website: data.website || '',
        twitter: data.twitter || '',
        linkedin: data.linkedin || ''
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);

    const handleSubmit = async () => {
        if (formData.name.trim()) {
            setIsSubmitting(true);
            try {
                await onSubmit({ ...formData, logoFile });
                closeModal();
            } catch (error) {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="project-modal-content">
            <h3>{t('project_basic_info')}</h3>
            
            <Input
                name="project-name"
                value={formData.name}
                label={t('createProject.stages.identity.fields.name')}
                setValue={(value) => setFormData({ ...formData, name: value })}
                placeholder={t('createProject.stages.identity.placeholders.name')}
                isRequired={true}
            />

            <Input
                name="project-slogan"
                value={formData.slogan}
                label={t('createProject.stages.identity.fields.slogan')}
                setValue={(value) => setFormData({ ...formData, slogan: value })}
                placeholder={t('createProject.stages.identity.placeholders.slogan')}
                isRequired={true}
            />

            <FileUpload
                name="project-logo"
                file={logoFile}
                setFile={setLogoFile}
                label={t('createProject.stages.identity.fields.logo')}
                accept="image/*"
                maxSizeMB={5}
                isRequired={false}
                description={t('fileUpload.logoDescription')}
            />

            <Input
                name="project-website"
                value={formData.website || ''}
                label={t('createProject.stages.identity.fields.website')}
                setValue={(value) => setFormData({ ...formData, website: value })}
                placeholder={t('createProject.stages.identity.placeholders.website')}
                type="url"
            />

            <Input
                name="project-twitter"
                value={formData.twitter || ''}
                label={t('createProject.stages.identity.fields.twitter')}
                setValue={(value) => setFormData({ ...formData, twitter: value })}
                placeholder={t('createProject.stages.identity.placeholders.twitter')}
                type="url"
            />

            <Input
                name="project-linkedin"
                value={formData.linkedin || ''}
                label={t('createProject.stages.identity.fields.linkedin')}
                setValue={(value) => setFormData({ ...formData, linkedin: value })}
                placeholder={t('createProject.stages.identity.placeholders.linkedin')}
                type="url"
            />

            <div className="form-modal-actions">
                {isSubmitting ? (
                    <div className="form-modal-loading">
                        <Spinner size="sm"/>
                    </div>
                ) : (
                <>
                    <Button variant="secondary" onClick={closeModal}>
                        {t('common_cancel')}
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {t('common_save')}
                    </Button>
                </>
                )}
            </div>
        </div>
    );
};

export default EditBasicInfoModal;

