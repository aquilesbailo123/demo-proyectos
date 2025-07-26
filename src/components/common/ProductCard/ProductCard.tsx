import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  RiArrowRightSLine,
  RiStarLine,
  RiRocketLine,
  RiTimeLine 
} from 'react-icons/ri'

import './ProductCard.css'

// Define interface for tag objects used in Home.tsx
export interface Tag {
  id: string
  name: string
}

// Define consolidated Project interface for unified usage
export interface ProjectData {
  id: string
  title: string
  description: string
  category: string
  coverImage: string
  backers: number
  daysLeft?: number
  endDate?: Date
  // Support both Home and Projects funding property names
  raisedAmount?: number
  fundedAmount?: number
  targetAmount?: number
  fundingGoal?: number
  // Tag structure can be either array of Tag objects or array of strings
  tags: Tag[] | string[]
}

interface ProductCardProps {
  project: ProjectData
  visible: boolean
}

const ProductCard = ({ project, visible }: ProductCardProps) => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  // Handle unified calculation of progress percentage
  const getProgressPercent = () => {
    if (project.raisedAmount && project.targetAmount) {
      return Math.round((project.raisedAmount / project.targetAmount) * 100)
    } else if (project.fundedAmount && project.fundingGoal) {
      return Math.round((project.fundedAmount / project.fundingGoal) * 100)
    }
    return 0
  }

  // Handle getting the correct raised amount value
  const getRaisedAmount = () => {
    return project.raisedAmount || project.fundedAmount || 0
  }

  // Handle getting the correct target amount value
  const getTargetAmount = () => {
    return project.targetAmount || project.fundingGoal || 0
  }

  // Format currency values
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ETH`
  }

  // Get correct backers count
  const getBackers = () => {
    return project.backers
  }

  // Get days left (either from direct property or calculated from endDate)
  const getDaysLeft = () => {
    if (project.daysLeft !== undefined) {
      return project.daysLeft
    } else if (project.endDate) {
      const now = new Date()
      const endDate = new Date(project.endDate)
      const diffTime = endDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }
    return 0
  }

  // Handle card click
  const handleClick = () => {
    navigate(`/project/${project.id}`)
  }

  // Helper to check if a tag is one of the special tags that needs an icon
  const isSpecialTag = (tagName: string): boolean => {
    return ['Featured', 'New', 'Ending Soon'].includes(tagName)
  }

  // Helper to render the appropriate icon for a tag
  const getTagIcon = (tagName: string) => {
    switch(tagName) {
      case 'Featured': return <RiStarLine className="product-card-tag-icon" />
      case 'New': return <RiRocketLine className="product-card-tag-icon" />
      case 'Ending Soon': return <RiTimeLine className="product-card-tag-icon" />
      default: return null
    }
  }

  // Helper function to get tag name regardless of tag format
  const getTagName = (tag: Tag | string): string => {
    return typeof tag === 'string' ? tag : tag.name
  }

  return (
    <div 
      className={`product-card product-card-hover-effect ${visible ? 'visible' : ''}`}
      data-id={project.id}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="product-card-cover" 
        style={{ backgroundImage: `url(${project.coverImage})` }}
      >
        <div className="product-card-category">{project.category}</div>
        <div className={`product-card-overlay ${isHovered ? 'hovered' : ''}`}>
          <div className="product-card-view">
            <RiArrowRightSLine size={20} />
            <span>{t('home_view_project')}</span>
          </div>
        </div>
      </div>
      <div className="product-card-info">
        <h3 className="product-card-title">{project.title}</h3>
        <p className="product-card-description">{project.description}</p>
        
        <div className="product-card-tags">
          {Array.isArray(project.tags) && project.tags.map((tag, index) => {
            const tagName = getTagName(tag)
            return (
              <span 
                className="product-card-tag" 
                key={typeof tag === 'string' ? `tag-${index}` : tag.id}
              >
                {isSpecialTag(tagName) && getTagIcon(tagName)}
                {tagName}
              </span>
            )
          })}
        </div>
        
        <div className="product-card-progress">
          <div className="product-card-progress-bar-container">
            <div 
              className="product-card-progress-bar" 
              style={{ width: `${getProgressPercent()}%` }}
            ></div>
          </div>
          <div className="product-card-progress-stats">
            <div>
              <span className="product-card-funded-amount">{formatCurrency(getRaisedAmount())}</span>
              <span className="product-card-goal-amount"> of {formatCurrency(getTargetAmount())}</span>
            </div>
            <span className="product-card-funded-percent">{getProgressPercent()}%</span>
          </div>
        </div>
        
        <div className="product-card-meta">
          <span><strong>{getBackers()}</strong> {t('projects.backers')}</span>
          <span><strong>{getDaysLeft()}</strong> {t('projects.daysLeft')}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
