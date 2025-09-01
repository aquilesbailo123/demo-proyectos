import toast from 'react-hot-toast'
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button/Button'
import { useProjectStore } from '@/stores/ProjectStore'

// Import stage components
import Stage1 from '@/components/project/Stage1/Stage1'
import Stage2 from '@/components/project/Stage2/Stage2'
import Stage3 from '@/components/project/Stage3/Stage3'
import Stage4 from '@/components/project/Stage4/Stage4'
import Stage5 from '@/components/project/Stage5/Stage5'
import Stage6 from '@/components/project/Stage6/Stage6'
import Stage7 from '@/components/project/Stage7/Stage7'

import './CreateProject.css'

const CreateProject = () => {
    const { t } = useTranslation('common')
    
    const { 
        currentStage, 
        setCurrentStage, 
        validateStage, 
    } = useProjectStore()
    
    const stages = [
        { id: 1, title: t('createProject.stages.identity.title'), component: Stage1 },
        { id: 2, title: t('createProject.stages.valueProposition.title'), component: Stage2 },
        { id: 3, title: t('createProject.stages.team.title'), component: Stage3 },
        { id: 4, title: t('createProject.stages.financing.title'), component: Stage4 },
        { id: 5, title: t('createProject.stages.traction.title'), component: Stage5 },
        { id: 6, title: t('createProject.stages.impact.title'), component: Stage6 },
        { id: 7, title: t('createProject.stages.legal.title'), component: Stage7 }
    ]

    const currentStageData = stages.find(stage => stage.id === currentStage)
    const CurrentStageComponent = currentStageData?.component

    const canProceed = validateStage(currentStage)
    const isLastStage = currentStage === stages.length
    
    // Calculate actual progress based on completed stages
    const completedStages = stages.filter(stage => validateStage(stage.id)).length
    const actualProgress = (completedStages / stages.length) * 100

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleNext = () => {
        if (canProceed && currentStage < stages.length) {
            setCurrentStage(currentStage + 1)
            scrollToTop()
        }
    }

    const handlePrevious = () => {
        if (currentStage > 1) {
            setCurrentStage(currentStage - 1)
            scrollToTop()
        }
    }

    const handleStageClick = (stageId: number) => {
        setCurrentStage(stageId)
    }

    const handleSubmit = async () => {
        toast.success(t('project_create_success'))
    }

    return (
        <div className="create-project-container">
            {/* Hero Section */}
            <div className="create-project-hero">
                <h1>{t('createProject.title')}</h1>
                <p>{t('createProject.subtitle') || 'Transform your innovative ideas into reality with our comprehensive project creation wizard'}</p>
            </div>

            <div className="create-project-content">
                {/* Modern Progress Tracker */}
                <div className="progress-tracker">
                    <div className="progress-header">
                        <h3 className="progress-title">Proceso de postulación</h3>
                        <div className="progress-percentage">{Math.round(actualProgress)}%</div>
                    </div>
                    
                    <div className="progress-bar-modern">
                        <div 
                            className="progress-fill-modern" 
                            style={{ width: `${actualProgress}%` }}
                        />
                    </div>
                    
                    <div className="progress-steps-modern">
                        {stages.map((stage) => (
                            <div
                                key={stage.id}
                                className={`progress-step-modern ${
                                    stage.id === currentStage ? 'active' : 
                                    validateStage(stage.id) ? 'completed' : 'pending'
                                }`}
                                onClick={() => handleStageClick(stage.id)}
                            >
                                <div className="step-number-modern">
                                    {validateStage(stage.id) ? <RiCheckLine /> : stage.id}
                                </div>
                                <span className="step-title-modern">{stage.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modern Stage Card */}
                <div className="stage-card">
                    {CurrentStageComponent && <CurrentStageComponent />}
                </div>

                {/* Modern Navigation */}
                <div className="wizard-navigation-modern">
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={handlePrevious}
                        disabled={currentStage === 1}
                    >
                        <RiArrowLeftLine />
                        {t('createProject.navigation.previous')}
                    </Button>

                    <div className="nav-info">
                        <span className="stage-indicator-modern">
                            {t('createProject.navigation.stage')} {currentStage} {t('createProject.navigation.of')} {stages.length}
                        </span>
                        {!canProceed && (
                            <div className="validation-warning-modern">
                                {t('createProject.navigation.completeRequired')}
                            </div>
                        )}
                    </div>

                    {isLastStage ? (
                        <Button
                            variant="success"
                            size="lg"
                            onClick={handleSubmit}
                            disabled={!canProceed}
                        >
                            {t('createProject.navigation.createProject')}
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleNext}
                            disabled={!canProceed}
                        >
                            {t('createProject.navigation.next')}
                            <RiArrowRightLine />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateProject
