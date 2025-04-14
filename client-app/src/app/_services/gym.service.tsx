import { fetchWithAuth } from "../_lib/fetcher";

export const getGymDDL = async (): Promise<SelectItem<number>[]> => {
    const data = await fetchWithAuth<any>('api/gym/select-item', "GET");
    const list: SelectItem<number>[] = (data.data as any[]).map((select: any) => ({
        ...select,
    }));
    return list;
};

export const getGymDetails = async (): Promise<Gym[]> => {
    const data = await fetchWithAuth<any>('api/gym', "GET");

    const gymList: Gym[] = (data.data as any[]).map((gym: any) => ({
        ...gym,
        joinedDate: new Date(gym.joinedDate),
    }));

    return gymList;
};

export const getGymDetailById = async (gymId: string): Promise<Gym> => {
    const data = await fetchWithAuth<any>(`api/gym/${gymId}`, "GET");
    const gym: Gym = data.data;
    return gym;
};


export const deleteGymDetailById = async (gymId: number): Promise<boolean> => {
    const data = await fetchWithAuth<any>(`api/gym/${gymId}`, "DELETE");

    if (data.statusCode != 200) {
        throw new Error("Failed to delete gym");
        return false;
    } 
    return true;
};

export const updateGymDetails = async (gym: Gym): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/gym`, "PUT", {
            body: JSON.stringify(gym)
        });

        console.log(await data);
        if (data.statusCode != 200) {
            throw new Error("Failed to add gym details");
        }
        return true;
    } catch (error) {
        return false;
    }
};


export const addGymDetails = async (gym: Gym): Promise<number> => {
        const data = await fetchWithAuth<any>(`api/gym`, "POST", {
            body: JSON.stringify(gym)
        });
        
        if (data.statusCode != 200) {
            throw new Error("Failed to update gym details");
        }
        return data.data;
};

