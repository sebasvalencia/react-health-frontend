export type IPatients = {
  value: Patient[];
};

export type Patient = {
  id?: number;
  name: string;
  email: string;
  avatarUrl: string;
  rol: number;
  listSickness?: ISickness[];
};

export type PatientToSave = {
  Id?: number;
  Name: string;
  Email: string;
  AvatarUrl: string;
  Rol: number;
};

export type ISickness = {
  Id?: number;
  Name: string;
  ScientificNotation: string;
  Description: string;
  ImageUrl: string;
};

export type ISicknessApp = {
  id: number;
  name: string;
  scientificNotation: string;
  description: string;
  imageUrl: string;
};

export type Credentials = {
  Email: string;
  Password: string;
};
