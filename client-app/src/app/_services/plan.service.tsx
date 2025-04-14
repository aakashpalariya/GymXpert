import { fetchWithAuth } from "../_lib/fetcher";

export const getPlanDetails = async (): Promise<Plan[]> => {
    const data = await fetchWithAuth<any>('api/plan', "GET");
    const list: Plan[] = (data.data as any[]).map((plan: any) => ({
        ...plan,
    }));

    return list;
};