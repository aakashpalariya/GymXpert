import { BehaviorSubject } from "rxjs";
import { fetchWithAuth } from "../_lib/fetcher";

var defaultUrl = process.env.NEXT_PUBLIC_API_PATH;
var currentUserSource = new BehaviorSubject<User | null>(null);
var currentUser$ = currentUserSource.asObservable();

export const getGymDDL = async (): Promise<SelectItem<number>[]> => {
    let res = await fetch(`${defaultUrl}/api/gym/select-item`);

    if (!res.ok) {
        throw new Error("Failed to fetch select details");
    }  
    var data = await res.json();
    const list: SelectItem<number>[] = (data.data as any[]).map((select: any) => ({
        ...select,
    }));

    return list;
};

export const getGymDetails = async (): Promise<Gym[]> => {
    const data = await fetchWithAuth<any>('api/gym', "GET");

    // const res = await fetch(`${defaultUrl}/api/gym`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${authToken}`,
    //     },
        
    // });
    // if (!res.ok) {
    //     throw new Error("Failed to fetch gym details");
    // }  
    // var data = await res.json();
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

export const updateGymDetails = async (updatedGym: any): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/gym`, "PUT", {
            body: JSON.stringify(updatedGym)
        });

        if (data.statusCode != 200) {
            throw new Error("Failed to add gym details");
        }
        return true; // Return true if update was successful
    } catch (error) {
        return false; // Return false if there was an error
    }
};


export const addGymDetails = async (updatedGym: any): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/gym`, "POST", {
            body: JSON.stringify(updatedGym)
        });
        
        if (data.statusCode != 200) {
            throw new Error("Failed to update gym details");
        }

        return true; // Return true if update was successful
    } catch (error) {
        return false; // Return false if there was an error
    }
};

