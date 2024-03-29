import React, { createContext, useState, useContext } from 'react'

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged')

        // se houver conteúdo 
        return !!isLogged
    })

    const signIn = (email: string, password: string) => {
        if(email === 'fiama@email.com' && password === '123') {
            localStorage.setItem('@minha-carteira:logged', 'true')
            setLogged(true)
        } else {
            alert('Usuário ou senha inválidos')
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged')
        setLogged(false)
    }

    return (
        <AuthContext.Provider value={{ logged, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }