import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { ProjectMember } from "./useProject";

// API functions
const createMember = async (projectId: string, memberData: Omit<ProjectMember, 'id' | 'created' | 'updated'>, photoFile?: File): Promise<ProjectMember> => {
    if (photoFile) {
        const formData = new FormData();
        formData.append('name', memberData.name);
        if (memberData.academic_title) formData.append('academic_title', memberData.academic_title);
        if (memberData.country) formData.append('country', memberData.country);
        if (memberData.description) formData.append('description', memberData.description);
        if (memberData.linkedin) formData.append('linkedin', memberData.linkedin);
        formData.append('photo', photoFile);

        const { data } = await axiosInstance.post(`/projects/${projectId}/members/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    } else {
        // Don't include photo field if no file is provided
        const cleanMemberData = { ...memberData };
        delete cleanMemberData.photo;
        
        const { data } = await axiosInstance.post(`/projects/${projectId}/members/`, cleanMemberData);
        return data;
    }
};

const updateMember = async (projectId: string, memberId: string, memberData: Partial<ProjectMember>, photoFile?: File): Promise<ProjectMember> => {
    if (photoFile) {
        const formData = new FormData();
        if (memberData.name) formData.append('name', memberData.name);
        if (memberData.academic_title) formData.append('academic_title', memberData.academic_title);
        if (memberData.country) formData.append('country', memberData.country);
        if (memberData.description) formData.append('description', memberData.description);
        if (memberData.linkedin) formData.append('linkedin', memberData.linkedin);
        formData.append('photo', photoFile);

        const { data } = await axiosInstance.patch(`/projects/${projectId}/members/${memberId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    } else {
        // Don't include photo field if no file is provided
        const cleanMemberData = { ...memberData };
        delete cleanMemberData.photo;
        
        const { data } = await axiosInstance.patch(`/projects/${projectId}/members/${memberId}/`, cleanMemberData);
        return data;
    }
};

const deleteMember = async (projectId: string, memberId: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${projectId}/members/${memberId}/delete/`);
};

// Hooks
export const useCreateMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, memberData, photoFile }: { 
            projectId: string; 
            memberData: Omit<ProjectMember, 'id' | 'created' | 'updated'>; 
            photoFile?: File 
        }) => createMember(projectId, memberData, photoFile),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
        },
    });
};

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, memberId, memberData, photoFile }: { 
            projectId: string; 
            memberId: string; 
            memberData: Partial<ProjectMember>; 
            photoFile?: File 
        }) => updateMember(projectId, memberId, memberData, photoFile),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
        },
    });
};

export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, memberId }: { projectId: string; memberId: string }) => 
            deleteMember(projectId, memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProject"] });
        },
    });
};
