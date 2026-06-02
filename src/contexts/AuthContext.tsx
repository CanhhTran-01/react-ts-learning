
import { createContext, useContext, useState } from "react";
import type { User } from "../types";
import api from "../services/api";

interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void;
}

// tạo AuthContext dùng chung toàn app
const AuthContext = createContext<AuthContextType | null>(null);

// ← bọc ngoài app trong main.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {

    // tạo userState
    const [user, setUser] = useState<User | null>(null);

    // API login
    const login = async (email: string, password: string) => {
        const { data } = await api.post("/login", { email, password });

        localStorage.setItem("token", data.token);
        setUser(data.user);
    };

    // logout
    const logout = () => {
        
        setUser(null);
        localStorage.removeItem("token");
    };

    // phát dữ liệu auth cho toàn bộ component bên trong nó. Tất cả component dùng useAuth() sẽ nhận được
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// ← dùng trong mọi component cần auth
export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth phải dùng trong AuthProvider");
    return context;
}