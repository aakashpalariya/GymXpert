import { fetchWithAuth } from "../_lib/fetcher";

export const getCountries = async (): Promise<MasterItem[]> => {
    const data = await fetchWithAuth<any>('api/master/country', "GET");
    const list: MasterItem[] = (data.data as any[]).map((master: any) => ({
        ...master,
    }));

    return list;
};

export const getCountryById = async (id: string): Promise<MasterItem> => {
    const data = await fetchWithAuth<any>(`api/gym/${id}`, "GET");
    const item: MasterItem = data.data;
    return item;
};

export const addCountry = async (dto: MasterItem): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/master/country`, "POST", {
            body: JSON.stringify(dto)
        });
        if (data.statusCode != 200) {
            throw new Error("Failed to add gym details");
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const updateCountry = async (dto: MasterItem): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/master/country`, "PUT", {
            body: JSON.stringify(dto)
        });

        if (data.statusCode != 200) {
            throw new Error("Failed to add gym details");
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const updateState = async (dto: MasterItem): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/master/state`, "PUT", {
            body: JSON.stringify(dto)
        });

        if (data.statusCode != 200) {
            throw new Error("Failed to add gym details");
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteCountry = async (id: number): Promise<boolean> => {
    const data = await fetchWithAuth<any>(`api/master/country/${id}`, "DELETE");

    if (data.statusCode != 200) {
        throw new Error("Failed to delete gym");
        return false;
    }
    return true;
};

export const getStates = async (): Promise<MasterItem[]> => {
    const data = await fetchWithAuth<any>('api/master/state', "GET");
    const list: MasterItem[] = (data.data as any[]).map((master: any) => ({
        ...master,
    }));

    return list;
};