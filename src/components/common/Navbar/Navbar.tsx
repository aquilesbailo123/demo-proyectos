import { useTranslation } from "react-i18next"
import { Link, useLocation } from 'react-router-dom'
import { 
  RiHome3Line, 
  // Add icons here
  RiUserLine 
} from 'react-icons/ri'

import routes from '@/routes/routes'
import { mainLogo } from "@/utils/constants/common"

import './Navbar.css'

const Navbar = () => {
    const { t } = useTranslation('common')
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const navItems = [
        { path: routes.home, icon: RiHome3Line, label: t('nav.dashboard') },
    ]

    return (
        <nav className="navbar-main-cont">
            <Link to={routes.home} className="navbar-logo">
                <img src={mainLogo.src} alt={mainLogo.alt} className="navbar-logo-img" />
            </Link>

            <div className="navbar-nav-links">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`navbar-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                        <item.icon className="navbar-icon" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>

            <div className="navbar-user">
                <RiUserLine className="navbar-avatar" size={24} />
            </div>
        </nav>
    )
}

export default Navbar