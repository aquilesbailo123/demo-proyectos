import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiAddLine, RiDeleteBin6Line, RiEditLine, RiCloseLine } from 'react-icons/ri';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import { useProjectStore } from '@/stores/ProjectStore';
import { ProjectMember } from '@/hooks/useProject';
import '../Stages.css';
import './Stage3.css';

const Stage3 = () => {
    const { t } = useTranslation('common');
    const { equipo, addTeamMember, updateTeamMember, removeTeamMember } = useProjectStore();
    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [memberForm, setMemberForm] = useState<Omit<ProjectMember, 'id' | 'created' | 'updated'>>({
        name: '',
        academic_title: '',
        country: '',
        photo: '',
        description: '',
        linkedin: ''
    });

    const resetForm = () => {
        setMemberForm({
            name: '',
            academic_title: '',
            country: '',
            photo: '',
            description: '',
            linkedin: ''
        });
    };

    const handleAddMember = () => {
        resetForm();
        setEditingIndex(null);
        setShowModal(true);
    };

    const handleEditMember = (index: number) => {
        setMemberForm(equipo[index]);
        setEditingIndex(index);
        setShowModal(true);
    };

    const handleSaveMember = () => {
        if (memberForm.name.trim()) {
            if (editingIndex !== null) {
                updateTeamMember(editingIndex, memberForm);
            } else {
                addTeamMember(memberForm);
            }
            resetForm();
            setShowModal(false);
            setEditingIndex(null);
        }
    };

    const handleCancel = () => {
        resetForm();
        setShowModal(false);
        setEditingIndex(null);
    };

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 3: {t('createProject.stages.team.title')}</h2>
                <p>{t('createProject.stages.team.description')}</p>
            </div>

            <div className="stage-content">
                <div className="card-list">
                    {equipo.map((member, index) => (
                        <div key={index} className="card-item team-member-card">
                            <div className="team-member-content">
                                <div className="member-avatar">
                                    {member.photo ? (
                                        <img src={member.photo} alt={member.name} />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="member-info">
                                    <h4>{t('name')}: {member.name}</h4>
                                    {member.academic_title && <p className="member-title">{t('academic_title')}: {member.academic_title}</p>}
                                    {member.country && <p className="member-country">{t('country')}: {member.country}</p>}
                                    {member.description && <p className="member-description">{t('description')}: {member.description}</p>}
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-linkedin">
                                            LinkedIn
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="card-actions">
                                <button
                                    type="button"
                                    onClick={() => handleEditMember(index)}
                                    className="card-action-btn"
                                    title={t('common.edit')}
                                >
                                    <RiEditLine />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeTeamMember(index)}
                                    className="card-action-btn danger"
                                    title={t('common.delete')}
                                >
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddMember}
                        className="add-card-btn"
                    >
                        <RiAddLine />
                        {t('createProject.stages.team.addMember')}
                    </button>
                </div>

                {equipo.length === 0 && (
                    <div className="empty-state">
                        <p>{t('createProject.stages.team.emptyState')}</p>
                    </div>
                )}
            </div>

            {/* Member Form Modal */}
            {showModal && (
                <div className="form-modal">
                    <div className="form-modal-content">
                        <div className="form-modal-header">
                            <h3>
                                {editingIndex !== null 
                                    ? t('createProject.stages.team.editMember')
                                    : t('createProject.stages.team.addMember')
                                }
                            </h3>
                            <button onClick={handleCancel} className="close-btn">
                                <RiCloseLine />
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="form-label required">
                                {t('createProject.stages.team.fields.name')}
                            </label>
                            <Input
                                name="member-name"
                                value={memberForm.name}
                                setValue={(value) => setMemberForm({...memberForm, name: value})}
                                placeholder={t('createProject.stages.team.placeholders.name')}
                                isRequired={true}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {t('createProject.stages.team.fields.title')}
                            </label>
                            <Input
                                name="member-title"
                                value={memberForm.academic_title || ''}
                                setValue={(value) => setMemberForm({...memberForm, academic_title: value})}
                                placeholder={t('createProject.stages.team.placeholders.title')}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {t('createProject.stages.team.fields.country')}
                            </label>
                            <Input
                                name="member-country"
                                value={memberForm.country || ''}
                                setValue={(value) => setMemberForm({...memberForm, country: value})}
                                placeholder={t('createProject.stages.team.placeholders.country')}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {t('createProject.stages.team.fields.photo')}
                            </label>
                            <Input
                                name="member-photo"
                                value={memberForm.photo || ''}
                                setValue={(value) => setMemberForm({...memberForm, photo: value})}
                                placeholder={t('createProject.stages.team.placeholders.photo')}
                                type="url"
                            />
                        </div>

                        <div className="form-group">
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
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {t('createProject.stages.team.fields.linkedin')}
                            </label>
                            <Input
                                name="member-linkedin"
                                value={memberForm.linkedin || ''}
                                setValue={(value) => setMemberForm({...memberForm, linkedin: value})}
                                placeholder={t('createProject.stages.team.placeholders.linkedin')}
                                type="url"
                            />
                        </div>

                        <div className="form-modal-actions">
                            <Button variant="secondary" onClick={handleCancel}>
                                {t('common.cancel')}
                            </Button>
                            <Button 
                                variant="primary" 
                                onClick={handleSaveMember}
                                disabled={!memberForm.name.trim()}
                            >
                                {editingIndex !== null ? t('common.update') : t('common.add')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stage3;
