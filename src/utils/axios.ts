import axios from "axios";
import Keycloak from "keycloak-js";

let interceptorId: number | null = null;

export const initializeAxiosInterceptors = (keycloak: Keycloak) => {
    if (interceptorId !== null) {
        axios.interceptors.request.eject(interceptorId);
    }

    interceptorId = axios.interceptors.request.use(
        async (config) => {
            if (keycloak.authenticated && keycloak.token) {
                try {
                    await keycloak.updateToken(30);

                    config.headers.Authorization = `Bearer ${keycloak.token}`;
                } catch (error) {
                    console.error("Failed to refresh token", error);
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};