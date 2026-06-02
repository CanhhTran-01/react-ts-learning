
import api from "./api";
import type { User } from "../types";


// ví dụ BE nhả về response 
// [
//   {
//     id: 1,
//     username: "canh",
//     email: "a@gmail.com",
//     role: "user",
//     createdAt: "2026-05-30T10:20:30.000Z",
//     profile: {
//       fullName: "Canh Tran",
//       avatar: "abc.png",
//       bio: "IT Student"
//     }
//   }
// ]

export const UserService = {

    getAll: async (): Promise<User[]> => {
        const { data } = await api.get<User[]>("/users");
        // return data;
        // hoặc ta convert lại data nếu không contract chung giữa BE và FE
        return data.map(item => ({
            id: item.id,
            username: item.username,    
            email: item.email,  
            role: "user" as const,
            createdAt: new Date().toISOString(),
            profile: {
                fullName: item.profile.fullName,
                avatar: item.profile.avatar,
                bio: item.profile.bio,
            },
        }));
    },

    getById: async (id: number): Promise<User> => {
        const { data } = await api.get<User>(`/users/${id}`);
        return data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/users/${id}`);
    },

    
};

