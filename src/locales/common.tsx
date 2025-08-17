const common = {
    es: {
        // General
        days: "días",
        
        // Language
        language: {
            english: "Inglés",
            spanish: "Español",
            english_short: "EN",
            spanish_short: "ES",
            toggle_tooltip: "Cambiar idioma",
            toggle_aria: "Botón para cambiar entre inglés y español"
        },

        // Navigation
        nav_home: "Inicio",
        nav_projects: "Proyectos",
        nav_donations: "Mis Donaciones",
        nav_create_project: "Crear Proyecto",
        nav_profile: "Perfil",
        nav_login: "Iniciar Sesión",

        // Footer
        footer_tagline: "Financiando la innovación con tecnología blockchain",
        footer_navigation: "Navegación",
        footer_community: "Comunidad",
        footer_rights: "Todos los derechos reservados",
        footer_made_with: "Hecho con",
        footer_in: "en",
        footer_location: "Lima, Perú",

        // Wallet
        wallet_connect: "Conectar Billetera",
        wallet_connected: "Conectado",
        wallet_connecting: "Conectando...",
        
        // Home Page
        home_hero_title: "Financiamos la innovación con tecnología blockchain",
        home_hero_subtitle: "Contribuye a iniciativas globales y sigue el impacto de tus donaciones en tiempo real con tecnología blockchain.",
        home_get_started: "Comenzar",
        home_learn_more: "Saber Más",
        home_stats_title: "Estadísticas de la Plataforma",
        home_stats_projects: "Proyectos",
        home_stats_donors: "Donantes",
        home_stats_funds: "Fondos Recaudados",
        home_features_title: "Características de la Plataforma",
        home_feature_transparency: "Transparencia Total",
        home_feature_security: "Seguridad Avanzada",
        home_feature_rewards: "Recompensas por Staking",
        home_feature_impact: "Seguimiento de Impacto",
        home_feature_transparency_desc: "Todas las donaciones son completamente rastreables en la blockchain, asegurando que los fondos lleguen a su destino.",
        home_feature_security_desc: "Los contratos inteligentes auditados garantizan la seguridad de los fondos y las transacciones.",
        home_feature_rewards_desc: "Gana recompensas por hacer staking de tus tokens en los proyectos que apoyas.",
        home_feature_impact_desc: "Sigue el impacto real de tus contribuciones con reportes verificados en la cadena.",
        home_featured_projects: "Proyectos Destacados",
        home_view_all: "Ver Todos",
        home_view_project: "Ver Proyecto",
        home_search_projects: "Buscar proyectos...",
        home_all_categories: "Todas las Categorías",
        home_cta_title: "¿Listo para Hacer un Impacto?",
        home_cta_text: "Únete a nuestra comunidad de donantes y comienza a apoyar proyectos significativos hoy.",
        home_cta_button: "Explorar Proyectos",
        
        // Common
        common_cancel: "Cancelar",
        common_days: "días",
        common_loading: "Cargando...",
        common_error: "Error",
        common_success: "Éxito",
        common_save: "Guardar",
        common_edit: "Editar",
        common_delete: "Eliminar",
        common_search: "Buscar",
        common_filter: "Filtrar",
        common_noResults: "Sin resultados",
        common_required: "Requerido",
        common_optional: "Opcional",
        common_back: "Volver",
        common_next: "Siguiente",
        common_previous: "Anterior",
        common_buttons: {
            back: "Volver",
            backToHome: "Volver a Inicio"
        },
        status_approved: "Aprobado",
        status_rejected: "Rechazado",
        status_pending: "Pendiente",
        status_active: "Activo",
        status_completed: "Completado",
        status_inReview: "En revisión",
        status_processing: "Procesando",

        auth_required_title: "Autenticación Requerida",
        auth_required_message: "Necesitas conectar tu billetera o iniciar sesión para continuar.",
        auth_required_button: "Iniciar Sesión",
        
        // Create Project Page
        createProject: {
            title: "Crear Nuevo Proyecto",
            subtitle: "Comparte tu visión con la comunidad y recauda fondos utilizando criptomonedas",
            sections: {
                basicInfo: "Información Básica",
                fundingDetails: "Detalles de Financiación"
            },
            fields: {
                title: "Título del Proyecto",
                category: "Categoría",
                shortDesc: "Descripción Corta",
                fullDesc: "Descripción Completa",
                coverImage: "Imagen de Portada",
                tags: "Etiquetas del Proyecto (hasta 5)",
                fundingGoal: "Meta de Financiación (USD)",
                endDate: "Fecha de Finalización de Campaña"
            },
            placeholders: {
                title: "Ingresa un título atractivo para tu proyecto",
                category: "Selecciona una categoría",
                shortDesc: "Breve descripción (máximo 150 caracteres)",
                fullDesc: "Descripción detallada de tu proyecto, objetivos, cronograma e impacto...",
                tag: "Ingresa una etiqueta",
                fundingGoal: "Monto en USD"
            },
            buttons: {
                addTag: "Añadir Etiqueta",
                removeTag: "Eliminar",
                create: "Crear Proyecto",
                creating: "Creando Proyecto..."
            },
            categories: {
                environment: "Medio Ambiente",
                education: "Educación",
                healthcare: "Salud",
                technology: "Tecnología",
                agriculture: "Agricultura",
                energy: "Energía",
                artCulture: "Arte y Cultura",
                community: "Comunidad"
            },
        },
        
        // Projects Page
        projects: {
            title: "Explorar Proyectos",
            subtitle: "Descubre proyectos innovadores que generan un cambio positivo a través de la tecnología blockchain",
            filters: {
                all: "Todos",
                environment: "Medio Ambiente",
                education: "Educación",
                healthcare: "Salud",
                technology: "Tecnología"
            },
            sort: {
                label: "Ordenar por",
                newest: "Más Recientes",
                trending: "Tendencias",
                endingSoon: "Terminan Pronto",
                mostFunded: "Más Financiados"
            },
            backers: "patrocinadores",
            daysLeft: "días restantes",
            loadMore: "Cargar Más Proyectos"
        },
        
        // Login Page
        login_welcome: "Bienvenido a KuskaPay",
        login_back_to_home_button: "Volver a Inicio",
        login_back_to_login_button: "Volver a inicio de sesión",
        
        login_identifier_label: "Usuario",
        login_username_label: "Usuario",
        login_email_label: "Correo electrónico",
        login_password_label: "Contraseña",
        login_confirm_password_label: "Confirmar contraseña",
        login_identifier_placeholder: "Ingresa tu usuario",
        login_username_placeholder: "Ingresa tu usuario",
        login_email_placeholder: "Ingresa tu correo electrónico",
        login_password_placeholder: "Ingresa tu contraseña",
        login_confirm_password_placeholder: "Confirma tu contraseña",

        login_invalid_field: "Campo inválido",
        login_missing_fields: "Por favor completa todos los campos",
        login_general_error: "Ocurrió un error durante el inicio de sesión",
        login_success: "Inicio de sesión exitoso",

        login_submit_button: "Iniciar sesión",
        login_create_account_button: "Crear cuenta",
        login_forgot_password_button: "¿Olvidaste tu contraseña?",
        login_with_google: "Continuar con Google",

        login_forgot_password_title: "Reestablecer contraseña",
        login_new_user: "¿Nuevo en KuskaPay?",
        login_old_user: "¿Ya tienes una cuenta?",
        login_forgot_password: "¿Olvidaste tu contraseña?",
        login_reset_password: "Enivar solicitud",

        login_verify_email: "Verificar correo electrónico",
        login_verify_email_message: "Hemos enviado un link de confirmación a: {{email}}. Por favor ingrese a ese link para confirmar su correo electrónico.",
        login_verify_email_loading: "Verificando su cuenta...",
        login_verify_email_success: "Cuenta verificada exitosamente",
        login_verify_email_invalid: "El link de verificación es inválido o ha expirado",
        login_verify_email_sent: "Correo de verificación enviado",
        login_verify_resend_email: "Reenviar correo",
        
        // ProjectDetail Page
        projectDetailDonation: {
            header: {
                title: "Mis Donaciones y Participaciones",
                subtitle: "Rastrea tus contribuciones y participaciones en proyectos"
            },
            summary: {
                donationsMade: "Donaciones Realizadas",
                totalContributed: "Total Contribuido",
                projectsSupported: "Proyectos Apoyados"
            },
            projectsTable: {
                title: "Proyectos que Has Apoyado",
                columns: {
                    project: "Proyecto",
                    totalContributed: "Total Contribuido",
                    yourStake: "Tu Participación",
                    actions: "Acciones"
                },
                viewProject: "Ver Proyecto"
            },
            history: {
                title: "Historial de Donaciones",
                columns: {
                    project: "Proyecto",
                    date: "Fecha",
                    amount: "Monto",
                    transaction: "Transacción"
                }
            },
            noData: "Aún no has realizado ninguna donación"
        },
        
        // Profile Page
        profile: {
            loading: "Cargando datos del perfil...",
            memberSince: "Miembro desde",
            logout: "Cerrar Sesión",
            tabs: {
                profile: "Perfil",
                settings: "Configuración"
            },
            donationStats: {
                title: "Estadísticas de Donaciones",
                totalDonated: "Total Donado",
                activeDonations: "Donaciones Activas",
                projectsSupported: "Proyectos Apoyados"
            },
            recentDonations: {
                title: "Donaciones Recientes",
                project: "Proyecto",
                amount: "Monto",
                date: "Fecha",
                status: "Estado",
                noDonations: "Aún no has realizado ninguna donación.",
                exploreProjects: "Explorar Proyectos",
                viewAll: "Ver Todas las Donaciones"
            },
            settings: {
                title: "Configuración del Perfil",
                displayName: "Nombre de Usuario",
                emailNotifications: "Notificaciones por Email",
                notifyDonations: "Recibir notificaciones por email sobre mis donaciones",
                notifyUpdates: "Recibir actualizaciones de proyectos que he apoyado",
                notifyNewsletter: "Recibir boletín informativo y emails promocionales",
                saveButton: "Guardar Cambios"
            }
        },
        
        // NotFound Page
        notFound: {
            title: "Página No Encontrada",
            message: "La página que estás buscando no existe o ha sido eliminada.",
            backToHome: "Volver a Inicio"
        },
        
        projectDetail: {
            share: "Compartir",
            shareLinkCopied: "Enlace copiado",
            errors: {
                loginRequired: "Por favor inicia sesión para realizar una donación",
                invalidAmount: "Por favor ingresa una cantidad válida",
                processingFailed: "Error al procesar la donación. Por favor intenta de nuevo."
            },
            success: {
                donation: "¡Donación exitosa! Gracias por tu apoyo."
            },
            notFound: {
                title: "Proyecto No Encontrado",
                description: "El proyecto que buscas no existe o ha sido eliminado."
            },
            fundingProgress: "Progreso de Financiamiento",
            raised: "Recaudado",
            funded: "Financiado",
            target: "Meta",
            stats: {
                contributors: "Contribuyentes",
                daysLeft: "Días Restantes",
                funded: "Financiado"
            },
            sections: {
                about: "Sobre este Proyecto",
                roadmap: "Plan del Proyecto",
                creator: "Creador del Proyecto",
                support: "Apoyar este Proyecto"
            },
            mission: {
                title: "Nuestra Misión",
                description: "Estamos comprometidos a utilizar la tecnología blockchain para crear un ecosistema más equitativo y transparente para todos los participantes. Al apoyar este proyecto, no solo contribuyes con fondos, sino que te conviertes en un participante de nuestro futuro."
            },
            contribution: {
                title: "Cómo Ayuda tu Contribución",
                description: "Tu donación nos permite directamente construir y expandir nuestra plataforma. Cada contribución, sin importar el tamaño, nos acerca a nuestros objetivos y te proporciona una participación en el proyecto proporcional a tu donación."
            },
            roadmap: {
                title: "Cronograma del Proyecto",
                phase1: {
                    title: "Fase de Investigación",
                    time: "Q3 2025"
                },
                phase2: {
                    title: "Desarrollo",
                    time: "Q4 2025"
                },
                phase3: {
                    title: "Pruebas",
                    time: "Q1 2026"
                },
                phase4: {
                    title: "Lanzamiento Completo",
                    time: "Q1 2026"
                }
            },
            creator: {
                address: "Dirección del Creador",
                created: "Proyecto Creado"
            },
            donation: {
                amountLabel: "Cantidad de Donación (ETH)",
                messageLabel: "Mensaje (Opcional)",
                messagePlaceholder: "Deja un mensaje para el creador",
                loginRequired: "Necesitas iniciar sesión antes de donar",
                donateButton: "Donar",
                stakeInfo: {
                    prefix: "Tu donación te dará aproximadamente",
                    suffix: "participación en este proyecto."
                }
            }
        },
        
        // Donations Page
        donations: {
            header: {
                title: "My Donations & Stakes",
                subtitle: "Track your contributions and project stakes"
            },
            summary: {
                donationsMade: "Donations Made",
                totalContributed: "Total Contributed",
                projectsSupported: "Projects Supported"
            },
            projectsTable: {
                title: "Projects You've Supported",
                columns: {
                    project: "Project",
                    totalContributed: "Total Contributed",
                    yourStake: "Your Stake",
                    actions: "Actions"
                },
                viewProject: "View Project"
            },
            history: {
                title: "Donation History",
                columns: {
                    project: "Project",
                    date: "Date",
                    amount: "Amount",
                    transaction: "Transaction"
                }
            },
            noData: "You haven't made any donations yet"
        },
        
        
        
    },
    en: {
        // General
        days: "days",
        
        // Language
        language: {
            english: "English",
            spanish: "Spanish",
            english_short: "EN",
            spanish_short: "ES",
            toggle_tooltip: "Toggle language",
            toggle_aria: "Button to toggle between English and Spanish"
        },
        
        // Navigation
        nav_home: "Home",
        nav_projects: "Projects",
        nav_donations: "My Donations",
        nav_create_project: "Create Project",
        nav_profile: "Profile",
        nav_login: "Login",

        // Footer
        footer_tagline: "Funding innovation with blockchain technology",
        footer_navigation: "Navigation",
        footer_community: "Comunity",
        footer_rights: "All rights reserved",
        footer_made_with: "Made with",
        footer_in: "in",
        footer_location: "Lima, Perú",

        // Wallet
        wallet_connect: "Connect Wallet",
        wallet_connected: "Connected",
        wallet_connecting: "Connecting...",
        
        // Home Page
        home_hero_title: "Blockchain Funding for Meaningful Projects",
        home_hero_subtitle: "Contribute to global initiatives and track the impact of your donations in real-time with blockchain technology.",
        home_get_started: "Get Started",
        home_learn_more: "Learn More",
        home_stats_title: "Platform Statistics",
        home_stats_projects: "Projects",
        home_stats_donors: "Donors",
        home_stats_funds: "Funds Raised",
        home_features_title: "Platform Features",
        home_feature_transparency: "Full Transparency",
        home_feature_security: "Advanced Security",
        home_feature_rewards: "Staking Rewards",
        home_feature_impact: "Impact Tracking",
        home_feature_transparency_desc: "All donations are fully traceable on the blockchain, ensuring funds reach their intended destination.",
        home_feature_security_desc: "Audited smart contracts ensure the security of funds and transactions.",
        home_feature_rewards_desc: "Earn rewards by staking your tokens on the projects you support.",
        home_feature_impact_desc: "Track the real-world impact of your contributions with on-chain verified reporting.",
        home_featured_projects: "Featured Projects",
        home_view_all: "View All",
        home_view_project: "View Project",
        home_search_projects: "Search projects...",
        home_all_categories: "All Categories",
        home_cta_title: "Ready to Make an Impact?",
        home_cta_text: "Join our community of donors and start supporting meaningful projects today.",
        home_cta_button: "Explore Projects",

        // Common
        common_cancel: "Cancel",
        common_days: "days",
        common_loading: "Loading...",
        common_error: "Error",
        common_success: "Success",
        common_save: "Save",
        common_edit: "Edit",
        common_delete: "Delete",
        common_search: "Search",
        common_filter: "Filter",
        common_noResults: "No results",
        common_required: "Required",
        common_optional: "Optional",
        common_back: "Back",
        common_next: "Next",
        common_previous: "Previous",
        common_buttons: {
            back: "Back",
            backToHome: "Back to Home"
        },
        
        // NotFound Page
        notFound: {
            title: "Page Not Found",
            message: "The page you're looking for doesn't exist or has been removed.",
            backToHome: "Back to Home"
        },
        status_approved: "Approved",
        status_rejected: "Rejected",
        status_pending: "Pending",
        status_active: "Active",
        status_completed: "Completed",
        status_inReview: "In review",
        status_processing: "Processing",
        
        // Create Project Page
        createProject: {
            title: "Create New Project",
            subtitle: "Share your vision with the community and raise funds using cryptocurrency",
            sections: {
                basicInfo: "Basic Information",
                fundingDetails: "Funding Details"
            },
            fields: {
                title: "Project Title",
                category: "Category",
                shortDesc: "Short Description",
                fullDesc: "Full Description",
                coverImage: "Cover Image",
                tags: "Project Tags (up to 5)",
                fundingGoal: "Funding Goal (USD)",
                endDate: "Campaign End Date"
            },
            placeholders: {
                title: "Enter a catchy title for your project",
                category: "Select a category",
                shortDesc: "Brief description (150 characters max)",
                fullDesc: "Detailed description of your project, goals, timeline, and impact...",
                tag: "Enter a tag",
                fundingGoal: "Amount in USD"
            },
            buttons: {
                addTag: "Add Tag",
                removeTag: "Remove",
                create: "Create Project",
                creating: "Creating Project..."
            },
            categories: {
                environment: "Environment",
                education: "Education",
                healthcare: "Healthcare",
                technology: "Technology",
                agriculture: "Agriculture",
                energy: "Energy",
                artCulture: "Art & Culture",
                community: "Community"
            },
        },
        
        // Projects Page
        projects: {
            title: "Explore Projects",
            subtitle: "Discover innovative projects making positive change through blockchain technology",
            filters: {
                all: "All",
                environment: "Environment",
                education: "Education",
                healthcare: "Healthcare",
                technology: "Technology"
            },
            sort: {
                label: "Sort by",
                newest: "Newest",
                trending: "Trending",
                endingSoon: "Ending Soon",
                mostFunded: "Most Funded"
            },
            backers: "backers",
            daysLeft: "days left",
            loadMore: "Load More Projects"
        },
        
        // Login Page
        login_welcome: "Bienvenido a KuskaPay",
        login_back_to_home_button: "Volver a Inicio",
        login_back_to_login_button: "Volver a inicio de sesión",
        
        login_identifier_label: "Usuario",
        login_username_label: "Usuario",
        login_email_label: "Correo electrónico",
        login_password_label: "Contraseña",
        login_confirm_password_label: "Confirmar contraseña",
        login_identifier_placeholder: "Ingresa tu usuario",
        login_username_placeholder: "Ingresa tu usuario",
        login_email_placeholder: "Ingresa tu correo electrónico",
        login_password_placeholder: "Ingresa tu contraseña",
        login_confirm_password_placeholder: "Confirma tu contraseña",

        login_invalid_field: "Campo inválido",
        login_missing_fields: "Por favor completa todos los campos",
        login_general_error: "Ocurrió un error durante el inicio de sesión",
        login_success: "Inicio de sesión exitoso",

        login_submit_button: "Iniciar sesión",
        login_create_account_button: "Crear cuenta",
        login_forgot_password_button: "¿Olvidaste tu contraseña?",
        login_with_google: "Continuar con Google",

        login_forgot_password_title: "Reestablecer contraseña",
        login_new_user: "¿Nuevo en KuskaPay?",
        login_old_user: "¿Ya tienes una cuenta?",
        login_forgot_password: "¿Olvidaste tu contraseña?",
        login_reset_password: "Enivar solicitud",

        login_verify_email: "Verificar correo electrónico",
        login_verify_email_message: "Hemos enviado un link de confirmación a: {{email}}. Por favor ingrese a ese link para confirmar su correo electrónico.",
        login_verify_email_loading: "Verificando su cuenta...",
        login_verify_email_success: "Cuenta verificada exitosamente",
        login_verify_email_invalid: "El link de verificación es inválido o ha expirado",
        login_verify_email_sent: "Correo de verificación enviado",
        login_verify_resend_email: "Reenviar correo",

        

        // Profile Page
        profile: {
            loading: "Loading profile data...",
            memberSince: "Member since",
            logout: "Logout",
            tabs: {
                profile: "Profile",
                settings: "Settings"
            },
            donationStats: {
                title: "Donation Stats",
                totalDonated: "Total Donated",
                activeDonations: "Active Donations",
                projectsSupported: "Projects Supported"
            },
            recentDonations: {
                title: "Recent Donations",
                project: "Project",
                amount: "Amount",
                date: "Date",
                status: "Status",
                noDonations: "You haven't made any donations yet.",
                exploreProjects: "Explore Projects",
                viewAll: "View All Donations"
            },
            settings: {
                title: "Profile Settings",
                displayName: "Display Name",
                emailNotifications: "Email Notifications",
                notifyDonations: "Receive email notifications about my donations",
                notifyUpdates: "Receive updates from projects I've supported",
                notifyNewsletter: "Receive newsletter and promotional emails",
                saveButton: "Save Changes"
            }
        },
        
        // ProjectDetail Page
        projectDetail: {
            errors: {
                loginRequired: "Please log in to make a donation",
                invalidAmount: "Please enter a valid donation amount",
                processingFailed: "Failed to process donation. Please try again."
            },
            success: {
                donation: "Donation successful! Thank you for your support."
            },
            notFound: {
                title: "Project Not Found",
                description: "The project you're looking for doesn't exist or has been removed."
            },
            fundingProgress: "Funding Progress",
            raised: "Raised",
            funded: "Funded",
            target: "Target",
            stats: {
                contributors: "Contributors",
                daysLeft: "Days Left",
                funded: "Funded"
            },
            sections: {
                about: "About This Project",
                roadmap: "Project Roadmap",
                creator: "Project Creator",
                support: "Support This Project"
            },
            mission: {
                title: "Our Mission",
                description: "We're committed to leveraging blockchain technology to create a more equitable and transparent ecosystem for all stakeholders. By supporting this project, you're not just contributing funds - you're becoming a stakeholder in our future."
            },
            contribution: {
                title: "How Your Contribution Helps",
                description: "Your donation directly enables us to build and expand our platform. Every contribution, regardless of size, brings us closer to our goals and provides you with a stake in the project proportional to your donation."
            },
            roadmap: {
                title: "Project Timeline",
                phase1: {
                    title: "Research Phase",
                    time: "Q3 2025"
                },
                phase2: {
                    title: "Development",
                    time: "Q4 2025"
                },
                phase3: {
                    title: "Testing",
                    time: "Q1 2026"
                },
                phase4: {
                    title: "Full Launch",
                    time: "Q1 2026"
                }
            },
            creator: {
                address: "Creator Address",
                created: "Project Created"
            },
            donation: {
                amountLabel: "Donation Amount (ETH)",
                messageLabel: "Message (Optional)",
                messagePlaceholder: "Leave a message for the creator",
                loginRequired: "You'll need to sign in before donating",
                donateButton: "Donate",
                stakeInfo: {
                    prefix: "Your donation will give you approximately",
                    suffix: "stake in this project."
                }
            }
        },
    }
}

export default common