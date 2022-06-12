export interface IMedicine {
    id: number;
    medicineType: string;
    brandName: string;
    genericName: string;
    manufacturarId: number;
    manufacturar: string;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}
