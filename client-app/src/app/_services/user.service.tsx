import { fetchWithAuth } from "../_lib/fetcher";

var defaultUrl = process.env.NEXT_PUBLIC_API_PATH;

export const getUserDetails = async (): Promise<Member[]> => {
    const data = await fetchWithAuth<any>('api/user', "GET");
    const list: Member[] = (data.data as any[]).map((member: any) => ({
        ...member,
        joinedDate: new Date(member.joinedDate),
    }));

    return list;
};

export const getUserDetailById = async (memberId: string): Promise<Member> => {
    const data = await fetchWithAuth<any>(`api/user/${memberId}`, "GET");
    const user: Member = data.data;
    return user;
};


export const deleteUserDetailById = async (id: number): Promise<boolean> => {
    const data = await fetchWithAuth<any>(`api/user/${id}`, "GET");

    if (data.statusCode != 200) {
        throw new Error("Failed to delete gym");
        return false;
    } 
    return true;
};

export const updateUserDetails = async (updatedMember: any): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/user`, "PUT", {
            body: JSON.stringify(updatedMember)
        });

        return true;
    } catch (error) {
        return false;
    }
};

export const addGymUser = async (member: Member, gymId: number): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/user/add-user/${gymId}`, "POST", {
            body: JSON.stringify(member)
        });
        return true;
    } catch (error) {
        return false;
    }
};




