import { useTranslation } from 'react-i18next';
import FileUpload from '@/components/forms/FileUpload/FileUpload';
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
        updateProject
    } = useProjectStore();

    const handleFileChange = (field: string, file: File | null) => {
        updateProject({ [field]: file });
    };

    const documents = [
        {
            field: 'acta_constitutiva',
            file: acta_constitutiva,
            label: t('createProject.stages.legal.fields.incorporationAct'),
            description: t('createProject.stages.legal.descriptions.incorporationAct'),
            accept: '.pdf,.doc,.docx',
            required: true
        },
        {
            field: 'identificacion_representante',
            file: identificacion_representante,
            label: t('createProject.stages.legal.fields.representativeId'),
            description: t('createProject.stages.legal.descriptions.representativeId'),
            accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
            required: true
        },
        {
            field: 'whitepaper',
            file: whitepaper,
            label: t('createProject.stages.legal.fields.whitepaper'),
            description: t('createProject.stages.legal.descriptions.whitepaper'),
            accept: '.pdf,.doc,.docx',
            required: false
        },
        {
            field: 'cap_table',
            file: cap_table,
            label: t('createProject.stages.legal.fields.capTable'),
            description: t('createProject.stages.legal.descriptions.capTable'),
            accept: '.pdf,.doc,.docx,.xls,.xlsx',
            required: false
        }
    ];

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 7: {t('createProject.stages.legal.title')}</h2>
                <p>{t('createProject.stages.legal.description')}</p>
            </div>

            <div className="stage-content">
                {/* <div className="legal-notice">
                    <div className="notice-icon">📋</div>
                    <div className="notice-content">
                        <h4>{t('createProject.stages.legal.notice.title')}</h4>
                        <p>{t('createProject.stages.legal.notice.description')}</p>
                    </div>
                </div> */}

                <div className="documents-grid">
                    {documents.map((doc) => (
                        <div key={doc.field} className="document-item">
                            <FileUpload
                                name={doc.field}
                                file={doc.file}
                                setFile={(file) => handleFileChange(doc.field, file)}
                                label={doc.label}
                                accept={doc.accept}
                                maxSizeMB={10}
                                isRequired={doc.required}
                                description={doc.description}
                            />
                            {/* {!doc.required && (
                                <span className="optional-badge">
                                    {t('createProject.stages.legal.optional')}
                                </span>
                            )} */}
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

                {/* <div className="completion-status">
                    <h4>{t('createProject.stages.legal.completion.title')}</h4>
                    <div className="status-grid">
                        {documents.map((doc) => (
                            <div key={doc.field} className={`status-item ${doc.file ? 'completed' : 'pending'}`}>
                                <div className="status-icon">
                                    {doc.file ? '✅' : '⏳'}
                                </div>
                                <span className="status-label">{doc.label}</span>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Stage7;
