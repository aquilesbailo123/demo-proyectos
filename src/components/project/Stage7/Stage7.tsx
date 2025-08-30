import { useTranslation } from 'react-i18next';
import Input from '@/components/forms/Input/Input';
import { useProjectStore } from '@/stores/ProjectStore';
import '../Stages.css';
import './Stage7.css';

const Stage7 = () => {
    const { t } = useTranslation('common');
    const {
        acta_constitutiva,
        identificacion_representante,
        whitepaper,
        cap_table,
        updateProjectData
    } = useProjectStore();

    const handleInputChange = (field: string, value: string) => {
        updateProjectData({ [field]: value });
    };

    const documents = [
        {
            field: 'acta_constitutiva',
            value: acta_constitutiva,
            label: t('createProject.stages.legal.fields.incorporationAct'),
            placeholder: t('createProject.stages.legal.placeholders.incorporationAct'),
            description: t('createProject.stages.legal.descriptions.incorporationAct')
        },
        {
            field: 'identificacion_representante',
            value: identificacion_representante,
            label: t('createProject.stages.legal.fields.representativeId'),
            placeholder: t('createProject.stages.legal.placeholders.representativeId'),
            description: t('createProject.stages.legal.descriptions.representativeId')
        },
        {
            field: 'whitepaper',
            value: whitepaper,
            label: t('createProject.stages.legal.fields.whitepaper'),
            placeholder: t('createProject.stages.legal.placeholders.whitepaper'),
            description: t('createProject.stages.legal.descriptions.whitepaper')
        },
        {
            field: 'cap_table',
            value: cap_table,
            label: t('createProject.stages.legal.fields.capTable'),
            placeholder: t('createProject.stages.legal.placeholders.capTable'),
            description: t('createProject.stages.legal.descriptions.capTable')
        }
    ];

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 7: {t('createProject.stages.legal.title')}</h2>
                <p>{t('createProject.stages.legal.description')}</p>
            </div>

            <div className="stage-content">
                <div className="legal-notice">
                    <div className="notice-icon">📋</div>
                    <div className="notice-content">
                        <h4>{t('createProject.stages.legal.notice.title')}</h4>
                        <p>{t('createProject.stages.legal.notice.description')}</p>
                    </div>
                </div>

                <div className="documents-grid">
                    {documents.map((doc) => (
                        <div key={doc.field} className="document-item">
                            <div className="document-header">
                                <label className="form-label">
                                    {doc.label}
                                </label>
                                <span className="optional-badge">
                                    {t('createProject.stages.legal.optional')}
                                </span>
                            </div>
                
                            <p className="document-description">
                                {doc.description}
                            </p>
                
                            <Input
                                name={doc.field}
                                value={doc.value}
                                setValue={(value) => handleInputChange(doc.field, value)}
                                placeholder={doc.placeholder}
                                type="url"
                            />
                        </div>
                    ))}
                </div>

                <div className="legal-guidelines">
                    <h4>{t('createProject.stages.legal.guidelines.title')}</h4>
                    <ul className="guidelines-list">
                        <li>{t('createProject.stages.legal.guidelines.secure')}</li>
                        <li>{t('createProject.stages.legal.guidelines.accessible')}</li>
                        <li>{t('createProject.stages.legal.guidelines.updated')}</li>
                        <li>{t('createProject.stages.legal.guidelines.backup')}</li>
                    </ul>
                </div>

                <div className="completion-status">
                    <h4>{t('createProject.stages.legal.completion.title')}</h4>
                    <div className="status-grid">
                        {documents.map((doc) => (
                            <div key={doc.field} className={`status-item ${doc.value ? 'completed' : 'pending'}`}>
                                <div className="status-icon">
                                    {doc.value ? '✅' : '⏳'}
                                </div>
                                <span className="status-label">{doc.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stage7;
