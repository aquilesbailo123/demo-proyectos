import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
    RiHome3Line,
    RiWalletLine,
    RiHandCoinLine,
    RiAddCircleLine,
    RiMenuLine,
    RiCloseLine,
    RiWallet3Line
} from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import routes from '@/routes/routes'
import { mainLogo } from "@/utils/constants/common"
import { useAuthStore } from '@/stores/AuthStore'
import Button from '@/components/common/Button/Button'
// import LanguageToggle from '@/components/general/LanguageToggle/LanguageToggle'

import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, user } = useAuthStore() // connectWallet
    const { t } = useTranslation('common')
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    // const [walletConnecting, setWalletConnecting] = useState(false)
    
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
        { path: routes.home, icon: RiHome3Line, label: t('nav_home') },
        { path: '/projects', icon: RiHandCoinLine, label: t('nav_projects') },
        { path: '/donations', icon: RiWalletLine, label: t('nav_donations') },
    ]

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev)
    }

    // const handleConnectWallet = async () => {
    //     setWalletConnecting(true)
    //     try {
    //         await connectWallet('metamask')
    //     } finally {
    //         setTimeout(() => setWalletConnecting(false), 1500)
    //     }
    // }

    return (
        <nav className={`navbar-main-cont ${scrolled ? 'navbar-scrolled' : ''}`}>
            {/* <div className="navbar-backdrop"></div> */}
            
            {/* Main logo */}
            <Link to={routes.home} className="navbar-logo">
                <img src={mainLogo.src} alt={mainLogo.alt} className="navbar-logo-img float" />
                <span className="navbar-logo-text animated-gradient-text--shimmer">KuskaPay</span>
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
                {navItems.map((item, index) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`navbar-nav-link ${isActive(item.path) ? 'active' : ''} staggered-entrance-${index+1}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <item.icon className="navbar-icon" />
                        <span className="navbar-link-text">{item.label}</span>
                        {isActive(item.path) && <span className="navbar-active-indicator"></span>}
                    </Link>
                ))}
                
                <Link 
                    to="/create-project"
                    className="navbar-action-link staggered-entrance-4 button-hover-effect"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <RiAddCircleLine className="navbar-icon pulse" />
                    <span>{t('nav_create_project')}</span>
                </Link>
            </div>
            
            {/* User actions */}
            <div className="navbar-actions">
                {isAuthenticated ? (
                    <div className="navbar-user-info fade-in">
                        <div className="navbar-wallet-badge">
                            <RiWallet3Line className="navbar-wallet-icon" />
                            <span className="navbar-wallet-connected">{t('wallet_connected')}</span>
                        </div>
                        <Link to="/profile" className="navbar-user transform-3d">
                            <div className="navbar-user-avatar">
                                <span className="avatar-text">{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
                                <div className="avatar-shine"></div>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="navbar-auth-actions fade-in">
                        {/* TODO ADDD THIS */}
                        {/* <Button 
                            variant="primary"
                            size="sm"
                            className={`navbar-connect-btn ${walletConnecting ? 'connecting' : ''}`}
                            onClick={handleConnectWallet}
                            disabled={walletConnecting}
                        >
                            {walletConnecting ? (
                                <>
                                    <span className="wallet-connecting-spinner"></span>
                                    {t('wallet_connecting')}
                                </>
                            ) : (
                                <>{t('wallet_connect')}</>
                            )}
                        </Button> */}
                        <Button 
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate(routes.login)}
                        >
                            {t('nav_login')}
                        </Button>
                        {/* <LanguageToggle size="sm" /> */}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar