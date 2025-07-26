import { create } from 'zustand'
import i18n from 'i18next'

export interface Tag {
    id: string;
    name: string;
}

export interface ProjectTranslations {
    en: {
        title: string;
        description: string;
    };
    es: {
        title: string;
        description: string;
    };
}

export interface Project {
    id: string;
    title: string; // Default title (will be overridden by i18n)
    description: string; // Default description (will be overridden by i18n)
    translations: ProjectTranslations;
    coverImage: string;
    targetAmount: number;
    raisedAmount: number;
    creatorAddress: string;
    category: string;
    createdAt: string;
    tags: Tag[];
}

export interface Donation {
    id: string;
    amount: number;
    message: string | null;
    transaction: string;
    createdAt: string;
    userId: string;
    projectId: string;
    stake: number; // Percentage stake in the project
    projectTitle?: string; // For display purposes
}

interface ProjectState {
    projects: Project[];
    featuredProjects: Project[];
    userDonations: Donation[];
    isLoading: boolean;
    fetchProjects: () => void;
    fetchFeaturedProjects: () => void;
    fetchUserDonations: (userId: string) => void;
    donateToProject: (projectId: string, amount: number, message?: string) => Promise<boolean>;
}

// Mock data for MVP
const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Decentralized Education Platform',
        description: 'Creating a platform where education is accessible to everyone through blockchain technology.',
        translations: {
            en: {
                title: 'Decentralized Education Platform',
                description: 'Creating a platform where education is accessible to everyone through blockchain technology.'
            },
            es: {
                title: 'Plataforma Educativa Descentralizada',
                description: 'Creando una plataforma donde la educación es accesible para todos a través de la tecnología blockchain.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        targetAmount: 10000,
        raisedAmount: 6540,
        creatorAddress: '0x1234...5678',
        category: 'Education',
        createdAt: '2025-06-15T10:30:00Z',
        tags: [{ id: '1', name: 'Education' }, { id: '2', name: 'Blockchain' }],
    },
    {
        id: '2',
        title: 'Clean Ocean Initiative',
        description: 'Leveraging blockchain to fund ocean cleanup operations worldwide.',
        translations: {
            en: {
                title: 'Clean Ocean Initiative',
                description: 'Leveraging blockchain to fund ocean cleanup operations worldwide.'
            },
            es: {
                title: 'Iniciativa Océano Limpio',
                description: 'Utilizando blockchain para financiar operaciones de limpieza oceánica en todo el mundo.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9',
        targetAmount: 15000,
        raisedAmount: 9800,
        creatorAddress: '0xabcd...efgh',
        category: 'Environment',
        createdAt: '2025-07-01T14:45:00Z',
        tags: [{ id: '3', name: 'Environment' }, { id: '4', name: 'Climate' }],
    },
    {
        id: '3',
        title: 'Decentralized Art Gallery',
        description: 'Supporting artists through a decentralized exhibition platform.',
        translations: {
            en: {
                title: 'Decentralized Art Gallery',
                description: 'Supporting artists through a decentralized exhibition platform.'
            },
            es: {
                title: 'Galería de Arte Descentralizada',
                description: 'Apoyando a artistas a través de una plataforma de exposición descentralizada.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
        targetAmount: 5000,
        raisedAmount: 2300,
        creatorAddress: '0x9876...5432',
        category: 'Art',
        createdAt: '2025-07-10T09:15:00Z',
        tags: [{ id: '5', name: 'Art' }, { id: '6', name: 'NFT' }],
    },
    {
        id: '4',
        title: 'Web3 Developer Scholarship',
        description: 'Funding scholarships for aspiring Web3 developers from underrepresented communities.',
        translations: {
            en: {
                title: 'Web3 Developer Scholarship',
                description: 'Funding scholarships for aspiring Web3 developers from underrepresented communities.'
            },
            es: {
                title: 'Becas para Desarrolladores Web3',
                description: 'Financiando becas para aspirantes a desarrolladores Web3 de comunidades poco representadas.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        targetAmount: 8000,
        raisedAmount: 3200,
        creatorAddress: '0xijkl...mnop',
        category: 'Education',
        createdAt: '2025-06-25T11:20:00Z',
        tags: [{ id: '7', name: 'Education' }, { id: '8', name: 'Web3' }],
    },
];

const mockDonations: Donation[] = [
    {
        id: '1',
        amount: 250,
        message: 'Keep up the great work!',
        transaction: '0xabcdef1234567890',
        createdAt: '2025-07-15T08:30:00Z',
        userId: '1',
        projectId: '1',
        stake: 3.82,
        projectTitle: 'Decentralized Education Platform' // This will be overridden based on language
    },
    {
        id: '2',
        amount: 100,
        message: 'Love this initiative',
        transaction: '0x1234567890abcdef',
        createdAt: '2025-07-10T14:45:00Z',
        userId: '1',
        projectId: '2',
        stake: 1.02,
        projectTitle: 'Clean Ocean Initiative' // This will be overridden based on language
    },
];

export const useProjectStore = create<ProjectState>((set) => ({
    projects: [],
    featuredProjects: [],
    userDonations: [],
    isLoading: false,

    fetchProjects: () => {
        set({ isLoading: true });
        
        // This would be replaced with actual API call
        setTimeout(() => {
            // Apply translations based on current language
            const currentLanguage = i18n?.language || 'en';
            const translatedProjects = mockProjects.map(project => ({
                ...project,
                title: project.translations[currentLanguage as keyof ProjectTranslations]?.title || project.title,
                description: project.translations[currentLanguage as keyof ProjectTranslations]?.description || project.description,
            }));

            set({ 
                projects: translatedProjects,
                isLoading: false
            });
        }, 500);
    },

    fetchFeaturedProjects: () => {
        set({ isLoading: true });
        
        // This would be replaced with actual API call
        setTimeout(() => {
            // Apply translations based on current language
            const currentLanguage = i18n?.language || 'en';
            const translatedProjects = mockProjects.slice(0, 3).map(project => ({
                ...project,
                title: project.translations[currentLanguage as keyof ProjectTranslations]?.title || project.title,
                description: project.translations[currentLanguage as keyof ProjectTranslations]?.description || project.description,
            }));

            set({ 
                featuredProjects: translatedProjects,
                isLoading: false
            });
        }, 500);
    },

    fetchUserDonations: (userId) => {
        set({ isLoading: true });
        
        // This would be replaced with actual API call
        setTimeout(() => {
            const currentLanguage = i18n?.language || 'en';
            const filteredDonations = mockDonations.filter(d => d.userId === userId);
            
            // Update project titles based on the current language
            const translatedDonations = filteredDonations.map(donation => {
                const project = mockProjects.find(p => p.id === donation.projectId);
                return {
                    ...donation,
                    projectTitle: project?.translations[currentLanguage as keyof ProjectTranslations]?.title || donation.projectTitle
                };
            });

            set({ 
                userDonations: translatedDonations,
                isLoading: false
            });
        }, 500);
    },

    donateToProject: async (projectId, amount, message?) => {
        set({ isLoading: true });
        
        // This would be replaced with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => {
            const updatedProjects = state.projects.map(project => {
                if (project.id === projectId) {
                    return {
                        ...project,
                        raisedAmount: project.raisedAmount + amount
                    };
                }
                return project;
            });
            
            return {
                projects: updatedProjects,
                isLoading: false
            };
        });
        
        return true;
    }
}))
