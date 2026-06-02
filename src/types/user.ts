export type UserRole = "admin" | "editor" | "viewer" | "user";

interface Profile {
    fullName: string,
    avatar: string,
    bio: string | null
}

export interface User {
    id: number,
    username: string,
    email: string
    role: UserRole,
    createdAt: string,
    profile: Profile
}

