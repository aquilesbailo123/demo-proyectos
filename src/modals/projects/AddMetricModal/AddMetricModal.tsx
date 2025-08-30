import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { KeyMetric } from '@/hooks/useProject';
import useModalStore from '@/stores/ModalStore';
import Input from "@/components/forms/Input/Input"
import Button from "@/components/common/Button/Button"

import "../ProjectModals.css"

const AddMetricModal = ({
        data = null,
        isAdding = false,
        index = null,
        onSubmit
    } : { 
        data?: KeyMetric | null,
        isAdding?: boolean,
        index?: number | null,
        onSubmit: (metric: KeyMetric, index?: number | null) => void
    }) => {

    const { t } = useTranslation('common');

    const { closeModal } = useModalStore();

    const [metricForm, setMetricForm] = useState<Omit<KeyMetric, 'id' | 'created' | 'updated'>>({
        metrica: data?.metrica || '',
        metodo_medicion: data?.metodo_medicion || '',
        valor_actual: data?.valor_actual || ''
    });
    
    return (
        <div className="project-modal-content">
            <h3>
                {isAdding 
                    ? t('createProject.stages.impact.addMetric')
                    : t('createProject.stages.impact.editMetric')
                }
            </h3>
            <Input
                name="metrica"
                value={metricForm.metrica}
                label={t('createProject.stages.impact.metricFields.name')}
                setValue={(value) => setMetricForm({...metricForm, metrica: value})}
                placeholder={t('createProject.stages.impact.metricPlaceholders.name')}
                isRequired={true}
            />
            <Input
                name="metric-method"
                value={metricForm.metodo_medicion}
                setValue={(value) => setMetricForm({...metricForm, metodo_medicion: value})}
                label={t('createProject.stages.impact.metricFields.method')}
                placeholder={t('createProject.stages.impact.metricPlaceholders.method')}
                multiline={true}
                rows={3}
                isRequired={true}
            />
            <Input
                name="valor_actual"
                value={metricForm.valor_actual}
                label={t('createProject.stages.impact.metricFields.currentValue')}
                setValue={(value) => setMetricForm({...metricForm, valor_actual: value})}
                placeholder={t('createProject.stages.impact.metricPlaceholders.currentValue')}
            />
            <div className="form-modal-actions">
                <Button variant="secondary" onClick={closeModal}>
                    {t('common_cancel')}
                </Button>
                <Button 
                    variant="primary" 
                    onClick={() => onSubmit(metricForm, index)}
                    disabled={!metricForm.metrica.trim() || !metricForm.metodo_medicion.trim()}
                >
                    {t('common_save')}
                </Button>
            </div>
        </div>
    )
}

export default AddMetricModal