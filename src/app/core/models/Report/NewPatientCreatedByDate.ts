export interface INewPatientCreatedByDateAndBranch {
    branchId: number;
    doctorsId: string;
    doctorsName: string;
    branchName: string;
    totalMalePatient: number;
    totalFemalePatient: number;
    telimedicine: number;
    totalPatient: number;
}

export interface IPatientsCountAccordingToBranchBetweenTwoDatesDto {
    branchId: number;
    doctorsId: string;
    doctorsName: string;
    branchName: string;
    totalMalePatient: number;
    totalFemalePatient: number;
    totalPatient: number;
}

export interface IPatientsCountAccordingToBranchBetweenTwoDates {
    totalMale: number;
    totalFeMale: number;
    telimedicine: number;
    total: number;
    patientsCountAccordingToBranchBetweenTwoDatesDto: INewPatientCreatedByDateAndBranch[];
}