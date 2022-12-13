export interface IUser {
    userId: string;
    hospitalId: number;
    hospitalName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    designation: string;
    specialization: string;
    bmdcRegNo: string;
    optionalEmail: string;
    joiningDate: Date;
    lastLoginDate: Date;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    isActive: boolean;
    role: string;
}
