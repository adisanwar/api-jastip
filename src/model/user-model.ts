import {User} from "@prisma/client";

export type UserResponse = {
    id : string;
    username: string;
    password: string;
    email?: string;
    token?: string;
    status?: boolean;
    role: string;
}

export type CreateUserRequest = {
    username: string;
    password: string;
    email?: string;
    token?: string;
    status?: boolean;
    role?: string;
}


export type LoginUserRequest = {
    username: string;
    email:string;
    password: string;
    role: string;
}

export type UpdateUserRequest = {
    username: string;
    password: string;
    email?: string;
    token?: string;
    status?: boolean;
    role?: string;
}

// export type RemoveUserRequest = {name: user.name,
//     username: user.username,
//     role: user.role,
//     id: string;
// }

export function toUserResponse(user: User): UserResponse {
    return {
    username: user.username,
    password: user.password,
    email: user.email,
    token: user.token,
    status: user.status,
    role: user.role,
    }
}
