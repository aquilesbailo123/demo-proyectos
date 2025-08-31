import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    RiEyeLine, 
    RiShareLine, 
    RiCalendarLine,
    RiMoneyDollarCircleLine,
    RiTeamLine,
    RiBarChartLine,
    RiGlobalLine,
    RiTwitterLine,
    RiLinkedinLine,
    RiLightbulbLine,
    RiFocus3Line,
    RiLineChartLine,
    RiUserLine,
    RiPieChartLine,
    RiFileTextLine,
    RiLeafLine,
    RiEditLine,
    RiAddLine,
    RiDeleteBin6Line
} from 'react-icons/ri';
import { 
    FaHandshake, 
    FaUtensils, 
    FaHeartbeat, 
    FaGraduationCap, 
    FaVenus, 
    FaWater, 
    FaBolt, 
    FaIndustry, 
    FaBalanceScale, 
    FaCity, 
    FaRecycle, 
    FaGlobe, 
    FaFish, 
    FaSeedling, 
    FaDove 
} from 'react-icons/fa';

import { useUserProject, useUpdateProject, KeyMetric, ProjectMember } from '@/hooks/useProject';
import { useODS } from '@/hooks/useOptions';
import Card from '@/components/common/Card/Card';
import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';
import routes from '@/routes/routes';
import useModalStore from '@/stores/ModalStore';
import toast from 'react-hot-toast';

// Import modals
import EditBasicInfoModal from '@/modals/projects/EditBasicInfoModal/EditBasicInfoModal';
import EditValuePropositionModal from '@/modals/projects/EditValuePropositionModal/EditValuePropositionModal';
import EditBusinessMetricsModal from '@/modals/projects/EditBusinessMetricsModal/EditBusinessMetricsModal';
import EditFundsUsageModal from '@/modals/projects/EditFundsUsageModal/EditFundsUsageModal';
import EditExecutiveSummaryModal from '@/modals/projects/EditExecutiveSummaryModal/EditExecutiveSummaryModal';
import EditMemberModal from '@/modals/projects/EditMemberModal/EditMemberModal';
import EditMetricModal from '@/modals/projects/EditMetricModal/EditMetricModal';
import { useCreateMember, useUpdateMember, useDeleteMember } from '@/hooks/useProjectMembers';
import { useCreateMetric, useUpdateMetric, useDeleteMetric } from '@/hooks/useProjectMetrics';

import './MyProject.css';

