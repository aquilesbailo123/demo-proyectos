import { useTranslation } from 'react-i18next';
import Input from '@/components/forms/Input/Input';
import Select from '@/components/forms/Select/Select';
import DateTimePicker from '@/components/forms/DateTimePicker/DateTimePicker';
import { useProjectStore } from '@/stores/ProjectStore';
import { useFinancingTypes } from '@/hooks/useOptions';
import '../Stages.css';
import './Stage4.css';

const Stage4 = () => {
    const { t } = useTranslation('common');
    const {
        objective_amount,
        financing_type_id,
        funds_usage,
        end_date,
        updateProject
    } = useProjectStore();

    const { data: financingTypes, isLoading: financingTypesLoading } = useFinancingTypes();

    const handleInputChange = (field: string, value: string | number) => {
        updateProject({ [field]: value });
    };

    const handleFundsUsageChange = (field: keyof typeof funds_usage, value: number) => {
        updateProject({
            funds_usage: {
                ...funds_usage,
                [field]: value / 100 // Convert percentage to decimal
            }
        });
    };

    const totalPercentage = Object.values(funds_usage).reduce((sum, val) => sum + val, 0) * 100;
    const isValidTotal = Math.abs(totalPercentage - 100) < 0.1;

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 4: {t('createProject.stages.financing.title')}</h2>
                <p>{t('createProject.stages.financing.description')}</p>
            </div>

            <div className="stage-content">
                <div className="form-group">
                    <Input
                        name="objective-amount"
                        value={objective_amount}
                        label={t('createProject.stages.financing.fields.objectiveAmount')}
                        setValue={(value) => handleInputChange('objective_amount', value)}
                        placeholder={t('createProject.stages.financing.placeholders.objectiveAmount')}
                        type="number"
                        isRequired={true}
                        min="1000"
                    />
                    <div className="input-help">
                        {t('createProject.stages.financing.help.objectiveAmount')}
                    </div>
                </div>

                <div className="form-group">
                    <Select
                        value={financing_type_id?.toString() || ''}
                        label={t('createProject.stages.financing.fields.financingType')}
                        onChange={(e) => handleInputChange('financing_type_id', parseInt(e.target.value))}
                        options={[
                            { value: '', label: t('createProject.stages.financing.placeholders.financingType') },
                            ...(financingTypes?.map(type => ({
                                value: type.id.toString(),
                                label: type.name
                            })) || [])
                        ]}
                        disabled={financingTypesLoading}
                        required={true}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">
                        {t('createProject.stages.financing.fields.fundsUsage')}
                    </label>
                    <div className="funds-usage-grid">
                        <Input
                            name="funds-product-development"
                            value={(funds_usage.desarrollo_producto * 100).toString()}
                            setValue={(value) => handleFundsUsageChange('desarrollo_producto', parseFloat(value) || 0)}
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            endContent={<span className="percentage-symbol">%</span>}
                            label={t('createProject.stages.financing.fields.productDevelopment')}
                        />
                        <Input
                            name="funds-marketing-sales"
                            value={(funds_usage.marketing_ventas * 100).toString()}
                            setValue={(value) => handleFundsUsageChange('marketing_ventas', parseFloat(value) || 0)}
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            endContent={<span className="percentage-symbol">%</span>}
                            label={t('createProject.stages.financing.fields.marketingSales')}
                        />
                        <Input
                            name="funds-expansion-operations"
                            value={(funds_usage.expansion_operaciones * 100).toString()}
                            setValue={(value) => handleFundsUsageChange('expansion_operaciones', parseFloat(value) || 0)}
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            endContent={<span className="percentage-symbol">%</span>}
                            label={t('createProject.stages.financing.fields.expansionOperations')}
                        />
                        <Input
                            name="funds-operational-expenses"
                            value={(funds_usage.gastos_operativos * 100).toString()}
                            setValue={(value) => handleFundsUsageChange('gastos_operativos', parseFloat(value) || 0)}
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            endContent={<span className="percentage-symbol">%</span>}
                            label={t('createProject.stages.financing.fields.operationalExpenses')}
                        />
                    </div>

                    <div className={`funds-usage-total ${isValidTotal ? 'valid' : 'invalid'}`}>
                        <div className="total-content">
                            <span className="total-label">
                                {t('createProject.stages.financing.total')}:
                            </span>
                            <span className={`total-percentage ${isValidTotal ? 'complete' : 'incomplete'}`}>
                                {totalPercentage.toFixed(1)}%
                            </span>
                        </div>
                        {!isValidTotal && (
                            <div className="error-message">
                                {t('createProject.stages.financing.totalError')}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <DateTimePicker
                        name="campaign-end-date"
                        value={end_date}
                        setValue={(value) => handleInputChange('end_date', value)}
                        label={t('createProject.stages.financing.fields.campaignEnd')}
                        min={today}
                        isRequired={true}
                        variant="flat"
                        dateOnly={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Stage4;
