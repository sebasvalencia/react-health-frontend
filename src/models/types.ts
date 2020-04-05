export type IPatients = {
  value: Patient[];
};

export type Patient = {
  id?: number;
  name: string;
  email: string;
  avatarUrl: string;
  rol: number;
  listSickness?: Sickness[];
};

export type PatientToSave = {
  Id?: number;  
  Name: string;
  Email: string;
  AvatarUrl: string;
  Rol: number;
};

export type Sickness = {
  id: number;
  name: string;
  ScientificNotation: string;
  Description: string;
  ImageUrl: string;
};

export type Credentials = {
  Email: string;
  Password: string;
}