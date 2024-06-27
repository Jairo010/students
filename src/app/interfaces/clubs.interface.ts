export interface IClub {
    id?: number;
    name:            string;
    description?:     string;
    cardResponsible: string;
}

export interface UpdateClub {
    id:              number;
    name:            string;
    description?:     string;
    cardResponsible: string;
}

