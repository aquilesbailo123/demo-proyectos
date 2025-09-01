import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  RiEyeLine,
  RiLineChartLine,
  RiGroupLine,
  RiCalendarLine,
  RiMoneyDollarCircleLine
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
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  // Calculate progress percentage
  const getProgressPercent = () => {
    if (project.raisedAmount && project.targetAmount) {
      return Math.round((project.raisedAmount / project.targetAmount) * 100)
    } else if (project.fundedAmount && project.fundingGoal) {
      return Math.round((project.fundedAmount / project.fundingGoal) * 100)
    }
    return 0
  }

  // Get raised amount
  const getRaisedAmount = () => {
    return project.raisedAmount || project.fundedAmount || 0
  }

  // Get target amount
  const getTargetAmount = () => {
    return project.targetAmount || project.fundingGoal || 0
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`
  }

  // Get backers count
  const getBackers = () => {
    return project.backers
  }

  // Get days left
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

  // Get tag name
  const getTagName = (tag: Tag | string): string => {
    return typeof tag === 'string' ? tag : tag.name
  }

  const progressPercent = getProgressPercent()
  const raisedAmount = getRaisedAmount()
  const targetAmount = getTargetAmount()

  return (
    <div 
      className={`startup-card ${visible ? 'startup-card-visible' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with image and category */}
      <div className="startup-card-header">
        <div 
          className="startup-card-image" 
          style={{ backgroundImage: `url(${project.coverImage})` }}
        >
          <div className="startup-card-category-badge">
            {project.category}
          </div>
          <div className={`startup-card-hover-overlay ${isHovered ? 'visible' : ''}`}>
            <RiEyeLine className="startup-card-view-icon" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="startup-card-content">
        <div className="startup-card-title-section">
          <h3 className="startup-card-title">{project.title}</h3>
          <p className="startup-card-description">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="startup-card-tags">
          {Array.isArray(project.tags) && project.tags.slice(0, 2).map((tag, index) => (
            <span 
              className="startup-card-tag" 
              key={typeof tag === 'string' ? `tag-${index}` : tag.id}
            >
              {getTagName(tag)}
            </span>
          ))}
        </div>

        {/* Funding Progress */}
        <div className="startup-card-funding">
          <div className="startup-card-funding-header">
            <div className="startup-card-funding-info">
              <RiMoneyDollarCircleLine className="startup-card-funding-icon" />
              <span className="startup-card-funding-raised">{formatCurrency(raisedAmount)}</span>
              <span className="startup-card-funding-target">de {formatCurrency(targetAmount)}</span>
            </div>
            <div className="startup-card-funding-percent">
              <RiLineChartLine className="startup-card-percent-icon" />
              <span>{progressPercent}%</span>
            </div>
          </div>
          
          <div className="startup-card-progress-bar">
            <div 
              className="startup-card-progress-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="startup-card-stats">
          <div className="startup-card-stat">
            <RiGroupLine className="startup-card-stat-icon" />
            <span className="startup-card-stat-value">{getBackers()}</span>
            <span className="startup-card-stat-label">Inversores</span>
          </div>
          <div className="startup-card-stat">
            <RiCalendarLine className="startup-card-stat-icon" />
            <span className="startup-card-stat-value">{getDaysLeft()}</span>
            <span className="startup-card-stat-label">Días</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
