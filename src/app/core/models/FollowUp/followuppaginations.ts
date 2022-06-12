import { IFollowup } from './followup';

export interface IFollowUpPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IFollowup[];
}
