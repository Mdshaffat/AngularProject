export interface IFollowup {
    id: number;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    patientMobileNumber: string;
    followupDate: Date;
    doctorFirstName: string;
    doctorLastName: string;
    lastVisitHospital: string;
    lastVisitDate: Date;
    prescriptionId: number;
    isFollowup: boolean;
}
