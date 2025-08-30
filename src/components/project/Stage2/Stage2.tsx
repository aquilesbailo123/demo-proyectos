import { useTranslation } from 'react-i18next';
import Input from '@/components/forms/Input/Input';
import { useProjectStore } from '@/stores/ProjectStore';
import '../Stages.css';
import './Stage2.css';

const Stage2 = () => {
    const { t } = useTranslation('common');
    const { value_proposition, updateProjectData } = useProjectStore();

    const handleInputChange = (field: keyof typeof value_proposition, value: string) => {
        updateProjectData({
            value_proposition: {
                ...value_proposition,
                [field]: value
            }
        });
    };

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 2: {t('createProject.stages.valueProposition.title')}</h2>
                <p>{t('createProject.stages.valueProposition.description')}</p>
            </div>

            <div className="stage-content">
                <div className="form-group">
                    <Input
                        name="problema"
                        value={value_proposition.problema}
                        setValue={(value) => handleInputChange('problema', value)}
                        label={t('createProject.stages.valueProposition.fields.problem')}
                        placeholder={t('createProject.stages.valueProposition.placeholders.problem')}
                        multiline={true}
                        rows={4}
                        maxLength={500}
                        isRequired={true}
                    />
                    <div className="char-count">
                        {value_proposition.problema.length}/500
                    </div>
                </div>

                <div className="form-group">
                    <Input
                        name="solucion"
                        value={value_proposition.solucion}
                        setValue={(value) => handleInputChange('solucion', value)}
                        label={t('createProject.stages.valueProposition.fields.solution')}
                        placeholder={t('createProject.stages.valueProposition.placeholders.solution')}
                        multiline={true}
                        rows={4}
                        maxLength={500}
                        isRequired={true}
                    />
                    <div className="char-count">
                        {value_proposition.solucion.length}/500
                    </div>
                </div>

                <div className="form-group">
                    <Input
                        name="propuesta-unica-valor"
                        value={value_proposition.propuesta_unica_valor}
                        setValue={(value) => handleInputChange('propuesta_unica_valor', value)}
                        label={t('createProject.stages.valueProposition.fields.uniqueValue')}
                        placeholder={t('createProject.stages.valueProposition.placeholders.uniqueValue')}
                        multiline={true}
                        rows={4}
                        maxLength={500}
                        isRequired={true}
                    />
                    <div className="char-count">
                        {value_proposition.propuesta_unica_valor.length}/500
                    </div>
                </div>

                <div className="form-group">
                    <Input
                        name="modelo-negocio"
                        value={value_proposition.modelo_negocio}
                        setValue={(value) => handleInputChange('modelo_negocio', value)}
                        label={t('createProject.stages.valueProposition.fields.businessModel')}
                        placeholder={t('createProject.stages.valueProposition.placeholders.businessModel')}
                        multiline={true}
                        rows={4}
                        maxLength={500}
                        isRequired={true}
                    />
                    <div className="char-count">
                        {value_proposition.modelo_negocio.length}/500
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stage2;
