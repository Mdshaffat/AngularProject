export interface AllRevenue {
    doctorsName: string;
    branchName: string;
    totalAmount: number;
    member: number;
    nonMember: number;
}

export interface Revenue {
    total: number;
    allRevenue: AllRevenue[];
}
