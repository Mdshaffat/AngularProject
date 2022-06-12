export interface IMedicinePagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IMedicine[];
}

export interface IMedicine {
    id: number;
    medicineType: string;
    brandName: string;
    genericName: string;
    manufacturar: string;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}