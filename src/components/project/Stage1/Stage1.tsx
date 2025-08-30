import { useTranslation } from 'react-i18next';
import Input from '@/components/forms/Input/Input';
import Select from '@/components/forms/Select/Select';
import { useProjectStore } from '@/stores/ProjectStore';
import { useIndustries } from '@/hooks/useOptions';
import '../Stages.css';
import './Stage1.css';

const Stage1 = () => {
    const { t } = useTranslation('common');
    const {
        name,
        slogan,
        resumen_ejecutivo,
        industry_id,
        logo,
        website,
        twitter,
        linkedin,
        updateProjectData
    } = useProjectStore();

    const { data: industries, isLoading: industriesLoading } = useIndustries();

    const handleInputChange = (field: string, value: string | number) => {
        updateProjectData({ [field]: value });
    };

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 1: {t('createProject.stages.identity.title')}</h2>
                <p>{t('createProject.stages.identity.description')}</p>
            </div>

            <div className="stage-content">
                <div className="form-row">
                    <Input
                        name="project-name"
                        value={name}
                        label={t('createProject.stages.identity.fields.name')}
                        setValue={(value) => handleInputChange('name', value)}
                        placeholder={t('createProject.stages.identity.placeholders.name')}
                        isRequired={true}
                        maxLength={100}
                    />
                    <Input
                        name="project-slogan"
                        value={slogan}
                        label={t('createProject.stages.identity.fields.slogan')}
                        setValue={(value) => handleInputChange('slogan', value)}
                        placeholder={t('createProject.stages.identity.placeholders.slogan')}
                        isRequired={true}
                        maxLength={150}
                    />
                </div>

                <div className="form-group">
                    <Input
                        name="resumen-ejecutivo"
                        value={resumen_ejecutivo}
                        setValue={(value) => handleInputChange('resumen_ejecutivo', value)}
                        label={t('createProject.stages.identity.fields.executiveSummary')}
                        placeholder={t('createProject.stages.identity.placeholders.executiveSummary')}
                        multiline={true}
                        rows={6}
                        maxLength={1000}
                        isRequired={true}
                    />
                    <div className="char-count">
                        {resumen_ejecutivo.length}/1000
                    </div>
                </div>

                <div className="form-group">
                    <Select
                        value={industry_id?.toString() || ''}
                        label={t('createProject.stages.identity.fields.industry')}
                        onChange={(e) => handleInputChange('industry_id', parseInt(e.target.value))}
                        options={[
                            { value: '', label: t('createProject.stages.identity.placeholders.industry') },
                            ...(industries?.map(industry => ({
                                value: industry.id.toString(),
                                label: industry.name
                            })) || [])
                        ]}
                        disabled={industriesLoading}
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <Input
                        name="project-logo"
                        value={logo}
                        label={t('createProject.stages.identity.fields.logo')}
                        setValue={(value) => handleInputChange('logo', value)}
                        placeholder={t('createProject.stages.identity.placeholders.logo')}
                        type="url"
                    />
                    <Input
                        name="project-website"
                        value={website}
                        label={t('createProject.stages.identity.fields.website')}
                        setValue={(value) => handleInputChange('website', value)}
                        placeholder={t('createProject.stages.identity.placeholders.website')}
                        type="url"
                    />
                </div>

                <div className="form-row">
                    <Input
                        name="project-twitter"
                        value={twitter}
                        label={t('createProject.stages.identity.fields.twitter')}
                        setValue={(value) => handleInputChange('twitter', value)}
                        placeholder={t('createProject.stages.identity.placeholders.twitter')}
                        type="url"
                    />
                    <Input
                        name="project-linkedin"
                        value={linkedin}
                        label={t('createProject.stages.identity.fields.linkedin')}
                        setValue={(value) => handleInputChange('linkedin', value)}
                        placeholder={t('createProject.stages.identity.placeholders.linkedin')}
                        type="url"
                    />
                </div>
            </div>
        </div>
    );
};

export default Stage1;
