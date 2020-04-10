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

export type IUserSickness = {
  Id?: number;
  Name: string;
  Email: string;
  AvatarUrl: string;
  Rol: number;
  ListSickness: ISickness[];
}

export type IUserSicknessApp = {
  id?: number;
  name: string;
  email: string;
  avatarUrl: string;
  rol: number;
  listSickness: ISicknessApp[];
}

export type IMedicalHistory = {
  Id?: number;
  Description: string;
  Diagnostic: string;
  Treatment: string;
  AppointmentDate: Date | string;
  UserId?: number;
}

export type IMedicalHistoryApp = {
  id: number;
  description: string;
  diagnostic: string;
  treatment: string;
  appointmentDate: Date;
  userId: number;
}

export type IUSickness = {
  Id?: number;
  UserId: number;
  SicknessId: number;
}