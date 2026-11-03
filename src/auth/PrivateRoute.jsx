import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function PrivateRoute() {
    // On récupère la variable isAuthenticated (boolean) qu inidique si oui ou non le token est bien valide
    const { isAuthenticated } = useAuth()

    // Si cette variable est isAuthenticated 
    return isAuthenticated ? <Outlet /> : <Navigate to='login' />


}