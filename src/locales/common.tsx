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
        common_add: "Agregar",
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
            title: "Formulario de postulación",
            subtitle: "Comparte tu visión con la comunidad y recauda fondos utilizando criptomonedas",
            navigation: {
                previous: "Anterior",
                next: "Siguiente",
                stage: "Etapa",
                of: "de",
                completeRequired: "Completa todos los campos requeridos para continuar",
                creating: "Creando Proyecto...",
                createProject: "Crear Proyecto"
            },
            success: {
                title: "¡Proyecto Creado Exitosamente!",
                description: "Tu proyecto ha sido creado y está siendo revisado. Te notificaremos cuando esté listo para recibir donaciones.",
                viewProject: "Ver Mi Proyecto"
            },
            stages: {
                identity: {
                    title: "Identidad del Proyecto",
                    description: "Define la identidad básica de tu proyecto y cómo se presentará a la comunidad",
                    descriptions: {
                        logo: "Logo de tu proyecto",
                    },
                    fields: {
                        name: "Nombre del Proyecto",
                        slogan: "Eslogan",
                        executiveSummary: "Resumen Ejecutivo",
                        industry: "Industria",
                        logo: "Logo",
                        website: "Sitio Web",
                        twitter: "Twitter",
                        linkedin: "LinkedIn"
                    },
                    placeholders: {
                        name: "Ingresa el nombre de tu proyecto",
                        slogan: "Un eslogan memorable para tu proyecto",
                        executiveSummary: "Describe tu proyecto en un párrafo conciso...",
                        industry: "Selecciona la industria de tu proyecto",
                        logo: "https://ejemplo.com/logo.png",
                        website: "https://tuproyecto.com",
                        twitter: "https://twitter.com/tuproyecto",
                        linkedin: "https://linkedin.com/company/tuproyecto"
                    }
                },
                valueProposition: {
                    title: "Propuesta de Valor",
                    description: "Define claramente el problema que resuelves y tu propuesta única de valor",
                    fields: {
                        problem: "Problema que Resuelves",
                        solution: "Tu Solución",
                        uniqueValue: "Propuesta Única de Valor",
                        businessModel: "Modelo de Negocio"
                    },
                    placeholders: {
                        problem: "Describe el problema específico que tu proyecto aborda...",
                        solution: "Explica cómo tu proyecto resuelve este problema...",
                        uniqueValue: "¿Qué hace único a tu proyecto? ¿Por qué es mejor que las alternativas?",
                        businessModel: "Describe cómo tu proyecto genera valor y se sostiene económicamente..."
                    }
                },
                team: {
                    title: "El Equipo",
                    description: "Presenta a las personas clave detrás de tu proyecto",
                    addMember: "Agregar Miembro",
                    editMember: "Editar Miembro",
                    emptyState: "Aún no has agregado miembros al equipo. Agrega al menos una persona para continuar.",
                    fields: {
                        name: "Nombre Completo",
                        title: "Título Académico/Profesional",
                        country: "País",
                        photo: "Foto (URL)",
                        description: "Descripción",
                        linkedin: "LinkedIn"
                    },
                    placeholders: {
                        name: "Nombre completo del miembro",
                        title: "CEO, CTO, PhD en..., etc.",
                        country: "País de residencia",
                        photo: "https://ejemplo.com/foto.jpg",
                        description: "Experiencia y rol en el proyecto...",
                        linkedin: "https://linkedin.com/in/perfil"
                    }
                },
                financing: {
                    title: "Financiamiento",
                    description: "Define los detalles financieros de tu campaña de recaudación",
                    fields: {
                        objectiveAmount: "Monto Objetivo (USDT)",
                        financingType: "Tipo de Financiamiento",
                        fundsUsage: "Uso de Fondos",
                        productDevelopment: "Desarrollo de Producto",
                        marketingSales: "Marketing y Ventas",
                        expansionOperations: "Expansión y Operaciones",
                        operationalExpenses: "Gastos Operativos Generales",
                        campaignEnd: "Fin de Campaña"
                    },
                    placeholders: {
                        objectiveAmount: "100000",
                        financingType: "Selecciona el tipo de financiamiento"
                    },
                    help: {
                        objectiveAmount: "Monto mínimo recomendado: $1,000 USDT",
                        campaignEnd: "Selecciona cuándo terminará tu campaña de recaudación"
                    },
                    total: "Total",
                    totalError: "El total debe sumar exactamente 100%"
                },
                traction: {
                    title: "Tracción y Validación",
                    description: "Demuestra el progreso y validación de tu proyecto",
                    fields: {
                        projectStage: "Etapa del Proyecto",
                        activeUsers: "Usuarios Activos",
                        monthlyRevenue: "Ingresos Mensuales (USDT)",
                        numberOfClients: "Número de Clientes",
                        communitySize: "Tamaño de Comunidad",
                        tractionDocument: "Documento de Prueba de Tracción"
                    },
                    placeholders: {
                        projectStage: "Selecciona la etapa actual de tu proyecto",
                        activeUsers: "1000",
                        monthlyRevenue: "5000",
                        numberOfClients: "50",
                        communitySize: "2000",
                        tractionDocument: "https://ejemplo.com/traccion.pdf"
                    },
                    metricsTitle: "Métricas de Tracción",
                    metricsSubtitle: "Proporciona métricas que demuestren el progreso de tu proyecto (opcional)",
                    help: {
                        tractionDocument: "Sube un documento que demuestre la tracción de tu proyecto (analytics, testimonios, etc.)"
                    },
                    examplesTitle: "Ejemplos de Documentos de Tracción:",
                    examples: {
                        analytics: "Reportes de Google Analytics o métricas de uso",
                        testimonials: "Testimonios de usuarios o clientes",
                        partnerships: "Cartas de intención o acuerdos de partnership",
                        media: "Cobertura mediática o menciones en prensa",
                        awards: "Premios o reconocimientos recibidos"
                    }
                },
                impact: {
                    title: "Impacto y Sostenibilidad",
                    description: "Define el impacto social y ambiental de tu proyecto",
                    fields: {
                        sdg: "Objetivos de Desarrollo Sostenible (ODS)",
                        keyMetrics: "Métricas Clave de Impacto"
                    },
                    help: {
                        sdg: "Selecciona los ODS que tu proyecto contribuye a alcanzar",
                        keyMetrics: "Define métricas específicas para medir el impacto de tu proyecto"
                    },
                    addMetric: "Agregar Métrica",
                    editMetric: "Editar Métrica",
                    exampleMetrics: "Ejemplos de Métricas:",
                    validation: {
                        sdgRequired: "Debes seleccionar al menos un ODS"
                    },
                    metricFields: {
                        name: "Nombre de la Métrica",
                        method: "Método de Medición",
                        currentValue: "Valor Actual"
                    },
                    metricPlaceholders: {
                        name: "Ej: Usuarios Activos Mensuales",
                        method: "Describe cómo mides esta métrica...",
                        currentValue: "1,000"
                    }
                },
                legal: {
                    title: "Documentación Legal",
                    description: "Proporciona la documentación legal de tu proyecto (opcional)",
                    fields: {
                        incorporationAct: "Acta Constitutiva",
                        representativeId: "Identificación del Representante",
                        whitepaper: "Whitepaper",
                        capTable: "Cap Table"
                    },
                    placeholders: {
                        incorporationAct: "https://ejemplo.com/acta-constitutiva.pdf",
                        representativeId: "https://ejemplo.com/cedula.pdf",
                        whitepaper: "https://ejemplo.com/whitepaper.pdf",
                        capTable: "https://ejemplo.com/cap-table.pdf"
                    },
                    descriptions: {
                        incorporationAct: "Documento legal de constitución de la empresa",
                        representativeId: "Documento de identidad del representante legal",
                        whitepaper: "Documento técnico detallado del proyecto",
                        capTable: "Tabla de capitalización y estructura accionaria"
                    },
                    optional: "Opcional",
                    notice: {
                        title: "Documentación Opcional",
                        description: "Estos documentos son opcionales pero pueden aumentar la confianza de los inversionistas en tu proyecto."
                    },
                    guidelines: {
                        title: "Recomendaciones:",
                        secure: "Sube archivos en formato PDF para mejor compatibilidad",
                        accessible: "Asegúrate de que los documentos estén completos y legibles",
                        updated: "Verifica que los documentos estén actualizados y vigentes",
                        backup: "Mantén copias de seguridad de todos tus documentos originales"
                    },
                    completion: {
                        title: "Estado de Documentación"
                    }
                }
            }
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
        login_back_to_profile_button: "Volver al perfil",
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
        loading: "Cargando",
        logout: "Cerrar Sesión",
        profile: "Perfil",
        change: "Cambiar",
        setup: "Configurar",
        configuration: "Configuración",
        security: "Seguridad",
        personal_information: "Información Personal",
        account_settings: "Configuración de Cuenta",
        name: "Nombre",
        academic_title: "Titulo Academico",
        country: "Pais",
        description: "Descripcion",
        section: "Sección",
        
        profile_change_password: "Cambiar Contraseña",
        profile_change_password_description: "Actualizar la contrseña de su cuenta",
        profile_two_factor_authentication: "Autenticación en dos pasos",
        profile_two_factor_authentication_description: "Añade una capa adicional de seguridad",
        
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
                title: "Mis Donaciones",
                subtitle: "Rastrea tus contribuciones"
            },
            summary: {
                donationsMade: "Donaciones Realizadas",
                totalContributed: "Total Contribuido",
                projectsSupported: "Proyectos Apoyados"
            },
            projectsTable: {
                title: "Proyectos Apoyados",
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
            noData: "No has realizado ninguna donación"
        },
        
        // Toast error keys
        success: "Éxito",
        error: "Ocurrió un error",
        invalid: "Invalido",
        wrong_data: "Datos incorrectos",
        email_sent: "Correo enviado",

        // Auth
        invalid_email: "Correo electrónico inválido",
        bad_email: "Correo electrónico inválido",
        go2fa: "Continuar a Autenticación de dos pasos",
        otp_fail: "OTP fallido",
        reset_psw: "Restablecer contraseña",
        account_block: "Cuenta bloqueada",
        invalid_data: "Datos inválidos",
        confirm_email: "Confirmar correo electrónico",
        register_success: "Registro exitoso",
        resent_code: "Código reenviado",
        email_confirmed: "Correo electrónico confirmado",
        login_confirm_email: "Por favor confirma tu correo electrónico",
        password_reset_request_success: "Solicitud de restablecimiento de contraseña enviada",
        password_reset_success: "Contraseña restablecida exitosamente",
        missing_fields: "Por favor completa todos los campos",
        passwords_do_not_match: "Las contraseñas no coinciden",
        change_password: "Cambiar contraseña",

        // Signup
        signup_success: "Registro exitoso",
        signup_error: "Ocurrió un error durante el registro",

        username_label: "Nombre de usuario",
        username_placeholder: "Ingrese su nombre de usuario",
        email_label: "Correo electrónico",
        email_placeholder: "Ingrese su correo electrónico",
        first_name_label: "Nombre",
        first_name_placeholder: "Ingrese su nombre",
        last_name_label: "Apellido",
        last_name_placeholder: "Ingrese su apellido",
        old_password_label: "Contraseña actual",
        old_password_placeholder: "Ingrese su contraseña actual",
        password_label: "Contraseña",
        password_placeholder: "Ingrese su contraseña",
        password1_label: "Nueva contraseña",
        password1_placeholder: "Ingrese su nueva contraseña",
        password2_label: "Confirmar contraseña",
        password2_placeholder: "Confirme su nueva contraseña",
        
        // File Upload
        fileUpload: {
            clickToUpload: "Haz clic para subir archivo",
            dragAndDrop: "o arrastra y suelta aquí",
            supportedFormats: "Formatos soportados",
            maxSize: "Tamaño máximo",
            removeFile: "Eliminar archivo",
            memberPhotoDescription: "Sube la foto del miembro del equipo (PNG, JPG, JPEG)"
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
        common_add: "Add",
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
            subtitle: "Share your vision with the community and raise funds using cryptocurrencies",
            navigation: {
                previous: "Previous",
                next: "Next",
                stage: "Stage",
                of: "of",
                completeRequired: "Complete all required fields to continue",
                creating: "Creating Project...",
                createProject: "Create Project"
            },
            success: {
                title: "Project Created Successfully!",
                description: "Your project has been created and is under review. We'll notify you when it's ready to receive donations.",
                viewProject: "View My Project"
            },
            stages: {
                identity: {
                    title: "Project Identity",
                    description: "Define the basic identity of your project and how it will be presented to the community",
                    fields: {
                        name: "Project Name",
                        slogan: "Slogan",
                        executiveSummary: "Executive Summary",
                        industry: "Industry",
                        logo: "Logo (URL)",
                        website: "Website",
                        twitter: "Twitter",
                        linkedin: "LinkedIn"
                    },
                    placeholders: {
                        name: "Enter your project name",
                        slogan: "A memorable slogan for your project",
                        executiveSummary: "Describe your project in a concise paragraph...",
                        industry: "Select your project's industry",
                        logo: "https://example.com/logo.png",
                        website: "https://yourproject.com",
                        twitter: "https://twitter.com/yourproject",
                        linkedin: "https://linkedin.com/company/yourproject"
                    }
                },
                valueProposition: {
                    title: "Value Proposition",
                    description: "Clearly define the problem you solve and your unique value proposition",
                    fields: {
                        problem: "Problem You Solve",
                        solution: "Your Solution",
                        uniqueValue: "Unique Value Proposition",
                        businessModel: "Business Model"
                    },
                    placeholders: {
                        problem: "Describe the specific problem your project addresses...",
                        solution: "Explain how your project solves this problem...",
                        uniqueValue: "What makes your project unique? Why is it better than alternatives?",
                        businessModel: "Describe how your project generates value and sustains itself economically..."
                    }
                },
                team: {
                    title: "The Team",
                    description: "Present the key people behind your project",
                    addMember: "Add Member",
                    editMember: "Edit Member",
                    emptyState: "You haven't added team members yet. Add at least one person to continue.",
                    fields: {
                        name: "Full Name",
                        title: "Academic/Professional Title",
                        country: "Country",
                        photo: "Photo (URL)",
                        description: "Description",
                        linkedin: "LinkedIn"
                    },
                    placeholders: {
                        name: "Member's full name",
                        title: "CEO, CTO, PhD in..., etc.",
                        country: "Country of residence",
                        photo: "https://example.com/photo.jpg",
                        description: "Experience and role in the project...",
                        linkedin: "https://linkedin.com/in/profile"
                    }
                },
                financing: {
                    title: "Financing",
                    description: "Define the financial details of your fundraising campaign",
                    fields: {
                        objectiveAmount: "Target Amount (USDT)",
                        financingType: "Financing Type",
                        fundsUsage: "Funds Usage",
                        productDevelopment: "Product Development",
                        marketingSales: "Marketing and Sales",
                        expansionOperations: "Expansion and Operations",
                        operationalExpenses: "General Operational Expenses",
                        campaignEnd: "Campaign End"
                    },
                    placeholders: {
                        objectiveAmount: "100000",
                        financingType: "Select financing type"
                    },
                    help: {
                        objectiveAmount: "Recommended minimum amount: $1,000 USDT",
                        campaignEnd: "Select when your fundraising campaign will end"
                    },
                    total: "Total",
                    totalError: "Total must sum exactly to 100%"
                },
                traction: {
                    title: "Traction and Validation",
                    description: "Demonstrate the progress and validation of your project",
                    fields: {
                        projectStage: "Project Stage",
                        activeUsers: "Active Users",
                        monthlyRevenue: "Monthly Revenue (USDT)",
                        numberOfClients: "Number of Clients",
                        communitySize: "Community Size",
                        tractionDocument: "Traction Proof Document"
                    },
                    placeholders: {
                        projectStage: "Select your project's current stage",
                        activeUsers: "1000",
                        monthlyRevenue: "5000",
                        numberOfClients: "50",
                        communitySize: "2000",
                        tractionDocument: "https://example.com/traction.pdf"
                    },
                    metricsTitle: "Traction Metrics",
                    metricsSubtitle: "Provide metrics that demonstrate your project's progress (optional)",
                    help: {
                        tractionDocument: "Upload a document that demonstrates your project's traction (analytics, testimonials, etc.)"
                    },
                    examplesTitle: "Examples of Traction Documents:",
                    examples: {
                        analytics: "Google Analytics reports or usage metrics",
                        testimonials: "User or client testimonials",
                        partnerships: "Letters of intent or partnership agreements",
                        media: "Media coverage or press mentions",
                        awards: "Awards or recognitions received"
                    }
                },
                impact: {
                    title: "Impact and Sustainability",
                    description: "Define the social and environmental impact of your project",
                    fields: {
                        sdg: "Sustainable Development Goals (SDG)",
                        keyMetrics: "Key Impact Metrics"
                    },
                    help: {
                        sdg: "Select the SDGs your project contributes to achieving",
                        keyMetrics: "Define specific metrics to measure your project's impact"
                    },
                    addMetric: "Add Metric",
                    editMetric: "Edit Metric",
                    exampleMetrics: "Example Metrics:",
                    validation: {
                        sdgRequired: "You must select at least one SDG"
                    },
                    metricFields: {
                        name: "Metric Name",
                        method: "Measurement Method",
                        currentValue: "Current Value"
                    },
                    metricPlaceholders: {
                        name: "Ex: Monthly Active Users",
                        method: "Describe how you measure this metric...",
                        currentValue: "1,000"
                    }
                },
                legal: {
                    title: "Legal Documentation",
                    description: "Provide legal documentation for your project (optional)",
                    fields: {
                        incorporationAct: "Incorporation Act",
                        representativeId: "Representative ID",
                        whitepaper: "Whitepaper",
                        capTable: "Cap Table"
                    },
                    placeholders: {
                        incorporationAct: "https://example.com/incorporation-act.pdf",
                        representativeId: "https://example.com/id.pdf",
                        whitepaper: "https://example.com/whitepaper.pdf",
                        capTable: "https://example.com/cap-table.pdf"
                    },
                    descriptions: {
                        incorporationAct: "Legal document of company incorporation",
                        representativeId: "Legal representative's identity document",
                        whitepaper: "Detailed technical document of the project",
                        capTable: "Capitalization table and shareholding structure"
                    },
                    optional: "Optional",
                    notice: {
                        title: "Optional Documentation",
                        description: "These documents are optional but can increase investor confidence in your project."
                    },
                    guidelines: {
                        title: "Recommendations:",
                        secure: "Upload files in PDF format for better compatibility",
                        accessible: "Ensure documents are complete and legible",
                        updated: "Verify documents are current and up to date",
                        backup: "Keep backup copies of all your original documents"
                    },
                    completion: {
                        title: "Documentation Status"
                    }
                }
            }
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
        login_back_to_profile_button: "Volver al perfil",
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
        loading: "Cargando",
        logout: "Cerrar Sesión",
        profile: "Perfil",
        change: "Cambiar",
        setup: "Configurar",
        configuration: "Configuración",
        security: "Seguridad",
        personal_information: "Información Personal",
        account_settings: "Configuración de Cuenta",
        name: "Nombre",
        academic_title: "Titulo Academico",
        country: "Pais",
        description: "Descripcion",
        section: "Sección",
        
        profile_change_password: "Cambiar Contraseña",
        profile_change_password_description: "Actualizar la contrseña de su cuenta",
        profile_two_factor_authentication: "Autenticación en dos pasos",
        profile_two_factor_authentication_description: "Añade una capa adicional de seguridad",
        
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

        // Toast error keys
        success: "Éxito",
        error: "Ocurrió un error",
        invalid: "Invalido",
        wrong_data: "Datos incorrectos",
        email_sent: "Correo enviado",

        // Auth
        invalid_email: "Correo electrónico inválido",
        bad_email: "Correo electrónico inválido",
        go2fa: "Continuar a Autenticación de dos pasos",
        otp_fail: "OTP fallido",
        reset_psw: "Restablecer contraseña",
        account_block: "Cuenta bloqueada",
        invalid_data: "Datos inválidos",
        confirm_email: "Confirmar correo electrónico",
        register_success: "Registro exitoso",
        resent_code: "Código reenviado",
        email_confirmed: "Correo electrónico confirmado",
        login_confirm_email: "Por favor confirma tu correo electrónico",
        password_reset_request_success: "Solicitud de restablecimiento de contraseña enviada",
        password_reset_success: "Contraseña restablecida exitosamente",
        missing_fields: "Por favor completa todos los campos",
        passwords_do_not_match: "Las contraseñas no coinciden",
        change_password: "Cambiar contraseña",

        // Signup
        signup_success: "Registro exitoso",
        signup_error: "Ocurrió un error durante el registro",

        username_label: "Nombre de usuario",
        username_placeholder: "Ingrese su nombre de usuario",
        email_label: "Correo electrónico",
        email_placeholder: "Ingrese su correo electrónico",
        first_name_label: "Nombre",
        first_name_placeholder: "Ingrese su nombre",
        last_name_label: "Apellido",
        last_name_placeholder: "Ingrese su apellido",
        old_password_label: "Contraseña actual",
        old_password_placeholder: "Ingrese su contraseña actual",
        password_label: "Contraseña",
        password_placeholder: "Ingrese su contraseña",
        password1_label: "Nueva contraseña",
        password1_placeholder: "Ingrese su nueva contraseña",
        password2_label: "Confirmar contraseña",
        password2_placeholder: "Confirme su nueva contraseña",
        
        // File Upload
        fileUpload: {
            clickToUpload: "Click to upload file",
            dragAndDrop: "or drag and drop here",
            supportedFormats: "Supported formats",
            maxSize: "Max size",
            removeFile: "Remove file",
            memberPhotoDescription: "Upload team member photo (PNG, JPG, JPEG)"
        },
        
    }
}

export default common