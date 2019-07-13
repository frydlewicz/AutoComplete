export enum Status {
    success = 'SUCCESS',
    failure = 'FAILURE',
    duplicate = 'DUPLICATE',
}

export interface IGetRequest {
    text: string;
    useCache?: boolean;
}

export interface IAddRequest {
    display_text: string;
    output_text: string;
    visible?: boolean;
}

export interface IRemoveRequest {
    id: number;
}
