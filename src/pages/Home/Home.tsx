import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ProductCard from '../../components/common/ProductCard/ProductCard'
import Button from '../../components/common/Button/Button'
import Input from '../../components/forms/Input/Input'
import Select from '../../components/forms/Select/Select'

import { useProjectStore } from '../../stores/ProjectStore'
import { ProjectData } from '../../components/common/ProductCard/ProductCard'

import './Home.css'

const Home = () => {

    const { t } = useTranslation('common')
    
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    // const [activeFilter, setActiveFilter] = useState('All')
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true)
    const [projectsVisible, setProjectsVisible] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)
    
    // Generate consistent backers count using project ID as seed (same approach as in ProjectDetail)
    const generateBackersCount = (project: ProjectData) => {
        const idSum = project.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return Math.floor((idSum % 150) + 50); // Between 50-200 backers
    };
    
    const { 
        projects, 
        featuredProjects, 
        fetchProjects, 
        fetchFeaturedProjects 
    } = useProjectStore()

    const categoryOptions = [
        { value: 'all', label: t('home_all_categories') },
        { value: 'Education', label: t('Education') || 'Education' },
        { value: 'Environment', label: t('Environment') || 'Environment' },
        { value: 'Art', label: t('Art') || 'Art' },
        { value: 'Technology', label: t('Technology') || 'Technology' },
        { value: 'Community', label: t('Community') || 'Community' },
    ]

    useEffect(() => {
        // Simulating network delay for loading animations (with shorter delay)
        const fetchData = async () => {
            setShowSkeletonLoader(true)
            try {
                await Promise.all([
                    fetchProjects(),
                    fetchFeaturedProjects(),
                    // Shorter artificial delay for skeleton loader
                    new Promise(resolve => setTimeout(resolve, 800))
                ])
            } finally {
                setShowSkeletonLoader(false)
                setTimeout(() => setProjectsVisible(true), 100)
            }
        }
        
        fetchData()
    }, [fetchProjects, fetchFeaturedProjects])

    // Navigation is now handled by ProductCard component

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             project.description.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
        
        return matchesSearch && matchesCategory
    })

    // Function removed - now using ProductCard component directly in JSX

    return (
        <div className="home-container">

            {/* First section */}
            <section className="hero-section-wrapper">
                {/* Main banner */}
                <div 
                    ref={heroRef}
                    className="hero-section animated-gradient-background"
                >
                    <div className="hero-content">
                        {/* Left content */}
                        <div className="hero-text-content">
                            <h1 className="hero-title">{t('home_hero_title')}</h1>
                            <p className="hero-subtitle">{t('home_hero_subtitle')}</p>
                            <div className="hero-buttons">
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={() => navigate('/projects')}
                                >
                                    {t('home_get_started')}
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    size="lg"
                                    onClick={() => heroRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    {t('home_learn_more')}
                                </Button>
                            </div>
                        </div>
                        {/* Page Stats */}
                        {/* <div className="hero-stats-card">
                            <h3>{t('home_stats_title')}</h3>
                            <div className="platform-stats">
                                <div className="platform-stat">
                                    <div className="stat-value">245+</div>
                                    <div className="stat-label">{t('home_stats_projects')}</div>
                                </div>
                                <div className="platform-stat">
                                    <div className="stat-value">$3.2M</div>
                                    <div className="stat-label">{t('home_stats_funds')}</div>
                                </div>
                                <div className="platform-stat">
                                    <div className="stat-value">12K+</div>
                                    <div className="stat-label">{t('home_stats_donors')}</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                
                {/* Features */}
                <div className="platform-features">
                    <div className="feature-card">
                        <div className="feature-icon secure"></div>
                        <h3>{t('home_feature_transparency')}</h3>
                        <p>{t('home_feature_transparency_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon rewards"></div>
                        <h3>{t('home_feature_rewards')}</h3>
                        <p>{t('home_feature_rewards_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon global"></div>
                        <h3>{t('home_feature_impact')}</h3>
                        <p>{t('home_feature_impact_desc')}</p>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <div className="home-projects-section">
                <h2 className="section-title">{t('home_featured_projects')}</h2>
                
                {/* Project filters styled like Projects.tsx */}
                {/* <div className="home-filter-bar">
                    <div className="filter-categories">
                        <button 
                            className={`filter-button ${activeFilter === 'All' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('All')}
                        >
                            {t('projects.filters.all')}
                        </button>
                        <button 
                            className={`filter-button ${activeFilter === 'Featured' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Featured')}
                        >
                            {t('projects.filters.featured')}
                        </button>
                        <button 
                            className={`filter-button ${activeFilter === 'New' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('New')}
                        >
                            {t('projects.filters.new')}
                        </button>
                    </div>
                </div> */}
                
                <div className="projects-grid">
                    {showSkeletonLoader ? (
                        // Skeleton loader matching Projects.tsx
                        Array.from({ length: 3 }).map((_, index) => (
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
                        // Use ProductCard component for consistency with Projects.tsx
                        featuredProjects.map(project => (
                            <ProductCard
                                key={project.id}
                                project={{
                                    ...project,
                                    // Calculate days left (same method as Projects.tsx)
                                    daysLeft: Math.max(1, Math.round((new Date(project.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000 - new Date().getTime()) / (24 * 60 * 60 * 1000))),
                                    // Generate backers count consistently
                                    backers: generateBackersCount(project as unknown as ProjectData)
                                } as ProjectData}
                                visible={projectsVisible}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Project Search and Filter - styled like Projects.tsx */}
            <div className="home-projects-section">
                <h2 className="section-title">{t('nav_projects')}</h2>
                
                <div className="home-filter-bar">
                    <div className="home-search-filters">
                        <div className="home-search-input">
                            <Input
                                name="search"
                                size="md"
                                placeholder={t('home_search_projects')}
                                value={searchQuery}
                                setValue={setSearchQuery}
                            />
                        </div>
                        <div className="home-category-filter">
                            <Select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                options={categoryOptions}
                            />
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
                </div>

                <div className="projects-grid">
                    {showSkeletonLoader ? (
                        // Use the same skeleton style as featured projects
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
                                        daysLeft: Math.max(1, Math.round((new Date(project.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000 - new Date().getTime()) / (24 * 60 * 60 * 1000))),
                                        backers: generateBackersCount(project as unknown as ProjectData)
                                    } as ProjectData}
                                    visible={projectsVisible}
                                />
                            )) : 
                            <p className="no-results">{t('common_noResults')}</p>
                    )}
                </div>
            </div>

            {/* Call to Action */}
            <div className="cta-section animated-gradient-purple">
                <div className="cta-content">

                    <h1 className="hero-title">{t('home_cta_title')}</h1>
                    <p className="hero-subtitle">{t('home_cta_text')}</p>
                    <Button 
                        variant="secondary" 
                        size="lg"
                        onClick={() => navigate('/projects')}
                    >
                        {t('nav_create_project')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home