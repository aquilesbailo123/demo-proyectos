import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { useAuthStore } from "@/stores/AuthStore";

const fetchProfile = () => axiosInstance.get("/profile");

export const useProfile = () => {
    const { isAuthenticated } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
    }));

    return useQuery({
        queryKey: ["profile"],
        enabled: isAuthenticated,
        queryFn: fetchProfile,
        select: (res: any) => res.data,
        refetchInterval: (query: any) => {
            // Optional: adapt to your backend's KYC/status shape if exists
            const kycStatus = (query.state.data as any)?.data?.kyc_status;
            return kycStatus === "green" ? false : 5000;
        },
    });
};
