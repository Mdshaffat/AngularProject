    export interface IPatient {
        id: number;
        hospitalId: number;
        hospitalName: string;
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
        branchName: string;
        isActive: boolean;
        note: string;
        createdOn: Date;
        createdBy: string;
        updatedOn: Date;
        updatedBy: string;
    }
