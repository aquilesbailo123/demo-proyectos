import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useModalStore from '@/stores/ModalStore';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';
import FileUpload from '@/components/forms/FileUpload/FileUpload';
import { ProjectMember } from '@/hooks/useProject';

import '../ProjectModals.css';

interface EditMemberModalProps {
    data?: ProjectMember;
    isAdding: boolean;
    index?: number;
    onSubmit: (memberData: any, index?: number | null, photoFile?: File | null) => Promise<void>;
}

const EditMemberModal = ({ data, isAdding, index, onSubmit }: EditMemberModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: data?.name || '',
        academic_title: data?.academic_title || '',
        country: data?.country || '',
        description: data?.description || '',
        linkedin: data?.linkedin || ''
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const handleSubmit = async () => {
        if (formData.name.trim()) {
            setIsLoading(true);
            try {
                await onSubmit(formData, isAdding ? null : index, photoFile);
                closeModal();
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="project-modal-content">
            <h3>{isAdding ? t('createProject.stages.team.addMember') : t('createProject.stages.team.editMember')}</h3>
            
            <Input
                name="member-name"
                value={formData.name}
                label={t('createProject.stages.team.fields.name')}
                setValue={(value) => setFormData({ ...formData, name: value })}
                placeholder={t('createProject.stages.team.placeholders.name')}
                isRequired={true}
            />

            <Input
                name="academic-title"
                value={formData.academic_title}
                label={t('createProject.stages.team.fields.title')}
                setValue={(value) => setFormData({ ...formData, academic_title: value })}
                placeholder={t('createProject.stages.team.placeholders.title')}
            />

            <Input
                name="country"
                value={formData.country}
                label={t('createProject.stages.team.fields.country')}
                setValue={(value) => setFormData({ ...formData, country: value })}
                placeholder={t('createProject.stages.team.placeholders.country')}
            />

            <Input
                name="member-description"
                value={formData.description}
                label={t('createProject.stages.team.fields.description')}
                setValue={(value) => setFormData({ ...formData, description: value })}
                placeholder={t('createProject.stages.team.placeholders.description')}
                multiline={true}
                rows={3}
                maxLength={500}
            />

            <Input
                name="member-linkedin"
                value={formData.linkedin}
                label={t('createProject.stages.team.fields.linkedin')}
                setValue={(value) => setFormData({ ...formData, linkedin: value })}
                placeholder={t('createProject.stages.team.placeholders.linkedin')}
                type="url"
            />

            <FileUpload
                name="member-photo"
                file={photoFile}
                setFile={setPhotoFile}
                label={t('createProject.stages.team.fields.photo')}
                accept="image/*"
                maxSizeMB={5}
                isRequired={false}
                description={t('fileUpload.photoDescription')}
            />

            <div className="form-modal-actions">
                {isLoading ? (
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
                        disabled={isLoading}
                    >
                        {t('common_save')}
                    </Button>
                </>
                )}
            </div>
        </div>
    );
};

export default EditMemberModal;
