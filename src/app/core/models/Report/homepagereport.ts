export interface WeeklyDataCount {
    count: number;
    lastDate: string;
}

export interface HomePageReport {
    monthName: string;
    totalData: number;
    weeklyDataCounts: WeeklyDataCount[];
}
