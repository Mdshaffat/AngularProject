import { IPhysicalState } from './getPhysicalState';

export interface IPhysicalStatPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IPhysicalState[];
}
