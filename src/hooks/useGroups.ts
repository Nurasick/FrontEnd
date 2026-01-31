import { useEffect, useState } from "react";
import { groupsApi, type Group } from "@/api/group";

export function useGroups() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchGroups = async () => {
        try {
        setIsLoading(true);
        const data = await groupsApi.getAll();
        setGroups(data);
        } catch (e) {
        setError("Failed to load groups");
        } finally {
        setIsLoading(false);
        }
    };

    fetchGroups();
    }, []);

    return { groups, isLoading, error };
}
