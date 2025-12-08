import { type ReactNode, useEffect, useState, useRef, useMemo} from 'react'
import Keycloak from 'keycloak-js'
import { KeycloakContext } from './KeycloakContext'

interface KeycloakProviderProps {
    children: ReactNode
}

export const KeycloakProvider =({children}: KeycloakProviderProps) => {
    const isRun = useRef<boolean>(false)
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        if (isRun.current) return
        isRun.current = true

        const initilaizeKeycloak = async () => {
            const keycloakConfig = {
                //TODO: delete env and instead set it up in Orchestration
                url: import.meta.env.KEYCLOAK_URL as string,
                realm: import.meta.env.KEYCLOAK_REALM as string,
                clientId: import.meta.env.KEYCLOAK_CLIENT_ID as string,
            }
            const keycloakInstance = new Keycloak(keycloakConfig)

            try {
                const isAuthenticated = await keycloakInstance.init({ onLoad: 'check-sso' })
                setAuthenticated(isAuthenticated)
            }catch (error) {
            console.error("Keycloak initialization failed: ",error)
            setAuthenticated(false)
            }finally {
                setKeycloak(keycloakInstance)
            }
        }
        initilaizeKeycloak()
    }, [])
        const value = useMemo(() => ({keycloak, authenticated}), [keycloak, authenticated])
         return (
             <KeycloakContext.Provider value={value}>
                 {children}
             </KeycloakContext.Provider>
         )
}

