import { type ReactNode, useEffect, useState, useRef, useMemo} from 'react'
import Keycloak from 'keycloak-js'
import { KeycloakContext } from './KeycloakContext'
import { initializeAxiosInterceptors} from "@/utils/axios.ts";
import axios from "axios";
import {Loader2} from "lucide-react";

interface KeycloakProviderProps {
    children: ReactNode
}

export const KeycloakProvider =({children}: KeycloakProviderProps) => {
    const isRun = useRef<boolean>(false)
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    useEffect(() => {
        if (isRun.current) return
        isRun.current = true

        const initilaizeKeycloak = async () => {
            const keycloakConfig = {
                url: `http://${import.meta.env.VITE_KEYCLOAK_URL}`,
                realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
                clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string,
            }
            const keycloakInstance = new Keycloak(keycloakConfig)

            try {
                const isAuthenticated = await keycloakInstance.init({ onLoad: 'check-sso' })
                setAuthenticated(isAuthenticated)

                if (isAuthenticated) {
                    const pendingRegistration = localStorage.getItem('pending_registration');

                    if (pendingRegistration === 'true') {
                        try {
                            await axios.post(
                                `http://${import.meta.env.VITE_BACKEND_URL}/players`,
                                    null,
                                {
                                    headers: {
                                        Authorization: `Bearer ${keycloakInstance.token}`
                                    }
                                }
                            );
                            console.log('Player profile created successfully');
                        } catch (error) {
                            console.error('Failed to sync player profile:', error);
                        } finally {
                            localStorage.removeItem('pending_registration');
                        }
                    }
                }
            }catch (error) {
                console.error("Keycloak initialization failed: ",error)
                setAuthenticated(false)
            }finally {
                setKeycloak(keycloakInstance)
                initializeAxiosInterceptors(keycloakInstance)
                setIsInitialized(true)
            }
        }
        initilaizeKeycloak()
    }, [])
        const value = useMemo(() => ({keycloak, authenticated, isInitialized}), [keycloak, authenticated, isInitialized])
    if (!isInitialized) {
        return <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
    }

    return (
        <KeycloakContext.Provider value={value}>
            {children}
        </KeycloakContext.Provider>
    )
}

