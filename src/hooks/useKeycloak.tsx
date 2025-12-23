import {KeycloakContext} from "@/context/KeycloakContext";
import {useContext} from "react";

export const useKeycloak = () => {
    const context = useContext(KeycloakContext)

    if (!context) {
        throw new Error("useKeycloak must be used within a KeycloakProvider")
    }

    return context
}

export const useUserId = (): string => {
    const { keycloak } = useKeycloak();

    if (!keycloak?.tokenParsed?.sub) {
        throw new Error("User ID not available");
    }

    return keycloak.tokenParsed.sub;
}
