 export interface IUpdateUser {
        userId: string;
        hospitalId: number;
        firstName: string;
        lastName: string;
        email: string;
        designation: string;
        phoneNumber: string;
        joiningDate: Date;
        isActive: boolean;
        updatedBy: string;
        role: string;
    }