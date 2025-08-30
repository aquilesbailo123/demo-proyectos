import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ProjectMember } from '@/hooks/useProject';
import useModalStore from '@/stores/ModalStore';
import Input from "@/components/forms/Input/Input"
import Button from "@/components/common/Button/Button"

import "../ProjectModals.css"

const AddMemberModal = ({
        data = null,
        isAdding = false,
        index = null,
        onSubmit
    } : { 
        data?: ProjectMember | null,
        isAdding?: boolean,
        index?: number | null,
        onSubmit: (member: ProjectMember, index?: number | null) => void
    }) => {

    const { t } = useTranslation('common');

    const { closeModal } = useModalStore();

    const [memberForm, setMemberForm] = useState<Omit<ProjectMember, 'id' | 'created' | 'updated'>>({
        name: data?.name || '',
        academic_title: data?.academic_title || '',
        country: data?.country || '',
        photo: data?.photo || '',
        description: data?.description || '',
        linkedin: data?.linkedin || ''
    });
    
    return (
        <div className="project-modal-content">
            <h3>
                {isAdding 
                    ? t('createProject.stages.team.addMember')
                    : t('createProject.stages.team.editMember')
                }
            </h3>
            <Input
                name="member-name"
                value={memberForm.name}
                label={t('createProject.stages.team.fields.name')}
                setValue={(value) => setMemberForm({...memberForm, name: value})}
                placeholder={t('createProject.stages.team.placeholders.name')}
                isRequired={true}
            />
            <Input
                name="member-title"
                value={memberForm.academic_title || ''}
                label={t('createProject.stages.team.fields.title')}
                setValue={(value) => setMemberForm({...memberForm, academic_title: value})}
                placeholder={t('createProject.stages.team.placeholders.title')}
            />
            <Input
                name="member-country"
                value={memberForm.country || ''}
                label={t('createProject.stages.team.fields.country')}
                setValue={(value) => setMemberForm({...memberForm, country: value})}
                placeholder={t('createProject.stages.team.placeholders.country')}
            />
            <Input
                name="member-photo"
                value={memberForm.photo || ''}
                label={t('createProject.stages.team.fields.photo')}
                setValue={(value) => setMemberForm({...memberForm, photo: value})}
                placeholder={t('createProject.stages.team.placeholders.photo')}
                type="url"
            />
            <Input
                name="member-description"
                value={memberForm.description || ''}
                setValue={(value) => setMemberForm({...memberForm, description: value})}
                label={t('createProject.stages.team.fields.description')}
                placeholder={t('createProject.stages.team.placeholders.description')}
                multiline={true}
                rows={3}
                maxLength={300}
            />
            <Input
                name="member-linkedin"
                value={memberForm.linkedin || ''}
                label={t('createProject.stages.team.fields.linkedin')}
                setValue={(value) => setMemberForm({...memberForm, linkedin: value})}
                placeholder={t('createProject.stages.team.placeholders.linkedin')}
                type="url"
            />
            <div className="form-modal-actions">
                <Button variant="secondary" onClick={closeModal}>
                    {t('common_cancel')}
                </Button>
                <Button 
                    variant="primary" 
                    onClick={() => onSubmit(memberForm, index)}
                    disabled={!memberForm.name.trim()}
                >
                    {t('common_save')}
                </Button>
            </div>
        </div>
    )
}

export default AddMemberModal