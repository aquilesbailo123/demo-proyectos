import { useTranslation } from 'react-i18next';
import { RiAddLine, RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { FaLeaf, FaUtensils, FaHeartbeat, FaGraduationCap, FaVenus, FaWater, FaBolt, FaHandshake, FaIndustry, FaBalanceScale, FaCity, FaRecycle, FaGlobe, FaFish, FaSeedling, FaDove } from 'react-icons/fa';

import { useProjectStore } from '@/stores/ProjectStore';
import { useODS } from '@/hooks/useOptions';
import { KeyMetric } from '@/hooks/useProject';
import useModalStore from '@/stores/ModalStore';
import AddMetricModal from '@/modals/projects/AddMetricModal/AddMetricModal';

import '../Stages.css';
import './Stage6.css';

const Stage6 = () => {
    const { t } = useTranslation('common');
    const { relevant_sdg, metricas_clave, updateProject, addMetric, updateMetric, removeMetric } = useProjectStore();
    const { data: odsOptions, isLoading: odsLoading } = useODS();
    const { setModalContent, closeModal } = useModalStore();
  
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
        
        updateProject({ relevant_sdg: newSDG });
    };

    const handleAddMetric = () => {
        setModalContent(
            <AddMetricModal
                isAdding={true}
                onSubmit={handleSaveMetric}
            />
        )
    };

    const handleEditMetric = (index: number) => {
        setModalContent(
            <AddMetricModal
                data={metricas_clave[index]}
                isAdding={false}
                index={index}
                onSubmit={handleSaveMetric}
            />
        )
    };

    const handleSaveMetric = (metric: KeyMetric, index?: number | null) => {
        if (metric.metrica.trim() && metric.metodo_medicion.trim()) {
            if (index !== null && index !== undefined) {
                updateMetric(index, metric);
            } else {
                addMetric(metric);
            }
            closeModal();
        }
    };

    const addExampleMetric = (metric: Omit<KeyMetric, 'id' | 'created' | 'updated'>) => {
        addMetric(metric);
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
                                        onClick={() => removeMetric(index)}
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
                                            {t('common_add')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
      </div>
    );
};

export default Stage6;
