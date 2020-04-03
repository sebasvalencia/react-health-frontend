export type IPatients = {
    value: Patient[];
} 

export type Patient = {
    id?: number;
    name : string;
    email: string;
    avatarUrl: string;
    rol: number;
    listSickness?: Sickness[];
}

export type Sickness = {
    id: number;
    name : string;
    ScientificNotation: string;
    Description: string;
    ImageUrl: string;
}
