import { useTranslation } from 'react-i18next';
import Input from '@/components/forms/Input/Input';
import Select from '@/components/forms/Select/Select';
import FileUpload from '@/components/forms/FileUpload/FileUpload';
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
        updateProject
    } = useProjectStore();

    const { data: industries, isLoading: industriesLoading } = useIndustries();

    const handleInputChange = (field: string, value: string | number) => {
        updateProject({ [field]: value });
    };

    const handleFileChange = (field: string, file: File | null) => {
        updateProject({ [field]: file });
    };

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 1: {t('createProject.stages.identity.title')}</h2>
                <p>{t('createProject.stages.identity.description')}</p>
            </div>

            <div className="stage-content">
                <div className="form-row">
                    <div className="form-group">
                        <Input
                            name="project-name"
                            value={name}
                            label={t('createProject.stages.identity.fields.name')}
                            setValue={(value) => handleInputChange('name', value)}
                            placeholder={t('createProject.stages.identity.placeholders.name')}
                            variant="bordered"
                            color="primary"
                            size="lg"
                            radius="lg"
                            isRequired={true}
                            maxLength={100}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            name="project-slogan"
                            value={slogan}
                            label={t('createProject.stages.identity.fields.slogan')}
                            setValue={(value) => handleInputChange('slogan', value)}
                            placeholder={t('createProject.stages.identity.placeholders.slogan')}
                            variant="bordered"
                            color="secondary"
                            size="lg"
                            radius="lg"
                            isRequired={true}
                            maxLength={150}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <Input
                        name="resumen-ejecutivo"
                        value={resumen_ejecutivo}
                        setValue={(value) => handleInputChange('resumen_ejecutivo', value)}
                        label={t('createProject.stages.identity.fields.executiveSummary')}
                        placeholder={t('createProject.stages.identity.placeholders.executiveSummary')}
                        variant="faded"
                        color="primary"
                        size="lg"
                        radius="lg"
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
                
                <div className="form-group">
                    <FileUpload
                        name="project-logo"
                        file={logo}
                        setFile={(file) => handleFileChange('logo', file)}
                        label={t('createProject.stages.identity.fields.logo')}
                        accept="image/*"
                        maxSizeMB={5}
                        description={t('createProject.stages.identity.descriptions.logo')}
                    />
                </div>
                
                <div className="form-row-three">
                    <div className="form-group">
                        <Input
                            name="project-website"
                            value={website}
                            label={t('createProject.stages.identity.fields.website')}
                            setValue={(value) => handleInputChange('website', value)}
                            placeholder={t('createProject.stages.identity.placeholders.website')}
                            variant="underlined"
                            color="primary"
                            size="lg"
                            type="url"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            name="project-twitter"
                            value={twitter}
                            label={t('createProject.stages.identity.fields.twitter')}
                            setValue={(value) => handleInputChange('twitter', value)}
                            placeholder={t('createProject.stages.identity.placeholders.twitter')}
                            variant="underlined"
                            color="primary"
                            size="lg"
                            type="url"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            name="project-linkedin"
                            value={linkedin}
                            label={t('createProject.stages.identity.fields.linkedin')}
                            setValue={(value) => handleInputChange('linkedin', value)}
                            placeholder={t('createProject.stages.identity.placeholders.linkedin')}
                            variant="underlined"
                            color="primary"
                            size="lg"
                            type="url"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stage1;
