import { IVisitEntry } from './visitEntry';

export interface IVisitEntryPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IVisitEntry[];
}
