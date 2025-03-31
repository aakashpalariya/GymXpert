import type { NextConfig } from 'next'

var defaultUrl = process.env.NEXT_PUBLIC_API_PATH;

export const getMemberDetails = async (gymId: string): Promise<Member[]> => {
    let res = await fetch(`${defaultUrl}/api/member/${gymId}`);

    if (!res.ok) {
        throw new Error("Failed to fetch user details");
    }  
    var data = await res.json();
    const list: Member[] = (data.data as any[]).map((member: any) => ({
        ...member,
        dateOfBirth: new Date(data.dateOfBirth)
    }));

    return list;
};

export const getMemberDetailById = async (memberId: string): Promise<Member> => {
    let res = await fetch(`${defaultUrl}/api/user/${memberId}`);

    if (!res.ok) {
        throw new Error("Failed to fetch member details");
    }  
    var data = await res.json();

    const user: Member = data.data;

    return user;
};


export const deleteMemberDetailById = async (id: number): Promise<boolean> => {
    // Construct the URL with the gymId parameter
    const res = await fetch(`${defaultUrl}/api/member/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    var data = await res.json();
    if (data.statusCode != 200) {
        throw new Error("Failed to delete gym");
        return false;
    } 
    return true;
};

export const updateMemberDetails = async (updatedMember: any): Promise<boolean> => {
    try {
        const res = await fetch(`${defaultUrl}/api/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMember),
        });

        if (!res.ok) {
            throw new Error("Failed to update gym details");
        }

        return true;
    } catch (error) {
        return false;
    }
};


export const addMemberDetails = async (member: Member, gymId: string): Promise<boolean> => {
    try {
        const res = await fetch(`${defaultUrl}/api/member/${gymId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(member),
        });

        var data = await res.json();
        if (!res.ok) {
            throw new Error("Failed to update member details");
        }

        return true;
    } catch (error) {
        return false;
    }
};
