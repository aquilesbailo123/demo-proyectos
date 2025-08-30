import { useTranslation } from 'react-i18next';
import { RiAddLine, RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';

import useModalStore from '@/stores/ModalStore';
import { useProjectStore } from '@/stores/ProjectStore';
import { ProjectMember } from '@/hooks/useProject';
import AddMemberModal from '@/modals/projects/AddMemberModal/AddMemberModal';

import '../Stages.css';
import './Stage3.css';

const Stage3 = () => {
    const { t } = useTranslation('common');

    const { setModalContent, closeModal } = useModalStore();
    const { equipo, addTeamMember, updateTeamMember, removeTeamMember } = useProjectStore();

    const handleAddMember = () => {
        setModalContent(
            <AddMemberModal
                isAdding={true}
                onSubmit={handleSaveMember}
            />
        )
    };

    const handleEditMember = (index: number) => {
        setModalContent(
            <AddMemberModal
                data={equipo[index]}
                isAdding={false}
                index={index}
                onSubmit={handleSaveMember}
            />
        )
    };

    const handleSaveMember = (member: ProjectMember, index?: number | null) => {
        if (member.name.trim()) {
            if (index !== null && index !== undefined) {
                updateTeamMember(index, member);
            } else {
                addTeamMember(member);
            }
            closeModal();
        }
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
        </div>
    );
};

export default Stage3;
