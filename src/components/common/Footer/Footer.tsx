import { Link } from 'react-router-dom'
import { 
    RiRocketLine,
    RiLightbulbLine,
    RiTeamLine,
    RiGlobalLine,
    RiShieldCheckLine,
    RiThunderstormsLine,
    RiGithubFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiInstagramFill,
} from 'react-icons/ri'

import routes from '@/routes/routes'

import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer-futuristic">
      {/* Animated Background */}
      <div className="footer-bg-animation">
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
      </div>

      <div className="footer-content">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to={routes.home} className="footer-brand-link">
              <div className="footer-logo-container">
                <RiRocketLine className="footer-logo-icon" />
                <span className="footer-logo-text">LaunchPad</span>
              </div>
            </Link>
            <p className="footer-mission">
              Impulsando el futuro de Perú a través de startups innovadoras que fusionan 
              tecnología de vanguardia con sabiduría ancestral.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="footer-stat-number">11</span>
                <span className="footer-stat-label">Proyectos Activos</span>
              </div>
              <div className="footer-stat">
                <span className="footer-stat-number">$1.2M</span>
                <span className="footer-stat-label">Financiamiento Total</span>
              </div>
              <div className="footer-stat">
                <span className="footer-stat-number">500+</span>
                <span className="footer-stat-label">Inversores</span>
              </div>
            </div>
          </div>

          {/* Innovation Pillars */}
          <div className="footer-pillars">
            <h4 className="footer-section-title">Pilares de Innovación</h4>
            <div className="footer-pillar-grid">
              <div className="footer-pillar">
                <RiLightbulbLine className="footer-pillar-icon" />
                <span>Tecnología Cuántica</span>
              </div>
              <div className="footer-pillar">
                <RiThunderstormsLine className="footer-pillar-icon" />
                <span>IA Ancestral</span>
              </div>
              <div className="footer-pillar">
                <RiTeamLine className="footer-pillar-icon" />
                <span>Bioingeniería</span>
              </div>
              <div className="footer-pillar">
                <RiGlobalLine className="footer-pillar-icon" />
                <span>Metaverso Cultural</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="footer-actions">
            <h4 className="footer-section-title">Acciones Rápidas</h4>
            <div className="footer-action-buttons">
              <Link to="/create-project" className="footer-action-btn primary">
                <RiRocketLine />
                Lanzar Proyecto
              </Link>
              <Link to={routes.home} className="footer-action-btn secondary">
                <RiLightbulbLine />
                Explorar Ideas
              </Link>
            </div>
            <div className="footer-security">
              <RiShieldCheckLine className="footer-security-icon" />
              <span>Blockchain Seguro | Smart Contracts Auditados</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom-section">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {currentYear} LaunchPad Perú
            </p>
            <p className="footer-location">
              🏔️ Lima, Perú | 🌍 Impacto Global
            </p>
          </div>
          
          <div className="footer-social-modern">
            <span className="footer-social-label">Síguenos:</span>
            <div className="footer-social-icons-modern">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <RiGithubFill />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <RiTwitterXFill />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <RiLinkedinFill />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <RiInstagramFill />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
