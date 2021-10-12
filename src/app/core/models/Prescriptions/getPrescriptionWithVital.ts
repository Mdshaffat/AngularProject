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
export interface GeneralExamination {
    id: number;
    appearance: boolean;
    anemia: boolean;
    jundice: boolean;
    dehydration: boolean;
    edema: boolean;
    cyanosis: boolean;
    heart: boolean;
    lung: boolean;
    abdomen: boolean;
    kub: boolean;
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
    generalExamination: GeneralExamination;
    doctorId: string;
    doctorFirstName: string;
    doctorLastName: string;
    bmdcRegNo: string;
    optionalEmail: string;
    visitEntryId: number;
    doctorsObservation: string;
    adviceMedication: string;
    adviceTest: string;
    nextVisit: Date;
    note: string;
    createdOn: Date;
    updatedOn: Date;
}
