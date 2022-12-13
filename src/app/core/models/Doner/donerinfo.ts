export interface IPaginatedDonerInformation {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IDonerInformation[];
}
export interface IDonerInformation {
    id: number;
    name: string;
    mobileNumber: string;
    bloodGroupId: number;
    bloodGroup: string;
    address: string;
    divisionId: number;
    division: string;
    districtId: number;
    district: string;
    upazilaId: number;
    upazila: string;
}
