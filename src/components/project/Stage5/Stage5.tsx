import { useTranslation } from 'react-i18next';
import Input from '@/components/forms/Input/Input';
import Select from '@/components/forms/Select/Select';
import FileUpload from '@/components/forms/FileUpload/FileUpload';
import { useProjectStore } from '@/stores/ProjectStore';
import { useProjectStages } from '@/hooks/useOptions';
import '../Stages.css';
import './Stage5.css';

const Stage5 = () => {
    const { t } = useTranslation('common');
    const {
        etapa_actual,
        usuarios_activos,
        ingresos_mensuales,
        numero_clientes,
        tamano_comunidad,
        documento_traccion,
        updateProject
    } = useProjectStore();

    const { data: projectStages, isLoading: stagesLoading } = useProjectStages();

    const handleInputChange = (field: string, value: string | number | null) => {
        updateProject({ [field]: value });
    };

    const handleFileChange = (field: string, file: File | null) => {
        updateProject({ [field]: file });
    };

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 5: {t('createProject.stages.traction.title')}</h2>
                <p>{t('createProject.stages.traction.description')}</p>
            </div>

            <div className="stage-content">
                <div className="form-group">
                    <Select
                        value={etapa_actual}
                        onChange={(e) => handleInputChange('etapa_actual', e.target.value)}
                        label={t('createProject.stages.traction.fields.projectStage')}
                        options={[
                            { value: '', label: t('createProject.stages.traction.placeholders.projectStage') },
                            ...(projectStages?.map(stage => ({
                                value: stage.value,
                                label: stage.label
                            })) || [])
                        ]}
                        disabled={stagesLoading}
                        required={true}
                    />
                </div>

                <div className="traction-metrics">
                    <h3>{t('createProject.stages.traction.metricsTitle')}</h3>
                    <p className="metrics-subtitle">{t('createProject.stages.traction.metricsSubtitle')}</p>
                    
                    <div className="form-group">
                        <div className="form-row">
                            <Input
                                name="active-users"
                                value={usuarios_activos?.toString() || ''}
                                label={t('createProject.stages.traction.fields.activeUsers')}
                                setValue={(value) => handleInputChange('usuarios_activos', value ? parseInt(value) : null)}
                                placeholder={t('createProject.stages.traction.placeholders.activeUsers')}
                                type="number"
                                min="0"
                            />               
                            <Input
                                name="monthly-revenue"
                                value={ingresos_mensuales}
                                label={t('createProject.stages.traction.fields.monthlyRevenue')}
                                setValue={(value) => handleInputChange('ingresos_mensuales', value)}
                                placeholder={t('createProject.stages.traction.placeholders.monthlyRevenue')}
                                type="number"
                                min="0"
                            />
                        </div>

                        <div className="form-row">
                            <Input
                                name="number-of-clients"
                                value={numero_clientes?.toString() || ''}
                                label={t('createProject.stages.traction.fields.numberOfClients')}
                                setValue={(value) => handleInputChange('numero_clientes', value ? parseInt(value) : null)}
                                placeholder={t('createProject.stages.traction.placeholders.numberOfClients')}
                                type="number"
                                min="0"
                            />
                            <Input
                                name="community-size"
                                value={tamano_comunidad?.toString() || ''}
                                label={t('createProject.stages.traction.fields.communitySize')}
                                setValue={(value) => handleInputChange('tamano_comunidad', value ? parseInt(value) : null)}
                                placeholder={t('createProject.stages.traction.placeholders.communitySize')}
                                type="number"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <FileUpload
                        name="traction-document"
                        file={documento_traccion}
                        setFile={(file) => handleFileChange('documento_traccion', file)}
                        label={t('createProject.stages.traction.fields.tractionDocument')}
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        maxSizeMB={10}
                        description={t('createProject.stages.traction.help.tractionDocument')}
                    />
                </div>

                <div className="traction-examples">
                    <h4>{t('createProject.stages.traction.examplesTitle')}</h4>
                    <ul className="examples-list">
                        <li>{t('createProject.stages.traction.examples.analytics')}</li>
                        <li>{t('createProject.stages.traction.examples.testimonials')}</li>
                        <li>{t('createProject.stages.traction.examples.partnerships')}</li>
                        <li>{t('createProject.stages.traction.examples.media')}</li>
                        <li>{t('createProject.stages.traction.examples.awards')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Stage5;
