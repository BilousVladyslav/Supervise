import { WorkObjectModel } from './work-object.model';

export class AreaModel {
    id: string;
    title: string;
    description: string;
    location: WorkObjectModel;
    workers_count: number;
    working_now: number;
}

export class CreateAreaModel {
    title: string;
    description: string;
    location: string;
    workers_count: number;
}
