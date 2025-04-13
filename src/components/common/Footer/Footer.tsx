import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
      <footer className="footer-main-cont">
            <p className="footer-text">
                {`© ${currentYear} - Todos los derechos reservados`}
            </p>
      </footer>
  )
}

export default Footer
