import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button/Button'
import useAuthStore from '@/stores/AuthStore'
import AuthRequired from '@/components/common/AuthRequired'
import { useProjectStore } from '@/stores/ProjectStore'
import { useCreateProject, useUserProject } from '@/hooks/useProject'

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
    const navigate = useNavigate()
    const { isLogged } = useAuthStore()
    const { t } = useTranslation('common')
    const [showSuccess, setShowSuccess] = useState(false)
    
    const { 
        currentStage, 
        setCurrentStage, 
        validateStage, 
        getProjectData, 
        getProjectFiles,
        getMemberPhotos,
        resetProject 
    } = useProjectStore()
    
    const createProjectMutation = useCreateProject()
    const { data: userProjects, isLoading: isLoadingUserProject } = useUserProject()

    // Check if user already has a project and redirect
    useEffect(() => {
        if (isLogged && !isLoadingUserProject && userProjects && userProjects.length > 0) {
            navigate('/project')
        }
    }, [isLogged, isLoadingUserProject, userProjects])

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
        // Allow navigation to previous stages or current stage
        if (validateStage(stageId) || validateStage(stageId - 1)) {
            setCurrentStage(stageId)
        }
    }

    const handleSubmit = async () => {
        if (!canProceed) return

        try {
            const projectData = getProjectData()
            const projectFiles = getProjectFiles()
            const memberPhotos = getMemberPhotos()
            await createProjectMutation.mutateAsync({ projectData, files: projectFiles, memberPhotos })
            setShowSuccess(true)
            
            // Reset the store after successful creation
            setTimeout(() => {
                resetProject()
                navigate('/myproject')
            }, 3000)
        } catch (error) {
            console.error('Error creating project:', error)
            // Handle error (show toast, etc.)
        }
    }

    // If not authenticated, show prompt to login
    if (!isLogged) {
        return <AuthRequired/>
    }

    // Success screen
    if (showSuccess) {
        return (
            <div className="create-project-container">
                <div className="success-screen">
                    <div className="success-icon">
                        <RiCheckLine />
                    </div>
                    <h1>{t('createProject.success.title')}</h1>
                    <p>{t('createProject.success.description')}</p>
                    <div className="success-actions">
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={() => navigate('/myproject')}
                        >
                            {t('createProject.success.viewProject')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="create-project-container">
            <div className="create-project-header">
                <h1>{t('createProject.title')}</h1>
                {/* <p>{t('createProject.subtitle')}</p> */}
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${actualProgress}%` }}
                    />
                </div>
                <div className="progress-steps">
                    {stages.map((stage) => (
                        <div
                            key={stage.id}
                            className={`progress-step ${
                                stage.id === currentStage ? 'active' : 
                                validateStage(stage.id) ? 'completed' : 'pending'
                            }`}
                            onClick={() => handleStageClick(stage.id)}
                        >
                            <div className="step-number">
                                {validateStage(stage.id) ? <RiCheckLine /> : stage.id}
                            </div>
                            <span className="step-title">{stage.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Stage Content */}
            <div className="stage-wrapper">
                {CurrentStageComponent && <CurrentStageComponent />}
            </div>

            {/* Navigation */}
            <div className="wizard-navigation">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={handlePrevious}
                    disabled={currentStage === 1}
                >
                    <RiArrowLeftLine />
                    {t('createProject.navigation.previous')}
                </Button>

                <div className="nav-center">
                    <span className="stage-indicator">
                        {t('createProject.navigation.stage')} {currentStage} {t('createProject.navigation.of')} {stages.length}
                    </span>
                    {!canProceed && (
                        <div className="validation-warning">
                            {t('createProject.navigation.completeRequired')}
                        </div>
                    )}
                </div>

                {isLastStage ? (
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={!canProceed || createProjectMutation.isPending}
                    >
                        {createProjectMutation.isPending 
                            ? t('createProject.navigation.creating')
                            : t('createProject.navigation.createProject')
                        }
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
    )
}

export default CreateProject