const MyProject: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: projects, isLoading, error, refetch } = useUserProject();
    const { data: odsOptions, isLoading: odsLoading } = useODS();
    const updateProjectMutation = useUpdateProject();
    const createMemberMutation = useCreateMember();
    const updateMemberMutation = useUpdateMember();
    const deleteMemberMutation = useDeleteMember();
    const createMetricMutation = useCreateMetric();
    const updateMetricMutation = useUpdateMetric();
    const deleteMetricMutation = useDeleteMetric();
    const { setModalContent } = useModalStore();
    const project = projects?.[0];

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

    if (isLoading) {
        return (
            <div className="myproject-loading">
                <Spinner />
                <p>{t('common_loading')}</p>
            </div>
        );
    }

    if (error || !projects || projects.length === 0 || !project) {
        navigate(routes.createProject);
        return;
    }

    const calculateDaysRemaining = (endDate: string): string => {
        const end = new Date(endDate);
        const now = new Date();
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays.toString() : '0';
    };

    const getProjectStatusText = (project: any): string => {
        if (!project.is_active) {
            return t('project_status_rejected');
        }
        
        if (project.is_featured) {
            return t('project_status_approved');
        } else {
            return t('project_status_in_review');
        }
    };

    const getProjectStatusClass = (project: any): string => {
        if (!project.is_active) {
            return 'status-rejected';
        }
        
        if (project.is_featured) {
            return 'status-approved';
        } else {
            return 'status-in-review';
        }
    };

    const getProjectStatusTooltip = (project: any): string => {
        if (!project.is_active) {
            return t('project_status_rejected_tooltip');
        }
        
        if (project.is_featured) {
            return t('project_status_approved_tooltip');
        } else {
            return t('project_status_in_review_tooltip');
        }
    };

    // Edit handlers
    const handleEditBasicInfo = () => {
        setModalContent(
            <EditBasicInfoModal
                data={{
                    name: project.name,
                    slogan: project.slogan,
                    logo: project.logo,
                    website: project.website,
                    twitter: project.twitter,
                    linkedin: project.linkedin
                }}
                onSubmit={handleSaveBasicInfo}
            />
        );
    };

    const handleSaveBasicInfo = async (data: any) => {
        try {
            const updateData: any = {
                name: data.name,
                slogan: data.slogan,
                website: data.website,
                twitter: data.twitter,
                linkedin: data.linkedin
            };

            const files = data.logoFile ? { logo: data.logoFile } : undefined;

            await updateProjectMutation.mutateAsync({
                projectData: updateData,
                files: files
            });
            toast.success(t('project_update_success'));
            refetch();
        } catch (error) {
            toast.error(t('project_update_error'));
        }
    };

    const handleEditValueProposition = () => {
        setModalContent(
            <EditValuePropositionModal
                data={project.value_proposition}
                onSubmit={handleSaveValueProposition}
            />
        );
    };

    const handleSaveValueProposition = async (data: any) => {
        try {
            await updateProjectMutation.mutateAsync({ projectData: { value_proposition: data } });
            toast.success(t('project_update_success'));
            refetch();
        } catch (error) {
            toast.error(t('project_update_error'));
        }
    };

    const handleEditExecutiveSummary = () => {
        setModalContent(
            <EditExecutiveSummaryModal
                data={project.resumen_ejecutivo}
                onSubmit={handleSaveExecutiveSummary}
            />
        );
    };

    const handleSaveExecutiveSummary = async (data: string) => {
        try {
            await updateProjectMutation.mutateAsync({ projectData: { resumen_ejecutivo: data } });
            toast.success(t('project_update_success'));
            refetch();
        } catch (error) {
            toast.error(t('project_update_error'));
        }
    };

    const handleEditBusinessMetrics = () => {
        setModalContent(
            <EditBusinessMetricsModal
                data={{
                    usuarios_activos: project.usuarios_activos,
                    ingresos_mensuales: project.ingresos_mensuales,
                    numero_clientes: project.numero_clientes,
                    tamano_comunidad: project.tamano_comunidad
                }}
                onSubmit={handleSaveBusinessMetrics}
            />
        );
    };

    const handleSaveBusinessMetrics = async (data: any) => {
        try {
            await updateProjectMutation.mutateAsync({ projectData: data });
            toast.success(t('project_update_success'));
            refetch();
        } catch (error) {
            toast.error(t('project_update_error'));
        }
    };

    const handleEditFundsUsage = () => {
        setModalContent(
            <EditFundsUsageModal
                data={project.funds_usage}
                onSubmit={handleSaveFundsUsage}
            />
        );
    };

    const handleSaveFundsUsage = async (data: any) => {
        try {
            await updateProjectMutation.mutateAsync({ projectData: { funds_usage: data } });
            toast.success(t('project_update_success'));
            refetch();
        } catch (error) {
            toast.error(t('project_update_error'));
        }
    };

    const handleAddMember = () => {
        setModalContent(
            <EditMemberModal
                isAdding={true}
                onSubmit={handleSaveMember}
            />
        );
    };

    const handleEditMember = (member: ProjectMember, index: number) => {
        setModalContent(
            <EditMemberModal
                data={member}
                isAdding={false}
                index={index}
                onSubmit={handleSaveMember}
            />
        );
    };

    const handleSaveMember = async (memberData: any, index?: number | null, photoFile?: File | null) => {
        try {
            if (index !== null && index !== undefined) {
                // Update existing member
                const existingMember = project.equipo[index];
                if (existingMember?.id) {
                    await updateMemberMutation.mutateAsync({
                        projectId: project.id,
                        memberId: existingMember.id,
                        memberData,
                        photoFile: photoFile || undefined
                    });
                }
            } else {
                // Create new member
                await createMemberMutation.mutateAsync({
                    projectId: project.id,
                    memberData,
                    photoFile: photoFile || undefined
                });
            }
            toast.success(t('project_update_success'));
            refetch();
        } catch (error) {
            console.error('Member update error:', error);
            toast.error(t('project_update_error'));
        }
    };

    const handleAddMetric = () => {
        setModalContent(
            <EditMetricModal
                isAdding={true}
                onSubmit={handleSaveMetric}
            />
        );
    };

    const handleEditMetric = (metric: KeyMetric, index: number) => {
        setModalContent(
            <EditMetricModal
                data={metric}
                isAdding={false}
                index={index}
                onSubmit={handleSaveMetric}
            />
        );
    };

    const handleSaveMetric = async (metricData: any, index?: number | null) => {
        try {
            if (index !== null && index !== undefined) {
                // Update existing metric
                const existingMetric = project.metricas_clave[index];
                if (existingMetric?.id) {
                    await updateMetricMutation.mutateAsync({
                        projectId: project.id,
                        metricId: existingMetric.id,
                        metricData
                    });
                }
            } else {
                // Create new metric
                await createMetricMutation.mutateAsync({
                    projectId: project.id,
                    metricData
                });
            }
            toast.success(t('project_update_success'));
            refetch();
        } catch (error) {
            console.error('Metric update error:', error);
            toast.error(t('project_update_error'));
        }
    };

    const handleDeleteMember = async (index: number) => {
        try {
            const memberToDelete = project.equipo[index];
            if (memberToDelete?.id) {
                await deleteMemberMutation.mutateAsync({
                    projectId: project.id,
                    memberId: memberToDelete.id
                });
                toast.success(t('project_update_success'));
                refetch();
            }
        } catch (error) {
            console.error('Member delete error:', error);
            toast.error(t('project_update_error'));
        }
    };

    const handleDeleteMetric = async (index: number) => {
        try {
            const metricToDelete = project.metricas_clave[index];
            if (metricToDelete?.id) {
                await deleteMetricMutation.mutateAsync({
                    projectId: project.id,
                    metricId: metricToDelete.id
                });
                toast.success(t('project_update_success'));
                refetch();
            }
        } catch (error) {
            console.error('Metric delete error:', error);
            toast.error(t('project_update_error'));
        }
    };

    return (
        <div className="myproject-container">
            {/* Project Header */}
            <Card className="myproject-header">
                <div className="myproject-header-content">
                    <div className="myproject-basic-info">
                        {project.logo && (
                            <img 
                                src={project.logo} 
                                alt={project.name}
                                className="myproject-logo"
                            />
                        )}
                        <div className="myproject-title-section">
                            <h1 className="myproject-title">{project.name}</h1>
                            <p className="myproject-slogan">{project.slogan}</p>
                            <div className="myproject-meta">
                                <span className="myproject-industry">
                                    {project.industry?.name}
                                </span>
                                <span className="myproject-stage">
                                    {t(`project_stage.${project.etapa_actual}`)}
                                </span>
                                <span 
                                    className={`myproject-status ${getProjectStatusClass(project)}`}
                                    title={getProjectStatusTooltip(project)}
                                >
                                    {getProjectStatusText(project)}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="myproject-actions">
                        <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={handleEditBasicInfo}
                            disabled={updateProjectMutation.isPending}
                        >
                            <RiEditLine /> {t('common_edit')}
                        </Button>
                        <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => navigate(`/project/${project.id}`)}
                        >
                            <RiEyeLine />
                            {t('view')}
                        </Button>
                        <Button 
                            variant="primary" 
                            size="sm"
                        >
                            <RiShareLine />
                            {t('share')}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Funding Progress */}
            <Card className="myproject-funding-card">
                <div className="funding-header">
                    <h3>{t('project_funding_progress')}</h3>
                    <div className="funding-stats">
                        {/* TODO get the project funding progress */}
                        <span className="funding-raised">0 USDT</span>
                        <span className="funding-goal">of {project.objective_amount} USDT</span>
                    </div>
                </div>
                <div className="funding-progress-bar">
                    <div 
                        className="funding-progress-fill" 
                        style={{ width: `${project.funding_progress}%` }}
                    />
                </div>
                <div className="funding-meta">
                    <span>{project.funding_progress}% {t('project_funded')}</span>
                    <span>{calculateDaysRemaining(project.end_date)} {t('project_days_left')}</span>
                </div>
            </Card>

            {/* Project Stats */}
            <div className="myproject-stats-grid">
                <Card className="myproject-stat-card">
                    <div className="stat-icon">
                        <RiMoneyDollarCircleLine />
                    </div>
                    <div className="stat-content">
                        <h3>{project.objective_amount} USDT</h3>
                        <p>{t('project_goal')}</p>
                    </div>
                </Card>

                <Card className="myproject-stat-card">
                    <div className="stat-icon">
                        <RiCalendarLine />
                    </div>
                    <div className="stat-content">
                        <h3>{calculateDaysRemaining(project.end_date)}</h3>
                        <p>{t('project_days_left')}</p>
                    </div>
                </Card>

                <Card className="myproject-stat-card">
                    <div className="stat-icon">
                        <RiTeamLine />
                    </div>
                    <div className="stat-content">
                        <h3>{project.equipo?.length || 0}</h3>
                        <p>{t('project_team_members')}</p>
                    </div>
                </Card>

                <Card className="myproject-stat-card">
                    <div className="stat-icon">
                        <RiBarChartLine />
                    </div>
                    <div className="stat-content">
                        <h3>{project.metricas_clave?.length || 0}</h3>
                        <p>{t('project_metrics')}</p>
                    </div>
                </Card>
            </div>

            {/* Business Metrics */}
            {(project.usuarios_activos || project.ingresos_mensuales || project.numero_clientes || project.tamano_comunidad) && (
                <div className="myproject-business-metrics">
                    <div className="section-header">
                        <h2 className="section-title project-section">{t('project_business_metrics')}</h2>
                        <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={handleEditBusinessMetrics}
                            disabled={updateProjectMutation.isPending}
                        >
                            <RiEditLine /> {t('common_edit')}
                        </Button>
                    </div>
                    <div className="business-metrics-grid">
                        {project.usuarios_activos && (
                            <Card className="business-metric-card">
                                <div className="metric-icon">
                                    <RiUserLine />
                                </div>
                                <div className="metric-info">
                                    <h4>{project.usuarios_activos.toLocaleString()}</h4>
                                    <p>{t('project_active_users')}</p>
                                </div>
                            </Card>
                        )}
                        {project.ingresos_mensuales && (
                            <Card className="business-metric-card">
                                <div className="metric-icon">
                                    <RiLineChartLine />
                                </div>
                                <div className="metric-info">
                                    <h4>{project.ingresos_mensuales} USDT</h4>
                                    <p>{t('project_monthly_revenue')}</p>
                                </div>
                            </Card>
                        )}
                        {project.numero_clientes && (
                            <Card className="business-metric-card">
                                <div className="metric-icon">
                                    <RiFocus3Line />
                                </div>
                                <div className="metric-info">
                                    <h4>{project.numero_clientes.toLocaleString()}</h4>
                                    <p>{t('project_customers')}</p>
                                </div>
                            </Card>
                        )}
                        {project.tamano_comunidad && (
                            <Card className="business-metric-card">
                                <div className="metric-icon">
                                    <RiTeamLine />
                                </div>
                                <div className="metric-info">
                                    <h4>{project.tamano_comunidad.toLocaleString()}</h4>
                                    <p>{t('project_community_size')}</p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            )}

            {/* Project Details */}
            <div className="myproject-details-grid">
                {/* Value Proposition */}
                <Card className="value-proposition-card">
                    <div className="card-header">
                        <h3>
                            <RiLightbulbLine className="section-icon" />
                            {t('project_value_proposition')}
                        </h3>
                        <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={handleEditValueProposition}
                            disabled={updateProjectMutation.isPending}
                        >
                            <RiEditLine /> {t('common_edit')}
                        </Button>
                    </div>
                    <div className="value-prop-grid">
                        <div className="value-prop-item">
                            <h4>{t('project_problem')}</h4>
                            <p>{project.value_proposition.problema}</p>
                        </div>
                        <div className="value-prop-item">
                            <h4>{t('project_solution')}</h4>
                            <p>{project.value_proposition.solucion}</p>
                        </div>
                        <div className="value-prop-item">
                            <h4>{t('project_unique_value')}</h4>
                            <p>{project.value_proposition.propuesta_unica_valor}</p>
                        </div>
                        <div className="value-prop-item">
                            <h4>{t('project_business_model')}</h4>
                            <p>{project.value_proposition.modelo_negocio}</p>
                        </div>
                    </div>
                </Card>

                {/* Executive Summary */}
                <Card className="myproject-detail-card">
                    <div className="card-header">
                        <h3>
                            <RiFileTextLine className="section-icon" />
                            {t('project_summary')}
                        </h3>
                        <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={handleEditExecutiveSummary}
                            disabled={updateProjectMutation.isPending}
                        >
                            <RiEditLine /> {t('common_edit')}
                        </Button>
                    </div>
                    <p className="myproject-summary">{project.resumen_ejecutivo}</p>
                </Card>

                {/* Funds Usage */}
                <Card className="myproject-detail-card">
                    <div className="card-header">
                        <h3>
                            <RiPieChartLine className="section-icon" />
                            {t('project_funds_usage')}
                        </h3>
                        <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={handleEditFundsUsage}
                            disabled={updateProjectMutation.isPending}
                        >
                            <RiEditLine /> {t('common_edit')}
                        </Button>
                    </div>
                    <div className="funds-usage-grid">
                        <div className="fund-item">
                            <div className="fund-bar">
                                <div 
                                    className="fund-fill fund-desarrollo" 
                                    style={{ width: `${project.funds_usage.desarrollo_producto * 100}%` }}
                                />
                            </div>
                            <div className="fund-info">
                                <span className="fund-label">{t('project_fund_development')}</span>
                                <span className="fund-percentage">{(project.funds_usage.desarrollo_producto * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                        <div className="fund-item">
                            <div className="fund-bar">
                                <div 
                                    className="fund-fill fund-marketing" 
                                    style={{ width: `${project.funds_usage.marketing_ventas * 100}%` }}
                                />
                            </div>
                            <div className="fund-info">
                                <span className="fund-label">{t('project_fund_marketing')}</span>
                                <span className="fund-percentage">{(project.funds_usage.marketing_ventas * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                        <div className="fund-item">
                            <div className="fund-bar">
                                <div 
                                    className="fund-fill fund-expansion" 
                                    style={{ width: `${project.funds_usage.expansion_operaciones * 100}%` }}
                                />
                            </div>
                            <div className="fund-info">
                                <span className="fund-label">{t('project_fund_expansion')}</span>
                                <span className="fund-percentage">{(project.funds_usage.expansion_operaciones * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                        <div className="fund-item">
                            <div className="fund-bar">
                                <div 
                                    className="fund-fill fund-operations" 
                                    style={{ width: `${project.funds_usage.gastos_operativos * 100}%` }}
                                />
                            </div>
                            <div className="fund-info">
                                <span className="fund-label">{t('project_fund_operations')}</span>
                                <span className="fund-percentage">{(project.funds_usage.gastos_operativos * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* SDG Impact */}
                {project.relevant_sdg && project.relevant_sdg.length > 0 && (
                    <Card className="myproject-detail-card">
                        <h3>
                            <RiLeafLine className="section-icon" />
                            {t('project_sdg_impact')}
                        </h3>
                        {odsLoading ? <Spinner /> : <div className="sdg-grid">
                            {project.relevant_sdg.map((sdg: string, index: number) => {
                                const IconComponent = odsIcons[sdg];
                                const color = odsColors[sdg];
                                return (
                                    <div key={index} className="sdg-item">
                                        <div 
                                            className="sdg-icon" 
                                            style={{ backgroundColor: color }}
                                        >
                                            {IconComponent && <IconComponent />}
                                        </div>
                                        <span className="sdg-badge">{sdg.replace('ods_', 'ODS ')}</span>
                                        <span className="sdg-label">{odsOptions?.find((option: any) => option.value === sdg)?.label}</span>
                                    </div>
                                );
                            })}
                        </div>}
                    </Card>
                )}

                {/* Links */}
                <Card className="myproject-detail-card">
                    <h3>{t('project_links')}</h3>
                    <div className="myproject-links">
                        {project.website && (
                            <a 
                                href={project.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="myproject-link"
                            >
                                <RiGlobalLine />
                                {t('website')}
                            </a>
                        )}
                        {project.twitter && (
                            <a 
                                href={project.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="myproject-link"
                            >
                                <RiTwitterLine />
                                {t('twitter')}
                            </a>
                        )}
                        {project.linkedin && (
                            <a 
                                href={project.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="myproject-link"
                            >
                                <RiLinkedinLine />
                                {t('linkedin')}
                            </a>
                        )}
                    </div>
                </Card>

                {/* Team */}
                {project.equipo && project.equipo.length > 0 && (
                    <Card className="myproject-detail-card">
                        <div className="card-header">
                            <h3>
                                <RiTeamLine className="section-icon" />
                                {t('project_team')}
                            </h3>
                            <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={handleAddMember}
                                disabled={updateProjectMutation.isPending}
                            >
                                <RiAddLine /> {t('createProject.stages.team.addMember')}
                            </Button>
                        </div>
                        <div className="myproject-team">
                            {project.equipo.map((member: any, index: number) => (
                                <div key={index} className="team-member">
                                    {member.photo && (
                                        <img 
                                            src={member.photo} 
                                            alt={member.name}
                                            className="team-member-photo"
                                        />
                                    )}
                                    <div className="team-member-info">
                                        <h4>{member.name}</h4>
                                        <p className="team-member-title">{member.academic_title}</p>
                                        <p className="team-member-country">{member.country}</p>
                                    </div>
                                    <div className="team-member-actions">
                                        <Button 
                                            variant="secondary" 
                                            size="sm"
                                            onClick={() => handleEditMember(member, index)}
                                            disabled={updateProjectMutation.isPending}
                                        >
                                            <RiEditLine />
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            onClick={() => handleDeleteMember(index)}
                                            disabled={updateProjectMutation.isPending}
                                        >
                                            <RiDeleteBin6Line />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Key Metrics */}
                {project.metricas_clave && project.metricas_clave.length > 0 && (
                    <Card className="myproject-detail-card">
                        <div className="card-header">
                            <h3>
                                <RiBarChartLine className="section-icon" />
                                {t('project_metrics')}
                            </h3>
                            <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={handleAddMetric}
                                disabled={updateProjectMutation.isPending}
                            >
                                <RiAddLine /> {t('createProject.stages.impact.addMetric')}
                            </Button>
                        </div>
                        <div className="myproject-metrics">
                            {project.metricas_clave.map((metric: any, index: number) => (    
                                <div key={index} className="metric-item">
                                    <div className="metric-content">
                                        <h4>{metric.metrica}</h4>
                                        <p className="metric-value">{metric.valor_actual}</p>
                                        <p className="metric-method">{metric.metodo_medicion}</p>
                                    </div>
                                    <div className="metric-actions">
                                        <Button 
                                            variant="secondary" 
                                            size="sm"
                                            onClick={() => handleEditMetric(metric, index)}
                                            disabled={updateProjectMutation.isPending}
                                        >
                                            <RiEditLine />
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            onClick={() => handleDeleteMetric(index)}
                                            disabled={updateProjectMutation.isPending}
                                        >
                                            <RiDeleteBin6Line />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Legal Documents */}
                {(project.documento_traccion || project.acta_constitutiva || project.identificacion_representante || project.whitepaper || project.cap_table) && (
                    <Card className="myproject-detail-card">
                        <h3>
                            <RiFileTextLine className="section-icon" />
                            {t('project_documents')}
                        </h3>
                        <div className="documents-grid">
                            {project.documento_traccion && (
                                <a href={project.documento_traccion} target="_blank" rel="noopener noreferrer" className="document-link">
                                    <RiFileTextLine />
                                    <span>{t('project_doc_traction')}</span>
                                </a>
                            )}
                            {project.acta_constitutiva && (
                                <a href={project.acta_constitutiva} target="_blank" rel="noopener noreferrer" className="document-link">
                                    <RiFileTextLine />
                                    <span>{t('project_doc_incorporation')}</span>
                                </a>
                            )}
                            {project.whitepaper && (
                                <a href={project.whitepaper} target="_blank" rel="noopener noreferrer" className="document-link">
                                    <RiFileTextLine />
                                    <span>{t('project_doc_whitepaper')}</span>
                                </a>
                            )}
                            {project.cap_table && (
                                <a href={project.cap_table} target="_blank" rel="noopener noreferrer" className="document-link">
                                    <RiFileTextLine />
                                    <span>{t('project_doc_cap_table')}</span>
                                </a>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MyProject;
