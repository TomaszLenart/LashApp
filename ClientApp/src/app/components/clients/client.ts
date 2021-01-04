export interface IClient{
  clientId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  assignDate: Date;
  location: string;
  locationId: string;

}