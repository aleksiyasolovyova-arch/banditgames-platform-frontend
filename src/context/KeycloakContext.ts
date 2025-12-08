import { createContext } from 'react'
import Keycloak from 'keycloak-js'

export interface KeycloakContextProps {
    keycloak: Keycloak | null
    authenticated: boolean
}

export const KeycloakContext = createContext<KeycloakContextProps | null>(null)