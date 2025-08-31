import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useModalStore from '@/stores/ModalStore';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';
import { FundsUsage } from '@/hooks/useProject';

import '../ProjectModals.css';

interface EditFundsUsageModalProps {
    data: FundsUsage;
    onSubmit: (data: FundsUsage) => Promise<void>;
}

const EditFundsUsageModal = ({ data, onSubmit }: EditFundsUsageModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(data || {
        desarrollo_producto: 0,
        marketing_ventas: 0,
        expansion_operaciones: 0,
        gastos_operativos: 0
    });

    const totalPercentage = (formData.desarrollo_producto || 0) + 
                            (formData.marketing_ventas || 0) + 
                            (formData.expansion_operaciones || 0) + 
                            (formData.gastos_operativos || 0);
    
    const isValidTotal = Math.abs(totalPercentage - 1) < 0.001; // Allow for floating point precision

    const handleSubmit = async () => {
        if (isValidTotal) {
            setIsSubmitting(true);
            try {
                await onSubmit(formData);
                closeModal();
            } catch (error) {
                setIsSubmitting(false);
            }
        }
    };

    const handleValueChange = (field: keyof FundsUsage, value: string) => {
        const numValue = value ? parseFloat(value) / 100 : 0; // Convert percentage to decimal
        setFormData({ ...formData, [field]: numValue });
    };

    return (
        <div className="project-modal-content">
            <h3>{t('project_funds_usage')}</h3>
            
            <div className="funds-usage-form">
                <Input
                    name="desarrollo-producto"
                    value={(formData.desarrollo_producto * 100).toString()}
                    label={`${t('project_fund_development')} (%)`}
                    setValue={(value) => handleValueChange('desarrollo_producto', value)}
                    placeholder="0"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                />

                <Input
                    name="marketing-ventas"
                    value={(formData.marketing_ventas * 100).toString()}
                    label={`${t('project_fund_marketing')} (%)`}
                    setValue={(value) => handleValueChange('marketing_ventas', value)}
                    placeholder="0"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                />

                <Input
                    name="expansion-operaciones"
                    value={(formData.expansion_operaciones * 100).toString()}
                    label={`${t('project_fund_expansion')} (%)`}
                    setValue={(value) => handleValueChange('expansion_operaciones', value)}
                    placeholder="0"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                />

                <Input
                    name="gastos-operativos"
                    value={(formData.gastos_operativos * 100).toString()}
                    label={`${t('project_fund_operations')} (%)`}
                    setValue={(value) => handleValueChange('gastos_operativos', value)}
                    placeholder="0"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                />

                <div className={`total-percentage ${isValidTotal ? 'valid' : 'invalid'}`}>
                    {t('createProject.stages.financing.total')}: {(totalPercentage * 100).toFixed(1)}%
                    {!isValidTotal && (
                        <span className="error-text">
                            {t('createProject.stages.financing.totalError')}
                        </span>
                    )}
                </div>
            </div>

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

export default EditFundsUsageModal;