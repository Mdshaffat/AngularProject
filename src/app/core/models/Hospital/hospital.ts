export interface IHospital {
    id: number;
    name: string;
    address: string;
    divisionId: number;
    division: string;
    upazilaId: number;
    upazila: string;
    districtId: number;
    district: string;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}
