import {apiClient} from "./client"

export interface Group {
    id: number;
    name: string;
}

export const groupsApi = {
    getAll: async (): Promise<Group[]> => {
    const res = await apiClient.get<Group[]>("/groups");
    return res;
    },
};