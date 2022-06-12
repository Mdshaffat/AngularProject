export interface Patient {
    id: number;
    hospitalId: number;
    hospitalName: string;
    firstName: string;
    lastName: string;
    doB: Date;
    age: string;
    mobileNumber: string;
    gender: string;
    maritalStatus: string;
    primaryMember: boolean;
    membershipRegistrationNumber: string;
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
    covidvaccine: string;
    vaccineBrand: string;
    vaccineDose: string;
    firstDoseDate: Date;
    secondDoseDate: Date;
    bosterDoseDate: Date;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}

export interface MedicineForPrescription {
    id: number;
    medicineId: number;
    medicineType: string;
    brandName: string;
    genericName: string;
    dose: string;
    time: string;
    comment: string;
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

export interface Prescription {
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
    medicineForPrescription: MedicineForPrescription[];
    physicalStat: PhysicalStat[];
    diagnosis: Diagnosis[];
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
    nextVisit: Date;
    covidvaccine: string;
    vaccineBrand: string;
    vaccineDose: string;
    note: string;
    createdOn: Date;
    updatedOn: Date;
}

export interface Vital {
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

export interface PatientVitalAndPrescription {
    prescription: Prescription;
    vital: Vital;
}

export interface IMedicalReport {
    patient: Patient;
    patientVitalAndPrescription: PatientVitalAndPrescription[];
}
