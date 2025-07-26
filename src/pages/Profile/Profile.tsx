import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiWallet3Line, RiUserLine, RiSettingsLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button/Button'
import AuthRequired from '@/components/common/AuthRequired'
import { useAuthStore } from '@/stores/AuthStore'
import './Profile.css'

// Define types for user data
type DonationType = {
    id: string;
    project: string;
    amount: number;
    date: Date;
    status: string;
}

type UserDataType = {
    username: string;
    wallet: string;
    joinDate: Date;
    donations: DonationType[];
    totalDonated: number;
    activeDonations: number;
    projectsSupported: number;
}

// Mock data for MVP
const mockUserData: UserDataType = {
    username: 'CryptoDonor',
    wallet: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    joinDate: new Date(2024, 6, 15),
    donations: [
        { id: '1', project: 'Clean Water Initiative', amount: 0.25, date: new Date(2024, 7, 5), status: 'confirmed' },
        { id: '2', project: 'Renewable Energy Farm', amount: 0.5, date: new Date(2024, 7, 10), status: 'confirmed' },
        { id: '3', project: 'Community Learning Center', amount: 0.15, date: new Date(2024, 7, 18), status: 'pending' }
    ],
    totalDonated: 0.9,
    activeDonations: 3,
    projectsSupported: 3
}

const Profile = () => {
    const navigate = useNavigate()
    const { isAuthenticated, logout } = useAuthStore()
    const [userData, setUserData] = useState<UserDataType | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('profile')
    const { t, i18n } = useTranslation('common')
    
    useEffect(() => {
        // Simulate API fetch for user data
        const timer = setTimeout(() => {
            setUserData(mockUserData)
            setLoading(false)
        }, 1000)
        
        return () => clearTimeout(timer)
    }, [])
    
    const handleLogout = () => {
        logout()
        navigate('/')
    }
    
    // Format date helper
    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return new Intl.DateTimeFormat(i18n.language === 'es' ? 'es-ES' : 'en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date)
    }
    
    // Format wallet address helper
    const formatWalletAddress = (address: string) => {
        if (!address) return ''
        return address.substring(0, 6) + '...' + address.substring(address.length - 4)
    }
    
    // If not authenticated, show prompt to login
    if (!isAuthenticated) {
        return <AuthRequired/>
    }
    
    if (loading) {
        return (
            <div className="profile-container">
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>{t('profile.loading')}</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <span>{userData?.username?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
                <div className="profile-info">
                    <h1>{userData?.username}</h1>
                    <div className="wallet-badge">
                        <RiWallet3Line />
                        <span>{userData?.wallet ? formatWalletAddress(userData.wallet) : '-'}</span>
                    </div>
                    <p className="joined-date">{t('profile.memberSince')} {formatDate(userData?.joinDate)}</p>
                </div>
                <div className="profile-actions">
                    <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        <RiLogoutBoxRLine />
                        {t('profile.logout')}
                    </Button>
                </div>
            </div>
            
            <div className="profile-stats">
                <h2>{t('profile.donationStats.title')}</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-value">{userData?.totalDonated} ETH</div>
                        <div className="stat-label">{t('profile.donationStats.totalDonated')}</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{userData?.activeDonations}</div>
                        <div className="stat-label">{t('profile.donationStats.activeDonations')}</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{userData?.projectsSupported}</div>
                        <div className="stat-label">{t('profile.donationStats.projectsSupported')}</div>
                    </div>
                </div>
            </div>
            
            <div className="profile-navigation">
                <div 
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <RiUserLine />
                    <span>{t('profile.tabs.profile')}</span>
                </div>
                <div 
                    className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    <RiSettingsLine />
                    <span>{t('profile.tabs.settings')}</span>
                </div>
            </div>
            
            <div className="profile-content">
                {activeTab === 'profile' && (
                    <div className="profile-section">
                        <h2>{t('profile.recentDonations.title')}</h2>
                        
                        <div className="donations-list">
                            {userData?.donations && userData.donations.length > 0 ? (
                                userData.donations.map((donation: DonationType) => (
                                    <div key={donation.id} className="donation-item">
                                        <div className="donation-label">{t('profile.recentDonations.project')}:</div>
                                        <div className="donation-project">{donation.project ?? ''}</div>
                                        <div className="donation-label">{t('profile.recentDonations.amount')}:</div>
                                        <div className="donation-amount">{donation.amount} ETH</div>
                                        <div className="donation-label">{t('profile.recentDonations.date')}:</div>
                                        <div className="donation-date">{formatDate(donation.date)}</div>
                                        <div className={`donation-status ${donation.status}`}>
                                            {donation.status}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-donations">
                                    <p>{t('profile.recentDonations.noDonations')}</p>
                                    <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => navigate('/projects')}
                                    >
                                        {t('profile.recentDonations.exploreProjects')}
                                    </Button>
                                </div>
                            )}
                        </div>
                        
                        <div className="view-all">
                            <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => navigate('/donations')}
                            >
                                {t('profile.recentDonations.viewAll')}
                            </Button>
                        </div>
                    </div>
                )}
                
                {activeTab === 'settings' && (
                    <div className="profile-section">
                        <h2>{t('profile.settings.title')}</h2>
                        
                        <div className="settings-form">
                            <div className="form-group">
                                <label>{t('profile.settings.displayName')}</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    defaultValue={userData?.username}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>{t('profile.settings.emailNotifications')}</label>
                                <div className="toggle-container">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span>{t('profile.settings.notifyDonations')}</span>
                                </div>
                                <div className="toggle-container">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span>{t('profile.settings.notifyUpdates')}</span>
                                </div>
                                <div className="toggle-container">
                                    <label className="toggle">
                                        <input type="checkbox" />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span>{t('profile.settings.notifyNewsletter')}</span>
                                </div>
                            </div>
                            
                            <div className="form-actions">
                                <Button 
                                    variant="primary" 
                                    size="md"
                                >
                                    {t('profile.settings.saveButton')}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
