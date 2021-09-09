export interface IAddPrescription {
    hospitalId: number;
    patientId: number;
    visitEntryId: number;
    physicalStateId: number;
    doctorsObservation: string;
    adviceMedication: string;
    adviceTest: string;
    note: string;
}
