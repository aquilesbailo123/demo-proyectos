import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { KeyMetric } from "./useProject";

// API functions
const createMetric = async (projectId: string, metricData: Omit<KeyMetric, 'id' | 'created' | 'updated'>): Promise<KeyMetric> => {
    const { data } = await axiosInstance.post(`/projects/${projectId}/metrics/`, metricData);
    return data;
};

const updateMetric = async (projectId: string, metricId: string, metricData: Partial<KeyMetric>): Promise<KeyMetric> => {
    const { data } = await axiosInstance.patch(`/projects/${projectId}/metrics/${metricId}/`, metricData);
    return data;
};

const deleteMetric = async (projectId: string, metricId: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${projectId}/metrics/${metricId}/delete/`);
};

// Hooks
export const useCreateMetric = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, metricData }: { 
            projectId: string; 
            metricData: Omit<KeyMetric, 'id' | 'created' | 'updated'>; 
        }) => createMetric(projectId, metricData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
        },
    });
};

export const useUpdateMetric = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, metricId, metricData }: { 
            projectId: string; 
            metricId: string; 
            metricData: Partial<KeyMetric>; 
        }) => updateMetric(projectId, metricId, metricData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
        },
    });
};

export const useDeleteMetric = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, metricId }: { projectId: string; metricId: string }) => 
            deleteMetric(projectId, metricId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
        },
    });
};
