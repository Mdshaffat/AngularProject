export interface IUpdatePatient {
    id: number;
    hospitalId: number;
    firstName: string;
    lastName: string;
    age: string;
    mobileNumber: string;
    doB: Date;
    gender: string;
    maritalStatus: string;
    primaryMember: boolean;
    address: string;
    nid: string;
    bloodGroup: string;
    branchId: number;
    isActive: boolean;
    note: string;
}
