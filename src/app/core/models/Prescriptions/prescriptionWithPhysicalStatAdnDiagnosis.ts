import { IMedicineForPrescription } from './medicineForPrescription';

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
    appearance: string;
    anemia: string;
    jaundice: string;
    dehydration: string;
    edema: string;
    cyanosis: string;
    heart: string;
    lung: string;
    abdomen: string;
    kub: string;
    rbsFbs: string;
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

export interface DiseasesCategory {
    id: number;
    name: string;
    isActive: boolean;
}

export interface Diseases {
    id: number;
    name: string;
    isActive: boolean;
    diseasesCategoryId: number;
    diseasesCategory: DiseasesCategory;
}

export interface Diagnosis {
    id: number;
    patientId: number;
    patientFristName: string;
    patientLastName: string;
    prescriptionId: number;
    diseasesCategoryId: number;
    diseasesCategory: string;
    diseasesId: number;
    diseases: Diseases;
    updatedBy: string;
    updatedAt: Date;
}

export interface IPrescriptionWithPhysicalStatAndDiagnosis {
    id: number;
    hospitalId: number;
    hospitalName: string;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    patientBloodGroup: string;
    patientDob: Date;
    patientAge: string;
    patientMobile: string;
    patientGender: string;
    physicalStat: PhysicalStat;
    diagnosis: Diagnosis[];
    medicineForPrescription: IMedicineForPrescription[];
    doctorId: string;
    doctorFirstName: string;
    doctorLastName: string;
    bmdcRegNo: string;
    optionalEmail: string;
    visitEntryId: number;
    doctorsObservation: string;
    adviceMedication: string;
    adviceTest: string;
    oh: string;
    mh: string;
    dx: string;
    systemicExamination: string;
    historyOfPastIllness: string;
    familyHistory: string;
    allergicHistory: string;
    covidvaccine: string;
    vaccineBrand: string;
    vaccineDose: string;
    nextVisit: Date;
    note: string;
    isTelimedicine: boolean;
    createdOn: Date;
    updatedOn: Date;
}
