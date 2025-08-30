import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button/Button'
import Card from '@/components/common/Card/Card'
import CardTitle from '@/components/common/Card/CardTitle'
import Spinner from '@/components/common/Spinner/Spinner'
import AuthRequired from '@/components/common/AuthRequired'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableColumn } from '@/components/common/Table'

import useAuthStore from '@/stores/AuthStore'
import { useOldProjectStore } from '@/stores/OldProjectStore'

import './Donations.css'
import '../../animations.css'

const Donations = () => {
    const navigate = useNavigate()
    const { isLogged } = useAuthStore()
    // Create dummy user from localStorage as temporary solution
    const user = isLogged ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const { userDonations, isLoading, fetchUserDonations } = useOldProjectStore()
    const { t, i18n } = useTranslation('common')
    
    useEffect(() => {
        if (isLogged && user) {
            fetchUserDonations(user.id)
        }
    }, [isLogged, user, fetchUserDonations])
    
    // Redirect to login if not authenticated
    if (!isLogged) {
        return <AuthRequired/>
    }
    
    // Show loading state
    if (isLoading) {
        return (
            <div className="donations-container">
                <div className="loading-container">
                    <Spinner variant="primary" />
                </div>
            </div>
        )
    }
    
    // Group donations by project
    const donationsByProject: { [key: string]: { 
        projectId: string, 
        projectTitle: string | undefined,
        totalAmount: number,
        totalStake: number,
        donations: typeof userDonations
    } } = {}
    
    userDonations.forEach(donation => {
        if (!donationsByProject[donation.projectId]) {
            donationsByProject[donation.projectId] = {
                projectId: donation.projectId,
                projectTitle: donation.projectTitle,
                totalAmount: 0,
                totalStake: 0,
                donations: []
            }
        }
        
        donationsByProject[donation.projectId].totalAmount += donation.amount
        donationsByProject[donation.projectId].totalStake += donation.stake
        donationsByProject[donation.projectId].donations.push(donation)
    })
    
    const projectSummaries = Object.values(donationsByProject)
    
    return (
        <div className="donations-container">
            <div className="donations-header animated-gradient-background">
                <div className="donations-header-content">
                    <h1>{t('donations.header.title')}</h1>
                    <p>{t('donations.header.subtitle')}</p>
                </div>
            </div>
            
            <div className="donation-summary">
                <div className="summary-card">
                    <div className="summary-value">{userDonations.length}</div>
                    <div className="summary-label">{t('donations.summary.donationsMade')}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-value">
                        {userDonations.reduce((sum, donation) => sum + donation.amount, 0).toLocaleString()} ETH
                    </div>
                    <div className="summary-label">{t('donations.summary.totalContributed')}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-value">{projectSummaries.length}</div>
                    <div className="summary-label">{t('donations.summary.projectsSupported')}</div>
                </div>
            </div>
            
            <div className="donations-content">
                {projectSummaries.length === 0 ? (
                    <Card>
                        <div className="no-donations">
                            <h2>No Donations Yet</h2>
                            <p>You haven't made any donations yet. Start supporting projects you believe in!</p>
                            <Button 
                                variant="primary" 
                                onClick={() => navigate('/home')}
                            >
                                Explore Projects
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <>
                        {/* Projects Summary */}
                        <Card>
                            <CardTitle>{t('donations.projectsTable.title')}</CardTitle>
                            <Table>
                                <TableHeader>
                                    <TableColumn>{t('donations.projectsTable.columns.project')}</TableColumn>
                                    <TableColumn>{t('donations.projectsTable.columns.totalContributed')}</TableColumn>
                                    <TableColumn>{t('donations.projectsTable.columns.yourStake')}</TableColumn>
                                    <TableColumn>{t('donations.projectsTable.columns.actions')}</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {projectSummaries.map(summary => (
                                        <TableRow key={summary.projectId}>
                                            <TableCell>{summary.projectTitle}</TableCell>
                                            <TableCell>{summary.totalAmount.toLocaleString()} ETH</TableCell>
                                            <TableCell>{summary.totalStake.toFixed(2)}%</TableCell>
                                            <TableCell>
                                                <Button 
                                                    variant="info" 
                                                    size="sm"
                                                    onClick={() => navigate(`/project/${summary.projectId}`)}
                                                >
                                                    {t('donations.projectsTable.viewProject')}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                        
                        {/* Detailed Donation History */}
                        <Card>
                            <CardTitle>{t('donations.history.title')}</CardTitle>
                            <Table>
                                <TableHeader>
                                    <TableColumn>{t('donations.history.columns.project')}</TableColumn>
                                    <TableColumn>{t('donations.history.columns.date')}</TableColumn>
                                    <TableColumn>{t('donations.history.columns.amount')}</TableColumn>
                                    <TableColumn>{t('donations.history.columns.transaction')}</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {userDonations.map(donation => (
                                        <TableRow key={donation.id}>
                                            <TableCell>{donation.projectTitle}</TableCell>
                                            <TableCell>
                                                {new Date(donation.createdAt).toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>{donation.amount.toLocaleString()} ETH</TableCell>
                                            <TableCell>
                                                <span className="transaction-hash" title={donation.transaction}>
                                                    {donation.transaction.substring(0, 8)}...{donation.transaction.substring(donation.transaction.length - 8)}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </>
                )}
            </div>
        </div>
    )
}

export default Donations
