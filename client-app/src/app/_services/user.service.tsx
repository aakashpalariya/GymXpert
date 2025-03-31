import type { NextConfig } from 'next'

var defaultUrl = process.env.NEXT_PUBLIC_API_PATH;

export const getUserDetails = async (): Promise<Member[]> => {
    let res = await fetch(`${defaultUrl}/api/user/`);

    if (!res.ok) {
        throw new Error("Failed to fetch user details");
    }  
    var data = await res.json();
    const list: Member[] = (data.data as any[]).map((member: any) => ({
        ...member,
        joinedDate: new Date(member.joinedDate),
    }));

    return list;
};

export const getUserDetailById = async (memberId: string): Promise<Member> => {
    let res = await fetch(`${defaultUrl}/api/user/${memberId}`);

    if (!res.ok) {
        throw new Error("Failed to fetch member details");
    }  
    var data = await res.json();

    const user: Member = data.data;

    return user;
};


export const deleteUserDetailById = async (id: number): Promise<boolean> => {
    // Construct the URL with the gymId parameter
    const res = await fetch(`${defaultUrl}/api/user/${id}`, {
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

export const updateUserDetails = async (updatedMember: any): Promise<boolean> => {
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


export const addUserDetails = async (member: any): Promise<boolean> => {
    try {
        const res = await fetch(`${defaultUrl}/api/user`, {
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




