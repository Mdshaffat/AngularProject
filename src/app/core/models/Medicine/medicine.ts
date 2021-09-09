export interface IMedicine {
    id: number;
    hospitalId: number;
    hospitalName: string;
    brandName: string;
    genericName: string;
    manufacturar: string;
    unit: number;
    unitPrice: number;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}
