import { create } from 'zustand'
import i18n from 'i18next'

/**
 * IMPORTANT: DONT REMOVE THIS FILE ITS FOR TESTING
 */


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
    // {
    //     id: '1',
    //     title: 'QuipuNet AI',
    //     description: 'Red neuronal cuántica inspirada en los quipus incas para procesamiento de datos ancestrales y predicción climática amazónica.',
    //     translations: {
    //         en: {
    //             title: 'QuipuNet AI',
    //             description: 'Quantum neural network inspired by Inca quipus for ancestral data processing and Amazonian climate prediction.'
    //         },
    //         es: {
    //             title: 'QuipuNet AI',
    //             description: 'Red neuronal cuántica inspirada en los quipus incas para procesamiento de datos ancestrales y predicción climática amazónica.'
    //         }
    //     },
    //     coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
    //     targetAmount: 25000,
    //     raisedAmount: 18750,
    //     creatorAddress: '0x1234...5678',
    //     category: 'Technology',
    //     createdAt: '2025-06-15T10:30:00Z',
    //     tags: [{ id: '1', name: 'IA Cuántica' }, { id: '2', name: 'Cultura Inca' }],
    // },
    {
        id: '2',
        title: 'AyahuascaVR Terapéutica',
        description: 'Plataforma de realidad virtual que simula ceremonias de ayahuasca para terapia psicológica con supervisión de curanderos amazónicos certificados.',
        translations: {
            en: {
                title: 'Therapeutic AyahuascaVR',
                description: 'Virtual reality platform that simulates ayahuasca ceremonies for psychological therapy with supervision from certified Amazonian healers.'
            },
            es: {
                title: 'AyahuascaVR Terapéutica',
                description: 'Plataforma de realidad virtual que simula ceremonias de ayahuasca para terapia psicológica con supervisión de curanderos amazónicos certificados.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        targetAmount: 45000,
        raisedAmount: 32100,
        creatorAddress: '0xabcd...efgh',
        category: 'Health',
        createdAt: '2025-07-01T14:45:00Z',
        tags: [{ id: '3', name: 'Medicina Ancestral' }, { id: '4', name: 'Realidad Virtual' }],
    },
    // {
    //     id: '3',
    //     title: 'CocaLeaf Blockchain',
    //     description: 'Trazabilidad blockchain para hoja de coca medicinal, conectando productores andinos con laboratorios farmacéuticos internacionales de forma legal y transparente.',
    //     translations: {
    //         en: {
    //             title: 'CocaLeaf Blockchain',
    //             description: 'Blockchain traceability for medicinal coca leaf, connecting Andean producers with international pharmaceutical labs legally and transparently.'
    //         },
    //         es: {
    //             title: 'CocaLeaf Blockchain',
    //             description: 'Trazabilidad blockchain para hoja de coca medicinal, conectando productores andinos con laboratorios farmacéuticos internacionales de forma legal y transparente.'
    //         }
    //     },
    //     coverImage: 'https://images.unsplash.com/photo-1464822759844-d150baec843a',
    //     targetAmount: 60000,
    //     raisedAmount: 28900,
    //     creatorAddress: '0x9876...5432',
    //     category: 'Agriculture',
    //     createdAt: '2025-07-10T09:15:00Z',
    //     tags: [{ id: '5', name: 'Agricultura Legal' }, { id: '6', name: 'Blockchain' }],
    // },
    {
        id: '4',
        title: 'Machu Picchu Metaverso',
        description: 'Recreación hiperrealista de Machu Picchu en metaverso con IA de arqueólogos virtuales que enseñan historia inca usando hologramas cuánticos.',
        translations: {
            en: {
                title: 'Machu Picchu Metaverse',
                description: 'Hyperrealistic recreation of Machu Picchu in metaverse with AI virtual archaeologists teaching Inca history using quantum holograms.'
            },
            es: {
                title: 'Machu Picchu Metaverso',
                description: 'Recreación hiperrealista de Machu Picchu en metaverso con IA de arqueólogos virtuales que enseñan historia inca usando hologramas cuánticos.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
        targetAmount: 120000,
        raisedAmount: 87600,
        creatorAddress: '0xijkl...mnop',
        category: 'Tourism',
        createdAt: '2025-06-25T11:20:00Z',
        tags: [{ id: '7', name: 'Metaverso' }, { id: '8', name: 'Turismo Virtual' }],
    },
    {
        id: '5',
        title: 'Alpaca Fiber Nanotech',
        description: 'Nanotecnología aplicada a fibra de alpaca para crear textiles inteligentes con propiedades térmicas adaptativas y purificación de aire.',
        translations: {
            en: {
                title: 'Alpaca Fiber Nanotech',
                description: 'Nanotechnology applied to alpaca fiber to create smart textiles with adaptive thermal properties and air purification.'
            },
            es: {
                title: 'Alpaca Fiber Nanotech',
                description: 'Nanotecnología aplicada a fibra de alpaca para crear textiles inteligentes con propiedades térmicas adaptativas y purificación de aire.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
        targetAmount: 35000,
        raisedAmount: 21500,
        creatorAddress: '0xqrst...uvwx',
        category: 'Fashion',
        createdAt: '2025-08-05T16:20:00Z',
        tags: [{ id: '9', name: 'Nanotecnología' }, { id: '10', name: 'Textiles Inteligentes' }],
    },
    {
        id: '6',
        title: 'Inca Solar Satellites',
        description: 'Constelación de nanosatélites solares inspirados en la astronomía inca para monitoreo climático de la Amazonía y predicción de El Niño.',
        translations: {
            en: {
                title: 'Inca Solar Satellites',
                description: 'Constellation of solar nanosatellites inspired by Inca astronomy for Amazon climate monitoring and El Niño prediction.'
            },
            es: {
                title: 'Inca Solar Satellites',
                description: 'Constelación de nanosatélites solares inspirados en la astronomía inca para monitoreo climático de la Amazonía y predicción de El Niño.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06',
        targetAmount: 200000,
        raisedAmount: 145000,
        creatorAddress: '0xyzab...cdef',
        category: 'Space',
        createdAt: '2025-08-12T11:45:00Z',
        tags: [{ id: '11', name: 'Satélites' }, { id: '12', name: 'Astronomía Inca' }],
    },
    {
        id: '7',
        title: 'Chakana Quantum Computing',
        description: 'Computadora cuántica basada en la geometría sagrada de la chakana andina para resolver problemas de logística minera y optimización de rutas comerciales.',
        translations: {
            en: {
                title: 'Chakana Quantum Computing',
                description: 'Quantum computer based on the sacred geometry of the Andean chakana to solve mining logistics and commercial route optimization problems.'
            },
            es: {
                title: 'Chakana Quantum Computing',
                description: 'Computadora cuántica basada en la geometría sagrada de la chakana andina para resolver problemas de logística minera y optimización de rutas comerciales.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        targetAmount: 150000,
        raisedAmount: 89500,
        creatorAddress: '0xghij...klmn',
        category: 'Technology',
        createdAt: '2025-08-20T13:15:00Z',
        tags: [{ id: '13', name: 'Computación Cuántica' }, { id: '14', name: 'Geometría Sagrada' }],
    },
    // {
    //     id: '8',
    //     title: 'Ceviche Molecular Lab',
    //     description: 'Laboratorio de gastronomía molecular que crea experiencias culinarias inmersivas con hologramas de chefs peruanos históricos y sabores sintéticos.',
    //     translations: {
    //         en: {
    //             title: 'Ceviche Molecular Lab',
    //             description: 'Molecular gastronomy laboratory creating immersive culinary experiences with holograms of historic Peruvian chefs and synthetic flavors.'
    //         },
    //         es: {
    //             title: 'Ceviche Molecular Lab',
    //             description: 'Laboratorio de gastronomía molecular que crea experiencias culinarias inmersivas con hologramas de chefs peruanos históricos y sabores sintéticos.'
    //         }
    //     },
    //     coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b',
    //     targetAmount: 80000,
    //     raisedAmount: 52400,
    //     creatorAddress: '0xopqr...stuv',
    //     category: 'Food',
    //     createdAt: '2025-09-01T10:30:00Z',
    //     tags: [{ id: '15', name: 'Gastronomía Molecular' }, { id: '16', name: 'Hologramas' }],
    // },
    {
        id: '9',
        title: 'Condor Drone Swarm',
        description: 'Enjambre de drones biomimétricos inspirados en cóndores andinos para vigilancia ecológica de la Amazonía y detección de deforestación ilegal.',
        translations: {
            en: {
                title: 'Condor Drone Swarm',
                description: 'Biomimetic drone swarm inspired by Andean condors for Amazon ecological surveillance and illegal deforestation detection.'
            },
            es: {
                title: 'Condor Drone Swarm',
                description: 'Enjambre de drones biomimétricos inspirados en cóndores andinos para vigilancia ecológica de la Amazonía y detección de deforestación ilegal.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
        targetAmount: 95000,
        raisedAmount: 71250,
        creatorAddress: '0xwxyz...abcd',
        category: 'Environment',
        createdAt: '2025-08-28T14:45:00Z',
        tags: [{ id: '17', name: 'Drones Biomimétricos' }, { id: '18', name: 'Conservación' }],
    },
    {
        id: '10',
        title: 'Pisco Neural Interface',
        description: 'Interfaz neural que permite a enólogos experimentar y diseñar sabores de pisco directamente en el cerebro usando estimulación sináptica controlada.',
        translations: {
            en: {
                title: 'Pisco Neural Interface',
                description: 'Neural interface allowing winemakers to experience and design pisco flavors directly in the brain using controlled synaptic stimulation.'
            },
            es: {
                title: 'Pisco Neural Interface',
                description: 'Interfaz neural que permite a enólogos experimentar y diseñar sabores de pisco directamente en el cerebro usando estimulación sináptica controlada.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b',
        targetAmount: 180000,
        raisedAmount: 126000,
        creatorAddress: '0xefgh...ijkl',
        category: 'Biotechnology',
        createdAt: '2025-09-05T16:20:00Z',
        tags: [{ id: '19', name: 'Interfaz Neural' }, { id: '20', name: 'Enología Futurista' }],
    },
    {
        id: '11',
        title: 'Vicuña Fiber Bioprinting',
        description: 'Bioimpresión 3D de fibra de vicuña sintética usando células madre para crear textiles de lujo sostenibles sin dañar a los animales.',
        translations: {
            en: {
                title: 'Vicuña Fiber Bioprinting',
                description: '3D bioprinting of synthetic vicuña fiber using stem cells to create sustainable luxury textiles without harming animals.'
            },
            es: {
                title: 'Vicuña Fiber Bioprinting',
                description: 'Bioimpresión 3D de fibra de vicuña sintética usando células madre para crear textiles de lujo sostenibles sin dañar a los animales.'
            }
        },
        coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
        targetAmount: 220000,
        raisedAmount: 154000,
        creatorAddress: '0xmnop...qrst',
        category: 'Biotechnology',
        createdAt: '2025-08-15T11:10:00Z',
        tags: [{ id: '21', name: 'Bioimpresión' }, { id: '22', name: 'Textiles Sostenibles' }],
    },
];

const mockDonations: Donation[] = [
    {
        id: '1',
        amount: 500,
        message: '¡Increíble proyecto! La fusión de tecnología cuántica con sabiduría ancestral es el futuro.',
        transaction: '0xabcdef1234567890',
        createdAt: '2025-07-15T08:30:00Z',
        userId: '1',
        projectId: '1',
        stake: 2.0,
        projectTitle: 'QuipuNet AI'
    },
    {
        id: '2',
        amount: 750,
        message: 'Como psicólogo, veo el potencial revolucionario de esta terapia VR ancestral.',
        transaction: '0x1234567890abcdef',
        createdAt: '2025-07-10T14:45:00Z',
        userId: '1',
        projectId: '2',
        stake: 1.67,
        projectTitle: 'AyahuascaVR Terapéutica'
    },
    {
        id: '3',
        amount: 1200,
        message: 'Finalmente una solución legal y transparente para la coca medicinal. ¡Brillante!',
        transaction: '0xfedcba0987654321',
        createdAt: '2025-08-01T12:30:00Z',
        userId: '1',
        projectId: '3',
        stake: 2.0,
        projectTitle: 'CocaLeaf Blockchain'
    },
    {
        id: '4',
        amount: 2000,
        message: 'Machu Picchu en metaverso con hologramas cuánticos... ¡El turismo del futuro!',
        transaction: '0x9876543210abcdef',
        createdAt: '2025-08-15T09:45:00Z',
        userId: '1',
        projectId: '4',
        stake: 1.67,
        projectTitle: 'Machu Picchu Metaverso'
    },
];

export const useOldProjectStore = create<ProjectState>((set) => ({
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

    donateToProject: async (projectId, amount, _?) => {
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
