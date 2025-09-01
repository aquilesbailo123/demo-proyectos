import { Link, useLocation } from 'react-router-dom'
import { 
    RiPlanetLine,
    RiRocketLine,
    RiLightbulbLine,
    RiMenuLine,
    RiCloseLine,
    // RiUserLine,
    RiShieldLine,
    // RiFundsLine,
    // RiGraduationCapLine
} from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import routes from '@/routes/routes'
import useAuthStore from '@/stores/AuthStore'
import { useUserProject } from '@/hooks/useProject'
// import Button from '@/components/common/Button/Button'
// import Spinner from '@/components/common/Spinner/Spinner'

import './Navbar.css'

const Navbar = () => {
    // const navigate = useNavigate()
    const { t } = useTranslation('common')
    const location = useLocation()

    const { isLogged, getUserDetails } = useAuthStore()
    const { data: userProjects, isLoading: isLoadingUserProject } = useUserProject()
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    // const [_, setUserDetails] = useState<UserDetails | undefined>(undefined)
    // const [_, setProfileLoading] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    
    const hasProject = isLogged && !isLoadingUserProject && userProjects && userProjects.length > 0

    useEffect(() => {
        if (isLogged) {
            // Simulate loading state for better UX
            // setProfileLoading(true)
            setTimeout(() => {
                // const userData = getUserDetails()
                // setUserDetails(userData)
                // setProfileLoading(false)
            }, 500)
        }
    }, [isLogged, getUserDetails])
    
    // Handle scroll event to add glass effect when scrolled
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (path: string) => location.pathname.startsWith(path)

    const navItems = [
        { path: routes.home, icon: RiPlanetLine, label: t('nav_home') },
        // { path: '/projects', icon: RiRocketLine, label: 'Startups' },
        // { path: '/mentoring', icon: RiGraduationCapLine, label: 'Mentoring' },
        // { path: '/funding', icon: RiFundsLine, label: 'Funding' },
    ]

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev)
    }

    return (
        <nav className={`navbar-main-cont ${scrolled ? 'navbar-scrolled' : ''}`}>
            
            {/* Main logo */}
            <Link to={routes.home} className="navbar-logo">
                <div className="navbar-logo-icon">
                    <RiRocketLine className="navbar-brand-icon" />
                </div>
                <span className="navbar-logo-text ">LaunchPad</span>
            </Link>

            {/* MOBILE: menu toggle */}
            <button className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? (
                    <RiCloseLine size={24} className="fade-in" />
                ) : (
                    <RiMenuLine size={24} className="fade-in" />
                )}
            </button>
            
            {/* DESKTOP: menu links */}
            <div className={`navbar-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`navbar-nav-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <item.icon className="navbar-icon" />
                        <span className="navbar-link-text">{item.label}</span>
                        {isActive(item.path) && <span className="navbar-active-indicator"></span>}
                    </Link>
                ))}
                
                {hasProject ? (
                    <Link 
                        to={routes.myProject}
                        className={`navbar-nav-link ${isActive(routes.myProject) ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <RiShieldLine className="navbar-icon" />
                        <span>{t('nav_my_project')}</span>
                    </Link>
                ) : (
                    <Link 
                        to={routes.createProject}
                        className={`navbar-nav-link ${isActive(routes.createProject) ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <RiLightbulbLine className="navbar-icon pulse" />
                        <span>{t('nav_create_project')}</span>
                    </Link>
                )}

                {/* {isLogged && mobileMenuOpen ? (
                    <Link 
                        to="/profile"
                        className={`navbar-nav-link ${isActive('/profile') ? 'active' : ''} show-when-small`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <RiUserLine className="navbar-icon" />
                        <span>{t('profile')}</span>
                    </Link>
                ) : (
                    <Button 
                        variant="secondary"
                        size="sm"
                        className="show-when-small"
                        onClick={() => navigate(routes.login)}
                    >
                        {t('nav_login')}
                    </Button>
                )} */}
                
            </div>
            
            {/* User actions */}
            <div className="navbar-actions">
                <div className="navbar-user-info fade-in"></div>
                {/* {profileLoading ? (
                    <div className="navbar-user-info fade-in">
                        <Spinner className="navbar-user" />
                    </div>
                ) : isLogged ? (
                    <div className="navbar-user-info fade-in">
                        <Link to="/profile" className="navbar-user transform-3d">
                            <div className="navbar-user-avatar">
                                <span className="avatar-text">{userDetails?.username?.charAt(0).toUpperCase() || 'U'}</span>
                                <div className="avatar-shine"></div>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="navbar-auth-actions fade-in">
                        <Button 
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate(routes.login)}
                        >
                            {t('nav_login')}
                        </Button>
                    </div>
                )} */}
            </div>
        </nav>
    )
}

export default Navbar