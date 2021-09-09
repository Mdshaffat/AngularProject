export interface IEditPrescription {
    id: number;
    hospitalId: number;
    patientId: number;
    visitEntryId: number;
    doctorsObservation: string;
    physicalStateId: number;
    adviceMedication: string;
    adviceTest: string;
    note: string;
}
