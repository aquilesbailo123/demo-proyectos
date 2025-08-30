import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiAddLine, RiDeleteBin6Line, RiEditLine, RiCloseLine } from 'react-icons/ri';
import { FaLeaf, FaUtensils, FaHeartbeat, FaGraduationCap, FaVenus, FaWater, FaBolt, FaHandshake, FaIndustry, FaBalanceScale, FaCity, FaRecycle, FaGlobe, FaFish, FaSeedling, FaDove } from 'react-icons/fa';
import Input from '@/components/forms/Input/Input';
import Button from '@/components/common/Button/Button';
import { useProjectStore } from '@/stores/ProjectStore';
import { useODS } from '@/hooks/useOptions';
import { KeyMetric } from '@/hooks/useProject';
import '../Stages.css';
import './Stage6.css';

const Stage6 = () => {
    const { t } = useTranslation('common');
    const { relevant_sdg, metricas_clave, updateProjectData, addKeyMetric, updateKeyMetric, removeKeyMetric } = useProjectStore();
    const { data: odsOptions, isLoading: odsLoading } = useODS();
    
    const [showMetricModal, setShowMetricModal] = useState(false);
    const [editingMetricIndex, setEditingMetricIndex] = useState<number | null>(null);
    const [metricForm, setMetricForm] = useState<Omit<KeyMetric, 'id' | 'created' | 'updated'>>({
        metrica: '',
        metodo_medicion: '',
        valor_actual: ''
    });

    // ODS icons mapping
    const odsIcons: { [key: string]: any } = {
        'ods_1': FaHandshake,
        'ods_2': FaUtensils,
        'ods_3': FaHeartbeat,
        'ods_4': FaGraduationCap,
        'ods_5': FaVenus,
        'ods_6': FaWater,
        'ods_7': FaBolt,
        'ods_8': FaHandshake,
        'ods_9': FaIndustry,
        'ods_10': FaBalanceScale,
        'ods_11': FaCity,
        'ods_12': FaRecycle,
        'ods_13': FaGlobe,
        'ods_14': FaFish,
        'ods_15': FaSeedling,
        'ods_16': FaDove,
        'ods_17': FaHandshake
    };

    // ODS colors mapping
    const odsColors: { [key: string]: string } = {
        'ods_1': '#e5243b',
        'ods_2': '#dda63a',
        'ods_3': '#4c9f38',
        'ods_4': '#c5192d',
        'ods_5': '#ff3a21',
        'ods_6': '#26bde2',
        'ods_7': '#fcc30b',
        'ods_8': '#a21942',
        'ods_9': '#fd6925',
        'ods_10': '#dd1367',
        'ods_11': '#fd9d24',
        'ods_12': '#bf8b2e',
        'ods_13': '#3f7e44',
        'ods_14': '#0a97d9',
        'ods_15': '#56c02b',
        'ods_16': '#00689d',
        'ods_17': '#19486a'
    };

    const handleODSToggle = (odsValue: string) => {
        const newSDG = relevant_sdg.includes(odsValue)
            ? relevant_sdg.filter(sdg => sdg !== odsValue)
            : [...relevant_sdg, odsValue];
        
        updateProjectData({ relevant_sdg: newSDG });
    };

    const resetMetricForm = () => {
        setMetricForm({
            metrica: '',
            metodo_medicion: '',
            valor_actual: ''
        });
    };

    const handleAddMetric = () => {
        resetMetricForm();
        setEditingMetricIndex(null);
        setShowMetricModal(true);
    };

    const handleEditMetric = (index: number) => {
        setMetricForm(metricas_clave[index]);
        setEditingMetricIndex(index);
        setShowMetricModal(true);
    };

    const handleSaveMetric = () => {
        if (metricForm.metrica.trim() && metricForm.metodo_medicion.trim()) {
            if (editingMetricIndex !== null) {
                updateKeyMetric(editingMetricIndex, metricForm);
            } else {
                addKeyMetric(metricForm);
            }
            resetMetricForm();
            setShowMetricModal(false);
            setEditingMetricIndex(null);
        }
    };

    const handleCancel = () => {
        resetMetricForm();
        setShowMetricModal(false);
        setEditingMetricIndex(null);
    };

    const addExampleMetric = (metric: Omit<KeyMetric, 'id' | 'created' | 'updated'>) => {
        addKeyMetric(metric);
    };

    const exampleMetrics = [
        {
            metrica: 'Monthly Active Users',
            metodo_medicion: 'Google Analytics tracking',
            valor_actual: '1,000'
        },
        {
            metrica: 'Customer Acquisition Cost',
            metodo_medicion: 'Total marketing spend / new customers',
            valor_actual: '$50'
        },
        {
            metrica: 'Monthly Recurring Revenue',
            metodo_medicion: 'Subscription revenue per month',
            valor_actual: '$10,000'
        },
        {
            metrica: 'Net Promoter Score',
            metodo_medicion: 'Customer satisfaction survey',
            valor_actual: '8.5/10'
        }
    ];

    return (
        <div className="stage-container">
            <div className="stage-header">
                <h2>{t('section')} 6: {t('createProject.stages.impact.title')}</h2>
                <p>{t('createProject.stages.impact.description')}</p>
            </div>

            <div className="stage-content">
                {/* ODS Selection */}
                <div className="form-group">
                    <label className="form-label required">
                        {t('createProject.stages.impact.fields.sdg')}
                    </label>
                    <p className="field-description">
                        {t('createProject.stages.impact.help.sdg')}
                    </p>
                    
                    {odsLoading ? (
                        <div className="loading-state">Loading ODS...</div>
                    ) : (
                        <div className="ods-grid">
                            {odsOptions?.map((ods) => {
                                const IconComponent = odsIcons[ods.value] || FaLeaf;
                                const isSelected = relevant_sdg.includes(ods.value);
                                
                                return (
                                    <div
                                        key={ods.value}
                                        className={`ods-item ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleODSToggle(ods.value)}
                                        style={{
                                            borderColor: isSelected ? odsColors[ods.value] : undefined,
                                            backgroundColor: isSelected ? `${odsColors[ods.value]}15` : undefined
                                        }}
                                    >
                                        <IconComponent 
                                            className="ods-icon" 
                                            style={{ color: odsColors[ods.value] }}
                                        />
                                        <span className="ods-label">{ods.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
            
                    {relevant_sdg.length === 0 && (
                        <div className="validation-message error">
                            {t('createProject.stages.impact.validation.sdgRequired')}
                        </div>
                    )}
                </div>

                {/* Key Metrics */}
                <div className="form-group">
                    <label className="form-label">
                        {t('createProject.stages.impact.fields.keyMetrics')}
                    </label>
                    <p className="field-description">
                        {t('createProject.stages.impact.help.keyMetrics')}
                    </p>

                    <div className="card-list">
                        {metricas_clave.map((metric, index) => (
                            <div key={index} className="card-item metric-card">
                                <div className="metric-content">
                                    <h4>{metric.metrica}</h4>
                                    <p className="metric-method">{metric.metodo_medicion}</p>
                                    <div className="metric-value">{metric.valor_actual}</div>
                                </div>
                                <div className="card-actions">
                                    <button
                                        type="button"
                                        onClick={() => handleEditMetric(index)}
                                        className="card-action-btn"
                                        title={t('common.edit')}
                                    >
                                        <RiEditLine />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeKeyMetric(index)}
                                        className="card-action-btn danger"
                                        title={t('common.delete')}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddMetric}
                            className="add-card-btn"
                        >
                            <RiAddLine />
                            {t('createProject.stages.impact.addMetric')}
                        </button>
                    </div>

                    {/* Example Metrics */}
                    {metricas_clave.length === 0 && (
                        <div className="example-metrics">
                            <h4>{t('createProject.stages.impact.exampleMetrics')}</h4>
                            <div className="example-metrics-grid">
                                {exampleMetrics.map((metric, index) => (
                                    <div key={index} className="example-metric-card">
                                        <h5>{metric.metrica}</h5>
                                        <p>{metric.metodo_medicion}</p>
                                        <button
                                            type="button"
                                            onClick={() => addExampleMetric(metric)}
                                            className="add-example-btn"
                                        >
                                            <RiAddLine />
                                            {t('common.add')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Metric Form Modal */}
            {showMetricModal && (
                <div className="form-modal">
                    <div className="form-modal-content">
                        <div className="form-modal-header">
                            <h3>
                                {editingMetricIndex !== null 
                                    ? t('createProject.stages.impact.editMetric')
                                    : t('createProject.stages.impact.addMetric')
                                }
                            </h3>
                            <button onClick={handleCancel} className="close-btn">
                                <RiCloseLine />
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="form-label required">
                                {t('createProject.stages.impact.metricFields.name')}
                            </label>
                            <Input
                                name="metrica"
                                value={metricForm.metrica}
                                setValue={(value) => setMetricForm({...metricForm, metrica: value})}
                                placeholder={t('createProject.stages.impact.metricPlaceholders.name')}
                                isRequired={true}
                            />
                        </div>

                        <div className="form-group">
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
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {t('createProject.stages.impact.metricFields.currentValue')}
                            </label>
                            <Input
                                name="valor_actual"
                                value={metricForm.valor_actual}
                                setValue={(value) => setMetricForm({...metricForm, valor_actual: value})}
                                placeholder={t('createProject.stages.impact.metricPlaceholders.currentValue')}
                            />
                        </div>

                        <div className="form-modal-actions">
                            <Button variant="secondary" onClick={handleCancel}>
                                {t('common.cancel')}
                            </Button>
                            <Button 
                                variant="primary" 
                                onClick={handleSaveMetric}
                                disabled={!metricForm.metrica.trim() || !metricForm.metodo_medicion.trim()}
                            >
                                {editingMetricIndex !== null ? t('common.update') : t('common.add')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
      </div>
    );
};

export default Stage6;
