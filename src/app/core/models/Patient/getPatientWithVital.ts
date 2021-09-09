export interface IPatientWithVital {
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
    patientVitals: PatientVital[];
}
export interface PatientVital {
    id: number;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    hospitalId: number;
    hospitalName: string;
    height: string;
    weight: string;
    bmi: number;
    waist: string;
    hip: string;
    spO2: number;
    pulseRate: number;
    isLatest: boolean;
    updatedBy: string;
    updatedAt: Date;
}

