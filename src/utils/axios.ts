import axios, {AxiosHeaders} from 'axios';
import type Keycloak from 'keycloak-js';

let keycloakInstance: Keycloak | null = null;

export const initializeAxiosInterceptors = (keycloak: Keycloak) => {
    keycloakInstance = keycloak;

    axios.interceptors.request.use(async (config) => {
        if (!keycloakInstance?.authenticated) return config;

        await keycloakInstance.updateToken(30);

        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }

        config.headers.set('Authorization', `Bearer ${keycloakInstance.token}`)
        return config;
    });
};