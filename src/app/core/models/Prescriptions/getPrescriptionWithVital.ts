export interface PhysicalStat {
    id: number;
    hospitalId: number;
    hospitalName: string;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    visitEntryId: number;
    bloodPressure: string;
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

export interface IPrescriptionWithVital {
    id: number;
    hospitalId: number;
    hospitalName: string;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    patientDob: Date;
    patientAge: number;
    patientMobile: string;
    patientBloodGroup: string;
    physicalStat: PhysicalStat[];
    doctorId: string;
    doctorFirstName: string;
    doctorLastName: string;
    bmdcRegNo: string;
    optionalEmail: string;
    visitEntryId: number;
    doctorsObservation: string;
    adviceMedication: string;
    adviceTest: string;
    note: string;
    createdOn: Date;
    updatedOn: Date;
}
