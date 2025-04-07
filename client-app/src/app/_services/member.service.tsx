import { fetchWithAuth } from "../_lib/fetcher";

export const getMemberDetails = async (gymId: string): Promise<Member[]> => {
    const data = await fetchWithAuth<any>(`api/member/${gymId}`, "GET");
    const list: Member[] = (data.data as any[]).map((member: any) => ({
        ...member,
        dateOfBirth: new Date(member.dateOfBirth)
    }));

    return list;
};

export const getMemberDetailById = async (memberId: string): Promise<Member> => {
    const data = await fetchWithAuth<any>(`api/user/${memberId}`, "GET");
    const user: Member = data.data;
    return user;
};


export const deleteMemberDetailById = async (id: number): Promise<boolean> => {
    const data = await fetchWithAuth<any>(`api/gym/${id}`, "DELETE");

    if (data.statusCode != 200) {
        throw new Error("Failed to delete gym");
        return false;
    }
    return true;
};

export const updateMemberDetails = async (updatedMember: any): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/user`, "PUT", {
            body: JSON.stringify(updatedMember)
        });

        if (data.statusCode != 200) {
            throw new Error("Failed to update member details");
        }
        return true;
    } catch (error) {
        return false;
    }
};


export const addMemberDetails = async (member: Member, gymId: string): Promise<boolean> => {
    try {
        const data = await fetchWithAuth<any>(`api/member/${gymId}`, "POST", {
            body: JSON.stringify(member),
        });

        return true;
    } catch (error) {
        return false;
    }
};
