import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface UserPermissions {
    canAssignJob: boolean;
    canChangePriority: boolean;
}

interface User {
    id: number;
    name: string;
    position: string;
    permissions: UserPermissions;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null); 
    const token = ref<string | null>(null);

    const isAuthenticated = computed(() => !!token.value && !!user.value);

    const permissions = computed<UserPermissions>(() => {
        if (!user.value) {
            return { canAssignJob: false, canChangePriority: false };
        }
        return user.value.permissions;
    });

    function login(userData: User, authToken: string) {
        user.value = userData;
        token.value = authToken;
    }

    function logout() {
        user.value = null;
        token.value = null;
    }

    return { user, token, isAuthenticated, permissions, login, logout };
});