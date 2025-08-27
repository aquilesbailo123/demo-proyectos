import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiAddCircleLine, RiImageAddLine, RiCalendarLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button/Button'
import Input from '@/components/forms/Input/Input'
import useAuthStore from '@/stores/AuthStore'
import AuthRequired from '@/components/common/AuthRequired'
import './CreateProject.css'

const CreateProject = () => {
    const navigate = useNavigate()
    const { isLogged } = useAuthStore()
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation('common')
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        shortDescription: '',
        fullDescription: '',
        fundingGoal: '',
        endDate: '',
        coverImage: null,
        tags: ['']
    })
    
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    // Handle tag changes
    const handleTagChange = (index: number, value: string) => {
        const newTags = [...formData.tags]
        newTags[index] = value
        setFormData({
            ...formData,
            tags: newTags
        })
    }
    
    // Add new tag input
    const addTagField = () => {
        if (formData.tags.length < 5) {
            setFormData({
                ...formData,
                tags: [...formData.tags, '']
            })
        }
    }
    
    // Remove tag input
    const removeTagField = (index: number) => {
        if (formData.tags.length > 1) {
            const newTags = [...formData.tags]
            newTags.splice(index, 1)
            setFormData({
                ...formData,
                tags: newTags
            })
        }
    }
    
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        // For MVP, simulate API call
        setTimeout(() => {
            // Navigate to home after "creating" project
            navigate('/projects')
            setLoading(false)
        }, 1500)
    }
    
    // Categories for dropdown
    const projectCategories = [
        t('createProject.categories.environment'),
        t('createProject.categories.education'),
        t('createProject.categories.healthcare'),
        t('createProject.categories.technology'),
        t('createProject.categories.agriculture'),
        t('createProject.categories.energy'),
        t('createProject.categories.artCulture'),
        t('createProject.categories.community')
    ]
    
    // If not authenticated, show prompt to login
    if (!isLogged) {
        return <AuthRequired/>
    }
    
    return (
        <div className="create-project-container">
            <div className="create-project-header">
                <h1>{t('createProject.title')}</h1>
                <p>{t('createProject.subtitle')}</p>
            </div>
            
            <form className="project-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>{t('createProject.sections.basicInfo')}</h2>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.title')}</label>
                        <Input
                            name="title"
                            value={formData.title}
                            setValue={(value) => setFormData({...formData, title: value})}
                            placeholder={t('createProject.placeholders.title')}
                            isRequired={true}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.category')}</label>
                        <select 
                            name="category" 
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="" disabled>{t('createProject.placeholders.category')}</option>
                            {projectCategories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.shortDesc')}</label>
                        <Input
                            name="shortDescription"
                            value={formData.shortDescription}
                            setValue={(value) => setFormData({...formData, shortDescription: value})}
                            placeholder={t('createProject.placeholders.shortDesc')}
                            maxLength={150}
                            isRequired={true}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.coverImage')}</label>
                        <div className="image-upload-container">
                            <div className="image-upload">
                                <RiImageAddLine size={48} />
                                <span>Upload Cover Image</span>
                                <p>Recommended size: 1200x630px</p>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="file-input" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="form-section">
                    <h2>Project Details</h2>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.fullDesc')}</label>
                        <textarea
                            name="fullDescription"
                            value={formData.fullDescription}
                            onChange={handleChange}
                            placeholder={t('createProject.placeholders.fullDesc')}
                            rows={8}
                            required
                            className="form-textarea"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.tags')}</label>
                        <div className="tags-container">
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="tag-input-group">
                                    <Input
                                        name={`tag-${index}`}
                                        value={tag}
                                        setValue={(value) => handleTagChange(index, value)}
                                        placeholder={t('createProject.placeholders.tag')}
                                    />
                                    {formData.tags.length > 1 && (
                                        <button 
                                            type="button" 
                                            className="tag-remove-btn"
                                            onClick={() => removeTagField(index)}
                                        >
                                            {t('createProject.buttons.removeTag')}
                                        </button>
                                    )}
                                </div>
                            ))}
                            
                            {formData.tags.length < 5 && (
                                <button 
                                    type="button" 
                                    className="add-tag-btn"
                                    onClick={addTagField}
                                >
                                    <RiAddCircleLine size={20} />
                                    {t('createProject.buttons.addTag')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="form-section">
                    <h2>{t('createProject.sections.fundingDetails')}</h2>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.fundingGoal')}</label>
                        <Input
                            type="text"
                            name="fundingGoal"
                            value={formData.fundingGoal}
                            setValue={(value) => setFormData({...formData, fundingGoal: value})}
                            placeholder={t('createProject.placeholders.fundingGoal')}
                            min="100"
                            isRequired={true}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t('createProject.fields.endDate')}</label>
                        <div className="date-input-container">
                            <RiCalendarLine className="date-icon" />
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="form-date-input"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="form-actions">
                    <Button 
                        variant="secondary" 
                        size="lg"
                        type="button"
                        onClick={() => navigate('/projects')}
                    >
                        {t('common_cancel')}
                    </Button>
                    <Button 
                        variant="primary" 
                        size="lg"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? t('createProject.buttons.creating') : t('createProject.buttons.create')}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateProject
