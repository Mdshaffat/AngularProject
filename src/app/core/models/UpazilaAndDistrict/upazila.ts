export interface District {
    id: number;
    name: string;
}

export interface IUpazila {
    id: number;
    name: string;
    districtId: number;
    district: District;
}
