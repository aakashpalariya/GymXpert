var defaultUrl = process.env.NEXT_PUBLIC_API_PATH;

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
    let res = await fetch(`${defaultUrl}/api/gym/`);

    if (!res.ok) {
        throw new Error("Failed to fetch gym details");
    }  
    var data = await res.json();
    const gymList: Gym[] = (data.data as any[]).map((gym: any) => ({
        ...gym,
        joinedDate: new Date(gym.joinedDate),
    }));

    return gymList;
};

export const getGymDetailById = async (gymId: string): Promise<Gym> => {
    // Construct the URL with the gymId parameter
    let res = await fetch(`${defaultUrl}/api/gym/${gymId}`);

    if (!res.ok) {
        throw new Error("Failed to fetch gym details");
    }  
    var data = await res.json();

    const gym: Gym = data.data;

    return gym;
};


export const deleteGymDetailById = async (gymId: number): Promise<boolean> => {
    // Construct the URL with the gymId parameter
    const res = await fetch(`${defaultUrl}/api/gym/${gymId}`, {
        method: 'DELETE', // Specify the HTTP method
        headers: {
            'Content-Type': 'application/json', // Specify that the body contains JSON
        },
    });
    var data = await res.json();
    if (data.statusCode != 200) {
        throw new Error("Failed to delete gym");
        return false;
    } 
    return true;
};

export const updateGymDetails = async (updatedGym: any): Promise<boolean> => {
    try {
        // Construct the URL with the gymId parameter
        const res = await fetch(`${defaultUrl}/api/gym`, {
            method: 'PUT', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Specify that the body contains JSON
            },
            body: JSON.stringify(updatedGym), // Convert the updated gym object to JSON format
        });

        if (!res.ok) {
            throw new Error("Failed to update gym details");
        }

        return true; // Return true if update was successful
    } catch (error) {
        return false; // Return false if there was an error
    }
};


export const addGymDetails = async (updatedGym: any): Promise<boolean> => {
    try {
        // Construct the URL with the gymId parameter
        const res = await fetch(`${defaultUrl}/api/gym`, {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Specify that the body contains JSON
            },
            body: JSON.stringify(updatedGym), // Convert the updated gym object to JSON format
        });

        var data = await res.json();
        if (!res.ok) {
            throw new Error("Failed to update gym details");
        }

        return true; // Return true if update was successful
    } catch (error) {
        return false; // Return false if there was an error
    }
};




