import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import ProductCard from '../../components/common/ProductCard/ProductCard'
import Button from '../../components/common/Button/Button'
import Input from '../../components/forms/Input/Input'
import Select from '../../components/forms/Select/Select'

import { useOldProjectStore } from '../../stores/OldProjectStore'
import { ProjectData } from '../../components/common/ProductCard/ProductCard'

import './Home.css'
import '@/styles/General.css'
import routes from '@/routes/routes'

const Home = () => {
    
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
    } = useOldProjectStore()

    const categoryOptions = [
        { value: 'all', label: 'Todas las categorías' },
        { value: 'Education', label: 'Educación' },
        { value: 'Environment', label: 'Medio Ambiente' },
        { value: 'Art', label: 'Arte' },
        { value: 'Technology', label: 'Tecnología' },
        { value: 'Community', label: 'Comunidad' },
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

            {/* Hero Section */}
            <section className="hero-section-wrapper">
                <div 
                    ref={heroRef}
                    className="hero-section startup-gradient-background"
                >
                    <div className="hero-content">
                        <div className="hero-text-content">
                            <div className="hero-badge">
                                <span className="badge-text">🚀 Lanza tu Startup</span>
                            </div>
                            <h1 className="hero-title">
                                Convierte tus <span className="gradient-text">Ideas de Startup</span> en Realidad
                            </h1>
                            <p className="hero-subtitle">
                                Conecta con mentores expertos, asegura financiamiento y obtén la guía que necesitas para construir la próxima gran empresa. Únete a una comunidad de innovadores y emprendedores.
                            </p>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Startups Lanzadas</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">$2.5M+</span>
                                    <span className="stat-label">Financiamiento Recaudado</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">150+</span>
                                    <span className="stat-label">Mentores Expertos</span>
                                </div>
                            </div>
                            <div className="hero-buttons">
                                <Button 
                                    variant="secondary" 
                                    size="xl"
                                    onClick={() => navigate(routes.createProject)}
                                >
                                    Comienza tu viaje
                                </Button>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="floating-cards">
                                <div className="feature-card card-1">
                                    <div className="card-icon">💡</div>
                                    <h4>Ideación</h4>
                                    <p>Transforma ideas en conceptos de negocio viables</p>
                                </div>
                                <div className="feature-card card-2">
                                    <div className="card-icon">🎯</div>
                                    <h4>Mentoría</h4>
                                    <p>Obtén orientación de expertos de la industria</p>
                                </div>
                                <div className="feature-card card-3">
                                    <div className="card-icon">💰</div>
                                    <h4>Financiamiento</h4>
                                    <p>Accede a inversores y oportunidades de financiación</p>
                                </div>
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
                
                {/* How It Works */}
                <div className="how-it-works">
                    <div className="section-header">
                        <h2>Cómo Funciona LaunchPad</h2>
                        <p>Tu viaje completo de startup en tres simples pasos</p>
                    </div>
                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <div className="step-icon">🚀</div>
                            <h3>Envía tu Idea</h3>
                            <p>Comparte tu concepto de startup y conecta con los mentores y recursos adecuados para tu industria.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <div className="step-icon">🎓</div>
                            <h3>Obtén Mentoría Experta</h3>
                            <p>Trabaja con emprendedores experimentados y expertos de la industria que brindan orientación personalizada y apoyo.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <div className="step-icon">💼</div>
                            <h3>Asegura Financiamiento</h3>
                            <p>Presenta tu plan de negocio refinado a nuestra red de inversores y asegura el financiamiento que necesitas para escalar.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <div className="home-projects-section">
                <h2 className="section-title">Proyectos Destacados</h2>
                
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
                <h2 className="section-title">Explora Proyectos</h2>
                
                <div className="home-filter-bar">
                    <div className="home-search-filters">
                        <div className="home-search-input">
                            <Input
                                name="search"
                                size="md"
                                placeholder="Buscar proyectos..."
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
                        <div className="sort-label">Ordenar por:</div>
                        <div className="sort-options">
                            <select>
                                <option value="newest">Más Recientes</option>
                                <option value="trending">Tendencia</option>
                                <option value="ending-soon">Terminan Pronto</option>
                                <option value="most-funded">Más Financiados</option>
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
                            <p className="no-results">No se encontraron resultados</p>
                    )}
                </div>
            </div>

            {/* Call to Action */}
            <div className="cta-section startup-gradient-background">
                <div className="cta-content">
                    <h1 className="hero-title">¿Listo para Lanzar tu Startup?</h1>
                    <p className="hero-subtitle">Únete a cientos de emprendedores que han convertido sus ideas en negocios exitosos con nuestra plataforma.</p>
                    <Button 
                        variant="secondary" 
                        size="lg"
                        onClick={() => navigate('/projects')}
                    >
                        Crear Proyecto
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home