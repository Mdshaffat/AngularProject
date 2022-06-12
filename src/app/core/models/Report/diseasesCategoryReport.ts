export interface Ages {
    zeroToFive: number;
    sixToFifteen: number;
    sixteenToThirty: number;
    thirtyOneToFourtyFive: number;
    fourtyFiveToSixty: number;
    sixtyPlus: number;
    total: number;
}
export interface GenderMale {
    name: string;
    ages: Ages;
}
export interface GenderFemale {
    name: string;
    ages: Ages;
}
export interface GenderOthers {
    name: string;
    ages: Ages;
}
export interface DiagnosisReport {
    categoryId: number;
    categoryName: string;
    total: number;
    upToPreviousMonth: number;
    comulativeUpToThisMonth: number;
    genderMale: GenderMale;
    genderFemale: GenderFemale;
    genderOthers: GenderOthers;
}

export interface IDiseasesCategoryReport {
    hospitalId: number;
    hospitalName: string;
    monthName: string;
    year: number;
    firstName: string;
    lastName: string;
    designation: string;
    checkedBy: string;
    diagnosisReport: DiagnosisReport[];
    upToPreviousMonthTotal: number;
    mZeroToFiveTotal: number;
    mSixToFifteenTotal: number;
    mSixteenToThirtyTotal: number;
    mThirtyOneToFourtyFiveTotal: number;
    mFourtyFiveToSixtyTotal: number;
    mSixtyPlusTotal: number;
    mAgeGroupTotal: number;
    fmZeroToFiveTotal: number;
    fmSixToFifteenTotal: number;
    fmSixteenToThirtyTotal: number;
    fmThirtyOneToFourtyFiveTotal: number;
    fmFourtyFiveToSixtyTotal: number;
    fmSixtyPlusTotal: number;
    fmAgeGroupTotal: number;
    thisMonthTotal: number;
    comulativeUpToThisMonthTotal: number;
}

