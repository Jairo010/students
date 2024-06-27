export interface ITasks {
    id?:         number,   
    name:        string;
    description: string;
    limitDate:  Date;
    state:       string;
    evidence:    string;
    idProject:   number;
}

export interface IAssignTasks {
    idTask:         number,   
    card:        string;
}