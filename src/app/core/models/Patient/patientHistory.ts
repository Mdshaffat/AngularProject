    export interface PatientVital {
        id: number;
        patientId: number;
        patientFirstName: string;
        patientLastName: string;
        hospitalId: number;
        hospitalName: string;
        height: string;
        weight: string;
        bmi: number;
        waist: string;
        hip: string;
        spO2: number;
        pulseRate: number;
        isLatest: boolean;
        updatedBy: string;
        updatedAt: Date;
    }

    export interface Patient {
        id: number;
        hospitalId: number;
        hospitalName: string;
        firstName: string;
        lastName: string;
        age: string;
        mobileNumber: string;
        doB: Date;
        gender: string;
        maritalStatus: string;
        primaryMember: boolean;
        address: string;
        divisionId: number;
        division: string;
        upazilaId: number;
        upazila: string;
        districtId: number;
        district: string;
        nid: string;
        bloodGroup: string;
        branchId: number;
        branchName: string;
        isActive: boolean;
        note: string;
        createdOn: Date;
        createdBy: string;
        updatedOn: Date;
        updatedBy: string;
        patientVitals: PatientVital[];
    }

    export interface VisitEntry {
        id: number;
        hospitalId: number;
        hospitalName: string;
        date: Date;
        patientId: number;
        patientFirstName: string;
        patientLastName: string;
        serial: string;
        status: string;
    }

    export interface Prescription {
        id: number;
        hospitalId: number;
        hospitalName: string;
        patientId: number;
        patientFirstName: string;
        patientLastName: string;
        patientMobile: string;
        doctorId: string;
        doctorFirstName: string;
        doctorLastName: string;
        visitEntryId: number;
        doctorsObservation: string;
        physicalStateId: number;
        adviceMedication: string;
        adviceTest: string;
        note: string;
        createdOn: Date;
        updatedOn: Date;
    }

    export interface PhysicalState {
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
        weight: string;
        createdOn: Date;
        createdBy: string;
        editedOn: Date;
        editedBy: string;
    }

    export interface IPatientHistory {
        patient: Patient;
        visitEntries: VisitEntry[];
        prescription: Prescription[];
        physicalState: PhysicalState[];
    }

