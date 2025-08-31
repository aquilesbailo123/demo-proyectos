import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useModalStore from '@/stores/ModalStore';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';

import '../ProjectModals.css';

interface ValuePropositionData {
    problema: string;
    solucion: string;
    propuesta_unica_valor: string;
    modelo_negocio: string;
}

interface EditValuePropositionModalProps {
    data: ValuePropositionData;
    onSubmit: (data: ValuePropositionData) => Promise<void>;
}

const EditValuePropositionModal = ({ data, onSubmit }: EditValuePropositionModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const [formData, setFormData] = useState({
        problema: data.problema || '',
        solucion: data.solucion || '',
        propuesta_unica_valor: data.propuesta_unica_valor || '',
        modelo_negocio: data.modelo_negocio || ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = formData.problema.trim() && formData.solucion.trim() && 
                       formData.propuesta_unica_valor.trim() && formData.modelo_negocio.trim();

    const handleSubmit = async () => {
        if (isFormValid) {
            setIsSubmitting(true);
            try {
                await onSubmit(formData);
                closeModal();
            } catch (error) {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="project-modal-content">
            <h3>{t('project_value_proposition')}</h3>
            
            <Input
                name="problema"
                value={formData.problema}
                label={t('createProject.stages.valueProposition.fields.problem')}
                setValue={(value) => setFormData({ ...formData, problema: value })}
                placeholder={t('createProject.stages.valueProposition.placeholders.problem')}
                multiline={true}
                rows={3}
                maxLength={500}
                isRequired={true}
            />

            <Input
                name="solucion"
                value={formData.solucion}
                label={t('createProject.stages.valueProposition.fields.solution')}
                setValue={(value) => setFormData({ ...formData, solucion: value })}
                placeholder={t('createProject.stages.valueProposition.placeholders.solution')}
                multiline={true}
                rows={3}
                maxLength={500}
                isRequired={true}
            />

            <Input
                name="propuesta-unica-valor"
                value={formData.propuesta_unica_valor}
                label={t('createProject.stages.valueProposition.fields.uniqueValue')}
                setValue={(value) => setFormData({ ...formData, propuesta_unica_valor: value })}
                placeholder={t('createProject.stages.valueProposition.placeholders.uniqueValue')}
                multiline={true}
                rows={3}
                maxLength={500}
                isRequired={true}
            />

            <Input
                name="modelo-negocio"
                value={formData.modelo_negocio}
                label={t('createProject.stages.valueProposition.fields.businessModel')}
                setValue={(value) => setFormData({ ...formData, modelo_negocio: value })}
                placeholder={t('createProject.stages.valueProposition.placeholders.businessModel')}
                multiline={true}
                rows={3}
                maxLength={500}
                isRequired={true}
            />

            <div className="form-modal-actions">
                {isSubmitting ? (
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
                        disabled={isSubmitting}
                    >
                        {t('common_save')}
                    </Button>
                </>
                )}
            </div>
        </div>
    );
};

export default EditValuePropositionModal;
