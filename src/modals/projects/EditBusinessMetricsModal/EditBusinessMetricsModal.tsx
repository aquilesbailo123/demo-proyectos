import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useModalStore from '@/stores/ModalStore';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';

import '../ProjectModals.css';

interface BusinessMetricsData {
    usuarios_activos?: number;
    ingresos_mensuales?: string;
    numero_clientes?: number;
    tamano_comunidad?: number;
}

interface EditBusinessMetricsModalProps {
    data: {
        usuarios_activos?: number;
        ingresos_mensuales?: string;
        numero_clientes?: number;
        tamano_comunidad?: number;
    };
    onSubmit: (data: any) => Promise<void>;
}

const EditBusinessMetricsModal = ({ data, onSubmit }: EditBusinessMetricsModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BusinessMetricsData>({
        usuarios_activos: data.usuarios_activos || undefined,
        ingresos_mensuales: data.ingresos_mensuales || '',
        numero_clientes: data.numero_clientes || undefined,
        tamano_comunidad: data.tamano_comunidad || undefined
    });

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            closeModal();
        } catch (error) {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="project-modal-content">
            <h3>{t('project_business_metrics')}</h3>
            
            <Input
                name="usuarios-activos"
                value={formData.usuarios_activos?.toString() || ''}
                label={t('createProject.stages.traction.fields.activeUsers')}
                setValue={(value) => setFormData({ 
                    ...formData, 
                    usuarios_activos: value ? parseInt(value) : undefined 
                })}
                placeholder={t('createProject.stages.traction.placeholders.activeUsers')}
                type="number"
                min="0"
            />

            <Input
                name="ingresos-mensuales"
                value={formData.ingresos_mensuales || ''}
                label={t('createProject.stages.traction.fields.monthlyRevenue')}
                setValue={(value) => setFormData({ ...formData, ingresos_mensuales: value })}
                placeholder={t('createProject.stages.traction.placeholders.monthlyRevenue')}
                type="number"
                min="0"
                step="0.01"
            />

            <Input
                name="numero-clientes"
                value={formData.numero_clientes?.toString() || ''}
                label={t('project_customers')}
                setValue={(value) => setFormData({ 
                    ...formData, 
                    numero_clientes: value ? parseInt(value) : undefined 
                })}
                placeholder={t('createProject.stages.traction.placeholders.customers')}
                type="number"
                min="0"
            />

            <Input
                name="tamano-comunidad"
                value={formData.tamano_comunidad?.toString() || ''}
                label={t('createProject.stages.traction.fields.communitySize')}
                setValue={(value) => setFormData({ 
                    ...formData, 
                    tamano_comunidad: value ? parseInt(value) : undefined 
                })}
                placeholder={t('createProject.stages.traction.placeholders.communitySize')}
                type="number"
                min="0"
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

export default EditBusinessMetricsModal;

