
export interface IPhysicalState {
        id: number;
        hospitalId: number;
        hospitalName: string;
        patientId: number;
        patientFirstName: string;
        patientLastName: string;
        visitEntryId: number;
        bloodPressureSystolic: string;
        bloodPressureDiastolic: string;
        heartRate: string;
        bodyTemparature: string;
        heightFeet: number;
        heightInches: number;
        weight: number;
        bmi: number;
        waist: string;
        hip: string;
        spO2: number;
        pulseRate: number;
        isLatest: boolean;
        createdOn: Date;
        createdBy: string;
        editedOn: Date;
        editedBy: string;
    }


