export interface IPregnancy {
    id: number;
    patientId: number;
    name: string;
    firstDateOfLastPeriod: Date;
    expectedDateOfDelivery: Date;
    nextCheckup: Date;
}

export interface IPaginatedPregnancy {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IPregnancy[];
}
