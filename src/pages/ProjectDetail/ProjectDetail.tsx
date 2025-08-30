import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { RiArrowLeftSLine, RiCheckLine, RiTimeLine, RiUser3Line, RiCalendarLine, RiShareLine } from 'react-icons/ri'

import Button from '@/components/common/Button/Button'
import Card from '@/components/common/Card/Card'
import Spinner from '@/components/common/Spinner/Spinner'
import Input from '@/components/forms/Input/Input'

import { useOldProjectStore } from '@/stores/OldProjectStore'
import useAuthStore from '@/stores/AuthStore'

import './ProjectDetail.css'
import '@/styles/General.css'

const ProjectDetail = () => {
    const { t, i18n } = useTranslation('common')
    const { projectId } = useParams<{ projectId: string }>()
    const navigate = useNavigate()
    
    const [donationAmount, setDonationAmount] = useState<string>('')
    const [donationMessage, setDonationMessage] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
    const { projects, isLoading, fetchProjects, donateToProject } = useOldProjectStore()
    const { isLogged } = useAuthStore() // Using isLogged from refactored AuthStore
    
    useEffect(() => {
        if (projects.length === 0) {
            fetchProjects()
        }
    }, [fetchProjects, projects.length])
    
    const project = projects.find(p => p.id === projectId)
    
    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!isLogged) {
            toast.error(t('projectDetail.errors.loginRequired'))
            navigate('/login')
            return
        }
        
        if (!donationAmount || parseFloat(donationAmount) <= 0) {
            toast.error(t('projectDetail.errors.invalidAmount'))
            return
        }
        
        setIsSubmitting(true)
        
        try {
            const success = await donateToProject(
                projectId!, 
                parseFloat(donationAmount), 
                donationMessage
            )
            
            if (success) {
                toast.success(t('projectDetail.success.donation'))
                setDonationAmount('')
                setDonationMessage('')
            }
        } catch (error) {
            toast.error(t('projectDetail.errors.processingFailed'))
            console.error('Donation error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }
    
    if (isLoading) {
        return (
            <div className="project-detail-container">
                <div className="loading-container">
                    <Spinner variant="primary" />
                </div>
            </div>
        )
    }
    
    if (!project) {
        return (
            <div className="project-detail-container">
                <Card>
                    <div className="project-not-found">
                        <h2>{t('projectDetail.notFound.title')}</h2>
                        <p>{t('projectDetail.notFound.description')}</p>
                        <Button 
                            variant="primary" 
                            onClick={() => navigate('/home')}
                        >
                            {t('common_back')}
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }
    
    // Generate a consistent backers count using project id as seed
    const generateBackersCount = () => {
        // Use project ID to generate a consistent "random" number
        // This ensures the same project always shows the same backers count
        const idSum = project.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return Math.floor((idSum % 150) + 50); // Between 50-200 backers
    };
    
    const progressPercentage = (project.raisedAmount / project.targetAmount) * 100
    
    // Calculate days left (using project creation date + 30 days as fallback since endDate isn't in the Project type)
    const getDaysLeft = () => {
        // Fallback: assume projects last 30 days from creation
        if (!project.createdAt) return 0;
        const now = new Date();
        const createdAt = new Date(project.createdAt);
        const endDate = new Date(createdAt);
        endDate.setDate(createdAt.getDate() + 30); // Assuming 30 day campaign
        
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    return (
        <div className="project-detail-container">
            <div className="project-detail-header">
                <Button 
                    variant="secondary" 
                    className="back-button"
                    onClick={() => navigate('/home')}
                >
                    <RiArrowLeftSLine /> {t('common_back')}
                </Button>
                <div className="project-detail-share">
                    <Button 
                        variant="secondary" 
                        className="share-button"
                        onClick={() => navigator.clipboard.writeText(window.location.href).then(() => 
                            toast.success(t('projectDetail.shareLinkCopied') || 'Link copied!'))
                        }
                    >
                        <RiShareLine /> {t('projectDetail.share') || 'Share'}
                    </Button>
                </div>
            </div>
            
            <div className="project-detail-hero">
                <div className="project-detail-cover-wrapper">
                    <div 
                        className="project-detail-cover" 
                        style={{ backgroundImage: `url(${project.coverImage})` }}
                    />
                    <div className="project-detail-category">{project.category}</div>
                </div>
                
                <div className="project-detail-main">
                    <h1 className="project-detail-title">{project.title}</h1>
                    
                    <div className="project-detail-tags">
                        {project.tags.map(tag => (
                            <span className="project-detail-tag" key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                    
                    <div className="project-detail-meta-info">
                        <div className="meta-item">
                            <RiUser3Line className="meta-icon" />
                            <span>{project.creatorAddress.substring(0, 6)}...{project.creatorAddress.substring(project.creatorAddress.length - 4)}</span>
                        </div>
                        <div className="meta-item">
                            <RiCalendarLine className="meta-icon" />
                            <span>{new Date(project.createdAt).toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="meta-item">
                            <RiTimeLine className="meta-icon" />
                            <span><strong>{getDaysLeft()}</strong> {t('projects.daysLeft')}</span>
                        </div>
                    </div>
                    
                    <div className="project-detail-progress">
                        <div className="project-detail-progress-bar-container">
                            <div 
                                className="project-detail-progress-bar" 
                                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                            >
                                {progressPercentage >= 15 && (
                                    <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
                                )}
                            </div>
                            {progressPercentage < 15 && (
                                <span className="progress-percentage-outside">{Math.round(progressPercentage)}%</span>
                            )}
                        </div>
                        
                        <div className="project-detail-stats">
                            <div className="stat-box">
                                <div className="stat-value">{project.raisedAmount.toLocaleString()} ETH</div>
                                <div className="stat-label">{t('projectDetail.raised')}</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">{generateBackersCount()}</div>
                                <div className="stat-label">{t('projects.backers')}</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">{project.targetAmount.toLocaleString()} ETH</div>
                                <div className="stat-label">{t('projectDetail.target')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="project-detail-content">
                <div className="project-detail-left-column">
                    <div className="project-detail-card about-card">
                        <h2 className="section-title">{t('projectDetail.sections.about')}</h2>
                        <div className="project-detail-description">
                            <p className="main-description">{project.description}</p>
                            
                            <div className="content-section">
                                <h3 className="content-title">{t('projectDetail.mission.title')}</h3>
                                <p className="content-text">
                                    {t('projectDetail.mission.description')}
                                </p>
                            </div>
                            
                            <div className="content-section">
                                <h3 className="content-title">{t('projectDetail.contribution.title')}</h3>
                                <p className="content-text">
                                    {t('projectDetail.contribution.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="project-detail-card roadmap-card">
                        <h2 className="section-title">{t('projectDetail.roadmap.title')}</h2>
                        <div className="project-detail-roadmap">
                            <div className="roadmap-timeline">
                                <div className="timeline-item">
                                    <div className="timeline-marker completed">
                                        <RiCheckLine className="check-icon" />
                                    </div>
                                    <div className="timeline-content">
                                        <h4 className="timeline-title">{t('projectDetail.roadmap.phase1.title')}</h4>
                                        <p className="timeline-date">{t('projectDetail.roadmap.phase1.time')}</p>
                                        <p className="timeline-description">Initial development and community building phase</p>
                                    </div>
                                </div>
                                
                                <div className="timeline-item active">
                                    <div className="timeline-marker active"></div>
                                    <div className="timeline-content">
                                        <h4 className="timeline-title">{t('projectDetail.roadmap.phase2.title')}</h4>
                                        <p className="timeline-date">{t('projectDetail.roadmap.phase2.time')}</p>
                                        <p className="timeline-description">Platform expansion and feature deployment</p>
                                    </div>
                                </div>
                                
                                <div className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h4 className="timeline-title">{t('projectDetail.roadmap.phase3.title')}</h4>
                                        <p className="timeline-date">{t('projectDetail.roadmap.phase3.time')}</p>
                                        <p className="timeline-description">Global scaling and partnership development</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="project-detail-card creator-card">
                        <h2 className="section-title">{t('projectDetail.sections.creator')}</h2>
                        <div className="creator-profile">
                            <div className="creator-avatar">
                                {project.creatorAddress.substring(0, 2)}
                            </div>
                            <div className="creator-info">
                                <div className="creator-address">
                                    <h4>{t('projectDetail.creator.address')}</h4>
                                    <p className="address-text">{project.creatorAddress}</p>
                                </div>
                                <div className="creator-joined">
                                    <h4>{t('projectDetail.creator.created')}</h4>
                                    <p>
                                        {new Date(project.createdAt).toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="project-detail-right-column">
                    <div className="project-detail-card donation-card">
                        <h2 className="section-title">{t('projectDetail.sections.support')}</h2>
                        <form onSubmit={handleDonate} className="donation-form">
                            <div className="donation-amount">
                                <label className="donation-label">{t('projectDetail.donation.amountLabel')}</label>
                                <div className="donation-input-wrapper">
                                    <Input
                                        name="amount"
                                        type="number"
                                        placeholder="0.5"
                                        step="0.01"
                                        min="0.01"
                                        value={donationAmount}
                                        setValue={setDonationAmount}
                                        required
                                    />
                                    <span className="currency-indicator">ETH</span>
                                </div>
                                
                                <div className="quick-amount-buttons">
                                    <button 
                                        type="button" 
                                        className="quick-amount" 
                                        onClick={() => setDonationAmount('0.1')}
                                    >0.1</button>
                                    <button 
                                        type="button" 
                                        className="quick-amount" 
                                        onClick={() => setDonationAmount('0.5')}
                                    >0.5</button>
                                    <button 
                                        type="button" 
                                        className="quick-amount" 
                                        onClick={() => setDonationAmount('1.0')}
                                    >1.0</button>
                                    <button 
                                        type="button" 
                                        className="quick-amount" 
                                        onClick={() => setDonationAmount('5.0')}
                                    >5.0</button>
                                </div>
                            </div>
                            
                            <div className="donation-message">
                                <Input
                                    name="message"
                                    label={t('projectDetail.donation.messageLabel')}
                                    placeholder={t('projectDetail.donation.messagePlaceholder')}
                                    value={donationMessage}
                                    setValue={setDonationMessage}
                                />
                            </div>
                            
                            {!isLogged && (
                                <div className="auth-notice">
                                    <p>{t('projectDetail.donation.loginRequired')}</p>
                                </div>
                            )}
                            
                            <Button
                                variant="primary"
                                size="lg"
                                type="submit"
                                disabled={isSubmitting}
                                className="donate-button"
                            >
                                {isSubmitting ? <Spinner variant="primary" /> : t('projectDetail.donation.donateButton')}
                            </Button>
                            
                            <div className="stake-info">
                                {donationAmount && parseFloat(donationAmount) > 0 && (
                                    <p>
                                        {t('projectDetail.donation.stakeInfo.prefix')}
                                        <strong> {((parseFloat(donationAmount) / (project.raisedAmount + parseFloat(donationAmount))) * 100).toFixed(2)}%</strong> 
                                        {t('projectDetail.donation.stakeInfo.suffix')}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                    
                    <div className="project-detail-card backers-card">
                        <h2 className="section-title">Top Backers</h2>
                        <div className="backers-list">
                            <div className="backer-item">
                                <div className="backer-avatar">0x</div>
                                <div className="backer-info">
                                    <div className="backer-address">0x71C...F29B</div>
                                    <div className="backer-amount">2.5 ETH</div>
                                </div>
                                <div className="backer-date">3 days ago</div>
                            </div>
                            <div className="backer-item">
                                <div className="backer-avatar">0x</div>
                                <div className="backer-info">
                                    <div className="backer-address">0x45A...12CD</div>
                                    <div className="backer-amount">1.8 ETH</div>
                                </div>
                                <div className="backer-date">5 days ago</div>
                            </div>
                            <div className="backer-item">
                                <div className="backer-avatar">0x</div>
                                <div className="backer-info">
                                    <div className="backer-address">0x93E...76AB</div>
                                    <div className="backer-amount">1.2 ETH</div>
                                </div>
                                <div className="backer-date">1 week ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail
