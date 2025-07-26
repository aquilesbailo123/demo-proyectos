import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard/ProductCard'
// import { RiLoader4Line } from 'react-icons/ri'
import i18next from 'i18next'

import Button from '@/components/common/Button/Button'
// import Input from '../../components/forms/Input/Input'
import { useProjectStore } from '../../stores/ProjectStore'
import './Projects.css'

// ProjectData type is already defined in ProductCard component

const Projects = () => {
    const { t } = useTranslation('common')
    // const navigate = useNavigate()
    
    const [activeFilter, setActiveFilter] = useState('All')
    const [loading, setLoading] = useState(true)
    const [projectsVisible, setProjectsVisible] = useState(false)
    const [searchQuery, _] = useState('')
    
    // Using ProjectStore instead of local mockProjects
    const { projects, fetchProjects } = useProjectStore()

    // Language change handling
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language)
    

    
    // Initial data loading
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await Promise.all([
                    fetchProjects(),
                    // Artificial delay for skeleton loader
                    new Promise(resolve => setTimeout(resolve, 1000))
                ])
            } finally {
                setLoading(false)
                setTimeout(() => setProjectsVisible(true), 100)
            }
        }
        
        fetchData()
    }, [fetchProjects])
    
    // Listen for language changes and refresh data
    useEffect(() => {
        const handleLanguageChange = () => {
            const newLang = i18next.language
            if (currentLanguage !== newLang) {
                setCurrentLanguage(newLang)
                // In a real app, we would refetch data here
                // For the MVP, we'll just simulate a reload
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setTimeout(() => setProjectsVisible(true), 100)
                }, 500)
            }
        }

        i18next.on('languageChanged', handleLanguageChange)
        return () => {
            i18next.off('languageChanged', handleLanguageChange)
        }
    }, [currentLanguage]);

    // Generate consistent backers count using project ID as seed (same approach as in Home)
    const generateBackersCount = (project: any) => {
        const idSum = project.id.split('').reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
        return Math.floor((idSum % 150) + 50); // Between 50-200 backers
    };
    
    // Calculate days left from project creation date (30 days campaign)
    const calculateDaysLeft = (createdAt: string) => {
        const today = new Date();
        const creationDate = new Date(createdAt);
        // Assuming 30-day campaign duration
        const endDate = new Date(creationDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        const difference = endDate.getTime() - today.getTime();
        return Math.max(0, Math.ceil(difference / (1000 * 3600 * 24)));
    };

    // Filter projects based on search query and category
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             project.description.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesCategory = activeFilter === 'All' || project.category === activeFilter
        
        return matchesSearch && matchesCategory
    })
    
    // Handle category filter button clicks
    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
    };
    
    // Handle project card click
    // const handleProjectClick = (projectId: string) => {
    //     // Navigate to project details page
    //     navigate(`/project/${projectId}`);
    // };

    return (
        <div className="projects-container">
            <div className="projects-header">
                <h1>{t('projects.title')}</h1>
                <p className="projects-subtitle">{t('projects.subtitle')}</p>
            </div>

            <div className="projects-filter-bar">
                <div className="filter-categories">
                    <button 
                        className={`filter-button ${activeFilter === 'All' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('All')}
                    >
                        {t('projects.filters.all')}
                    </button>
                    <button 
                        className={`filter-button ${activeFilter === 'Environment' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('Environment')}
                    >
                        {t('projects.filters.environment')}
                    </button>
                    <button 
                        className={`filter-button ${activeFilter === 'Education' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('Education')}
                    >
                        {t('projects.filters.education')}
                    </button>
                    <button 
                        className={`filter-button ${activeFilter === 'Healthcare' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('Healthcare')}
                    >
                        {t('projects.filters.healthcare')}
                    </button>
                    <button 
                        className={`filter-button ${activeFilter === 'Technology' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('Technology')}
                    >
                        {t('projects.filters.technology')}
                    </button>
                </div>
            </div>

            <div className="projects-sort">
                <div className="sort-label">{t('projects.sort.label')}:</div>
                <div className="sort-options">
                    <select>
                        <option value="newest">{t('projects.sort.newest')}</option>
                        <option value="trending">{t('projects.sort.trending')}</option>
                        <option value="ending-soon">{t('projects.sort.endingSoon')}</option>
                        <option value="most-funded">{t('projects.sort.mostFunded')}</option>
                    </select>
                </div>
            </div>

            <div className="projects-grid">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="project-card skeleton">
                            <div className="project-cover skeleton-image"></div>
                            <div className="project-info">
                                <div className="skeleton-text skeleton-title"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-progress">
                                    <div className="projects-progress-bar" style={{ width: '60%' }}></div>
                                </div>
                                <div className="skeleton-stats"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    filteredProjects.length > 0 ? 
                        filteredProjects.map(project => (
                            <ProductCard
                                key={project.id}
                                project={{
                                    ...project,
                                    // Generate backers count using project ID as seed (same as Home)
                                    backers: generateBackersCount(project),
                                    // Calculate days left from creation date
                                    daysLeft: calculateDaysLeft(project.createdAt)
                                }}
                                visible={projectsVisible}
                            />
                        )) : 
                        <p className="no-results">{t('common_noResults')}</p>
                )}
            </div>

            {!loading && (
                <div className="projects-load-more">
                    <Button variant="secondary" size="md">
                        {/* <RiLoader4Line className="spin" /> */}
                        {t('projects.loadMore')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Projects;
