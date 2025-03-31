interface Gym {
    gymId: number;
    name: string;
    address: string;
    city: string;
    state: string;
    contactNumber: string;
    email: string;
    isActive: boolean;
    isDeleted: boolean;
    joinedDate: Date | null;
}