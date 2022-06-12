import { IPatient } from './patient';

export interface IPatientPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IPatient[];
}
