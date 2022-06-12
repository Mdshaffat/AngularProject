import { IPrescription } from './getPrescriptions';

export interface IprescriptionPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IPrescription[];
}
