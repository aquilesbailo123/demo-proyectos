import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import useAuthStore from "@/stores/AuthStore";
import { Industry, FinancingType } from "./useOptions";

// Project types
export interface ValueProposition {
    problema: string;
    solucion: string;
    propuesta_unica_valor: string;
    modelo_negocio: string;
}

export interface FundsUsage {
    desarrollo_producto: number;
    marketing_ventas: number;
    expansion_operaciones: number;
    gastos_operativos: number;
}

export interface KeyMetric {
    id?: string;
    metrica: string;
    metodo_medicion: string;
    valor_actual: string;
    created?: string;
    updated?: string;
}

export interface ProjectMember {
    id?: string;
    name: string;
    academic_title?: string;
    country?: string;
    photo?: string;
    description?: string;
    linkedin?: string;
    created?: string;
    updated?: string;
}

export interface Project {
    id: string;
    name: string;
    slogan: string;
    resumen_ejecutivo: string;
    logo?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    value_proposition: ValueProposition;
    industry: Industry;
    financing_type: FinancingType;
    end_date: string;
    objective_amount: string;
    funds_usage: FundsUsage;
    etapa_actual: string;
    usuarios_activos?: number;
    ingresos_mensuales?: string;
    numero_clientes?: number;
    tamano_comunidad?: number;
    metricas_clave: KeyMetric[];
    relevant_sdg: string[];
    equipo: ProjectMember[];
    documento_traccion?: string;
    acta_constitutiva?: string;
    identificacion_representante?: string;
    whitepaper?: string;
    cap_table?: string;
    is_active: boolean;
    is_featured: boolean;
    funding_progress: number;
    days_remaining: number;
    created: string;
    updated: string;
}

export interface CreateProjectData {
    name: string;
    slogan: string;
    resumen_ejecutivo: string;
    logo?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    value_proposition: ValueProposition;
    industry_id: number;
    financing_type_id: number;
    end_date: string;
    objective_amount: string;
    funds_usage: FundsUsage;
    etapa_actual: string;
    usuarios_activos?: number;
    ingresos_mensuales?: string;
    numero_clientes?: number;
    tamano_comunidad?: number;
    relevant_sdg: string[];
    documento_traccion?: string;
    acta_constitutiva?: string;
    identificacion_representante?: string;
    whitepaper?: string;
    cap_table?: string;
    metricas_clave?: Omit<KeyMetric, 'id' | 'created' | 'updated'>[];
    equipo?: Omit<ProjectMember, 'id' | 'created' | 'updated'>[];
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
    is_active?: boolean;
}

export interface FeaturedProjectsParams {
    limit?: number;
    offset?: number;
    ordering?: 'created' | '-created' | 'name' | '-name' | 'objective_amount' | '-objective_amount' | 'etapa_actual' | '-etapa_actual';
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// Fetch functions
const fetchFeaturedProjects = async (params: FeaturedProjectsParams = {}): Promise<PaginatedResponse<Project>> => {
    const { limit = 20, offset = 0, ordering = '-created' } = params;
    const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ordering,
    });
    
    const { data } = await axiosInstance.get(`/projects/featured/?${queryParams}`);
    return data;
};

const fetchUserProject = async (): Promise<Project[]> => {
    const { data } = await axiosInstance.get("/projects/user/");
    return data.results || data; // Handle both paginated and non-paginated responses
};

const createProject = async (projectData: CreateProjectData): Promise<Project> => {
    const { data } = await axiosInstance.post("/projects/", projectData);
    return data;
};

const updateProject = async (projectData: UpdateProjectData): Promise<Project> => {
    const { data } = await axiosInstance.patch("/projects/update/", projectData);
    return data;
};

// Hooks
export const useFeaturedProjects = (params: FeaturedProjectsParams = {}) => {
    return useQuery({
        queryKey: ["featuredProjects", params],
        queryFn: () => fetchFeaturedProjects(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useUserProject = () => {
    const isLogged = useAuthStore((state) => state.isLogged);

    return useQuery({
        queryKey: ["userProject"],
        enabled: isLogged,
        queryFn: fetchUserProject,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            // Invalidate user project query to refetch the new project
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            // Invalidate user project query to refetch updated data
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
            // Also invalidate featured projects in case the project became featured/unfeatured
            queryClient.invalidateQueries({ queryKey: ["featuredProjects"] });
        },
    });
};

// Combined hook for all project operations
export const useProject = () => {
    const createProjectMutation = useCreateProject();
    const updateProjectMutation = useUpdateProject();

    return {
        // Queries
        useFeaturedProjects,
        useUserProject,
        
        // Mutations
        createProject: createProjectMutation,
        updateProject: updateProjectMutation,
        
        // Combined loading state
        isLoading: createProjectMutation.isPending || updateProjectMutation.isPending,
    };
};
