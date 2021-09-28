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
    divisionId: number;
    division: string;
    upazilaId: number;
    upazila: string;
    districtId: number;
    district: string;
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
    physicalStat: PhysicalStat[];
}
export interface PhysicalStat {
    id: number;
    hospitalId: number;
    hospitalName: string;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    visitEntryId: number;
    bloodPressureSystolic: string;
    bloodPressureDiastolic: string;
    heartRate: string;
    bodyTemparature: string;
    heightFeet: number;
    heightInches: number;
    weight: number;
    bmi: number;
    waist: string;
    hip: string;
    spO2: number;
    pulseRate: number;
    isLatest: boolean;
    createdOn: Date;
    createdBy: string;
    editedOn: Date;
    editedBy: string;
}

