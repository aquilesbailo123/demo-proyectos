import { useQuery } from "@tanstack/react-query";

// Types for options endpoints
export interface Industry {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface FinancingType {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface ProjectStage {
    value: string;
    label: string;
}

export interface ODS {
    value: string;
    label: string;
}

// Fetch functions
const fetchIndustries = async (): Promise<Industry[]> => {
    return [
        {
            "id": 1,
            "name": "AgriTech",
            "slug": "agritech",
            "description": "Tecnología aplicada a la agricultura y ganadería"
        },
        {
            "id": 2,
            "name": "CleanTech",
            "slug": "cleantech",
            "description": "Tecnologías limpias y sostenibles"
        },
        {
            "id": 3,
            "name": "FinTech",
            "slug": "fintech",
            "description": "Tecnología financiera"
        },
        {
            "id": 4,
            "name": "BioTech",
            "slug": "biotech",
            "description": "Biotecnología y ciencias de la vida"
        },
        {
            "id": 5,
            "name": "EdTech",
            "slug": "edtech",
            "description": "Tecnología educativa"
        },
        {
            "id": 6,
            "name": "HealthTech",
            "slug": "healthtech",
            "description": "Tecnología aplicada a la salud"
        },
        {
            "id": 7,
            "name": "Social",
            "slug": "social",
            "description": "Impacto social y desarrollo comunitario"
        },
        {
            "id": 8,
            "name": "Arte y Cultura",
            "slug": "arte-cultura",
            "description": "Proyectos artísticos y culturales"
        }
    ]
};

const fetchFinancingTypes = async (): Promise<FinancingType[]> => {
    return [
        {
            "id": 1,
            "name": "Equity",
            "slug": "equity",
            "description": "Financiamiento a cambio de participación accionaria"
        },
        {
            "id": 2,
            "name": "Deuda",
            "slug": "deuda",
            "description": "Préstamo con obligación de pago"
        },
        {
            "id": 3,
            "name": "Royalty",
            "slug": "royalty",
            "description": "Financiamiento a cambio de porcentaje de ingresos futuros"
        },
        {
            "id": 4,
            "name": "Nota Convertible",
            "slug": "nota-convertible",
            "description": "Instrumento de deuda convertible en equity"
        }
    ]
};

const fetchProjectStages = async (): Promise<ProjectStage[]> => {
    return [
        {
            "value": "idea_concepto",
            "label": "Idea/Concepto"
        },
        {
            "value": "mvp",
            "label": "MVP"
        },
        {
            "value": "traccion_temprana",
            "label": "Tracción Temprana"
        },
        {
            "value": "crecimiento",
            "label": "Crecimiento"
        },
        {
            "value": "escalamiento",
            "label": "Escalamiento"
        }
    ]
};

const fetchODS = async (): Promise<ODS[]> => {
    return [
        {
            "value": "ods_1",
            "label": "ODS 1: Fin de la Pobreza"
        },
        {
            "value": "ods_2",
            "label": "ODS 2: Hambre Cero"
        },
        {
            "value": "ods_3",
            "label": "ODS 3: Salud y Bienestar"
        },
        {
            "value": "ods_4",
            "label": "ODS 4: Educación de Calidad"
        },
        {
            "value": "ods_5",
            "label": "ODS 5: Igualdad de Género"
        },
        {
            "value": "ods_6",
            "label": "ODS 6: Agua Limpia y Saneamiento"
        },
        {
            "value": "ods_7",
            "label": "ODS 7: Energía Asequible y No Contaminante"
        },
        {
            "value": "ods_8",
            "label": "ODS 8: Trabajo Decente y Crecimiento Económico"
        },
        {
            "value": "ods_9",
            "label": "ODS 9: Industria, Innovación e Infraestructura"
        },
        {
            "value": "ods_10",
            "label": "ODS 10: Reducción de las Desigualdades"
        },
        {
            "value": "ods_11",
            "label": "ODS 11: Ciudades y Comunidades Sostenibles"
        },
        {
            "value": "ods_12",
            "label": "ODS 12: Producción y Consumo Responsables"
        },
        {
            "value": "ods_13",
            "label": "ODS 13: Acción por el Clima"
        },
        {
            "value": "ods_14",
            "label": "ODS 14: Vida Submarina"
        },
        {
            "value": "ods_15",
            "label": "ODS 15: Vida de Ecosistemas Terrestres"
        },
        {
            "value": "ods_16",
            "label": "ODS 16: Paz, Justicia e Instituciones Sólidas"
        },
        {
            "value": "ods_17",
            "label": "ODS 17: Alianzas para Lograr los Objetivos"
        }
    ]
};

// Individual hooks
export const useIndustries = () => {
    return useQuery({
        queryKey: ["industries"],
        queryFn: fetchIndustries,
        staleTime: 30 * 60 * 1000, // 30 minutes - options don't change frequently
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

export const useFinancingTypes = () => {
    return useQuery({
        queryKey: ["financingTypes"],
        queryFn: fetchFinancingTypes,
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

export const useProjectStages = () => {
    return useQuery({
        queryKey: ["projectStages"],
        queryFn: fetchProjectStages,
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

export const useODS = () => {
    return useQuery({
        queryKey: ["ods"],
        queryFn: fetchODS,
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

// Combined hook for all options
export const useOptions = () => {
    const industries = useIndustries();
    const financingTypes = useFinancingTypes();
    const projectStages = useProjectStages();
    const ods = useODS();

    return {
        industries,
        financingTypes,
        projectStages,
        ods,
        isLoading: industries.isLoading || financingTypes.isLoading || projectStages.isLoading || ods.isLoading,
        isError: industries.isError || financingTypes.isError || projectStages.isError || ods.isError,
        error: industries.error || financingTypes.error || projectStages.error || ods.error,
    };
};
