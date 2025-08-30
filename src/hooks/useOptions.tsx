import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

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
    const { data } = await axiosInstance.get("/industries/");
    return data.results || data; // Handle both paginated and non-paginated responses
};

const fetchFinancingTypes = async (): Promise<FinancingType[]> => {
    const { data } = await axiosInstance.get("/financing-types/");
    return data.results || data; // Handle both paginated and non-paginated responses
};

const fetchProjectStages = async (): Promise<ProjectStage[]> => {
    const { data } = await axiosInstance.get("/etapas-proyecto/");
    return data.results || data; // Handle both paginated and non-paginated responses
};

const fetchODS = async (): Promise<ODS[]> => {
    const { data } = await axiosInstance.get("/ods/");
    return data.results || data; // Handle both paginated and non-paginated responses
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
