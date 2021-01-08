export interface IReport {
    id: number;
    name: string;
    // type: ReportType;
    // permissionName: string;
}

export const REPORTS: IReport[] = [
    { id: 0, name: "FincancesReport"},
    { id: 1, name: "ClientsReport" }]