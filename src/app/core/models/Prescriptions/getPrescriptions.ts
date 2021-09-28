export interface IPrescription {
    id: number;
    hospitalId: number;
    hospitalName: string;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    patientDob: Date;
    patientAge: string;
    patientMobile: string;
    doctorId: string;
    doctorFirstName: string;
    doctorLastName: string;
    visitEntryId: number;
    doctorsObservation: string;
    physicalStateId: number;
    adviceMedication: string;
    adviceTest: string;
    note: string;
    createdOn: Date;
    updatedOn: Date;
}
