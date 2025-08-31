import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useModalStore from '@/stores/ModalStore';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';
import { KeyMetric } from '@/hooks/useProject';

import '../ProjectModals.css';

interface EditMetricModalProps {
    data?: KeyMetric;
    isAdding: boolean;
    index?: number;
    onSubmit: (metricData: any, index?: number | null) => Promise<void>;
}

const EditMetricModal = ({ data, isAdding, index, onSubmit }: EditMetricModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        metrica: data?.metrica || '',
        metodo_medicion: data?.metodo_medicion || '',
        valor_actual: data?.valor_actual || ''
    });

    const handleSubmit = async () => {
        if (formData.metrica.trim() && formData.metodo_medicion.trim() && formData.valor_actual.trim()) {
            setIsLoading(true);
            try {
                await onSubmit(formData, isAdding ? null : index);
                closeModal();
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="project-modal-content">
            <h3>{isAdding ? t('createProject.stages.impact.addMetric') : t('createProject.stages.impact.editMetric')}</h3>
            
            <Input
                name="metric-name"
                value={formData.metrica}
                label={t('createProject.stages.impact.metricFields.name')}
                setValue={(value) => setFormData({ ...formData, metrica: value })}
                placeholder={t('createProject.stages.impact.metricPlaceholders.name')}
                isRequired={true}
            />

            <Input
                name="measurement-method"
                value={formData.metodo_medicion}
                label={t('createProject.stages.impact.metricFields.method')}
                setValue={(value) => setFormData({ ...formData, metodo_medicion: value })}
                placeholder={t('createProject.stages.impact.metricPlaceholders.method')}
                isRequired={true}
            />

            <Input
                name="current-value"
                value={formData.valor_actual}
                label={t('createProject.stages.impact.metricFields.currentValue')}
                setValue={(value) => setFormData({ ...formData, valor_actual: value })}
                placeholder={t('createProject.stages.impact.metricPlaceholders.currentValue')}
                isRequired={true}
            />

            <div className="form-modal-actions">
                {isLoading ? (
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
                        disabled={!formData.metrica.trim() || !formData.metodo_medicion.trim() || !formData.valor_actual.trim() || isLoading}
                    >
                        {t('common_save')}
                    </Button>
                </>
                )}
            </div>
        </div>
    );
};

export default EditMetricModal;
