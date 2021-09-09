export interface IPatientVital {
    patientId: number;
    hospitalId: number;
    height: string;
    weight: string;
    bmi: number;
    waist: string;
    hip: string;
    spO2: number;
    pulseRate: number;
    isLatest: boolean;
}
