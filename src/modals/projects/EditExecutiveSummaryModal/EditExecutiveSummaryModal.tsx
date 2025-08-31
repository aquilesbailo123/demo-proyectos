import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useModalStore from '@/stores/ModalStore';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';

import '../ProjectModals.css';

interface EditExecutiveSummaryModalProps {
    data: string;
    onSubmit: (data: string) => Promise<void>;
}

const EditExecutiveSummaryModal = ({ data, onSubmit }: EditExecutiveSummaryModalProps) => {
    const { t } = useTranslation('common');
    const { closeModal } = useModalStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [summary, setSummary] = useState<string>(data || '');

    const handleSubmit = async () => {
        if (summary.trim()) {
            setIsSubmitting(true);
            try {
                await onSubmit(summary);
                closeModal();
            } catch (error) {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="project-modal-content">
            <h3>{t('project_summary')}</h3>
            
            <Input
                name="executive-summary"
                value={summary}
                label={t('project_summary')}
                setValue={setSummary}
                placeholder={t('project_summary')}
                multiline={true}
                rows={8}
                maxLength={2000}
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

export default EditExecutiveSummaryModal;

