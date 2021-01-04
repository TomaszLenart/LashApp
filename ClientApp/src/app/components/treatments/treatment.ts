export interface ITreatment {
    treatmentId: number;
    active: boolean;
    name: string;
    activeFrom: Date;
    activeTo: Date;
    price: number;
    duration: string;
    shortDescription: string;
    details: string;
}