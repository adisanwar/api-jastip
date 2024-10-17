import {
    CreateUserRequest,
    LoginUserRequest,
    toUserResponse,
    UpdateUserRequest,
    UserResponse
} from "../model/user-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {prismaClient} from "../application/database";
import {ResponseError} from "../response/response-error";
import bcrypt, { compare } from "bcrypt";
import {v4 as uuid} from "uuid";
import {User} from "@prisma/client";
import { ResponseSuccess } from "../response/response-success";

export class UserService {

    static async register(request: CreateUserRequest): Promise<UserResponse> {
        // Validasi input menggunakan Zod
        const registerRequest: any = Validation.validate(UserValidation.REGISTER, request);
    
        // Set default value for role if not provided
        if (!registerRequest.role) {
            registerRequest.role = 'customer';
        }
    
        // Cek apakah username sudah ada di database
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        });

         // Cek apakah username sudah ada di database
         const cekEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        });

        if (cekEmail > 0) {
            throw ResponseError.badRequest("Email already exists");
        }
    
        if (totalUserWithSameUsername > 0) {
            throw ResponseError.badRequest("Username already exists");
        }
    
        // Hash password sebelum disimpan
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    
        // Membuat user baru di database
        const user = await prismaClient.user.create({
            data: registerRequest
        });
        return toUserResponse (registerRequest);
    }
    
    

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        // Validasi input menggunakan Zod
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        // Cari user berdasarkan username atau email
        const user = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { username: loginRequest.username },
                    { email: loginRequest.email }
                ]
            }
        });

        // Jika user tidak ditemukan atau password salah, lempar error
        if (!user) {
            throw ResponseError.unauthorized("Username/Email or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw ResponseError.unauthorized("Username/Email or password is wrong");
        }

        // Update user dengan token baru
        const updatedUser = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: uuid()
            }
        });

        // Mengonversi user menjadi UserResponse, dan menambahkan token
        const response = toUserResponse(updatedUser);
        response.token = updatedUser.token!;  // Token harus ada karena baru saja di-update

        // Mengembalikan respons sukses
        return response;
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }
    

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        // Validasi input menggunakan Zod
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    
        // Pastikan untuk menggunakan ID user yang sedang login jika tidak disediakan dalam request
        const userId = updateRequest.id || user.id;
    
        // Jika password disediakan, hash password baru
        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }
    
        try {
            // Update user di database
            const result = await prismaClient.user.update({
                where: {
                    id: userId
                },
                data: {
                    username: updateRequest.username ?? user.username,
                    password: user.password,
                    email: updateRequest.email ?? user.email,
                    role: updateRequest.role ?? user.role,
                    status: updateRequest.status ?? user.status
                }
            });
    
            // Mengembalikan response sukses
            return toUserResponse(result);
    
        } catch (error) {
            // Menangani kesalahan jika update gagal
            throw ResponseError.serverError("Failed to update user");
        }
    }
    
    

    static async logout(user: User): Promise<ResponseSuccess> {
        try {
            // Mengupdate user untuk menghapus token
            const result = await prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: {
                    token: null
                }
            });
    
            // Mengembalikan respons sukses setelah logout
            return ResponseSuccess.success(toUserResponse(result), "User logged out successfully");
    
        } catch (error) {
            // Menangani kesalahan jika logout gagal
            throw ResponseError.serverError("Failed to logout user");
        }
    }
    

    static async getAll(): Promise<ResponseSuccess> {
        try {
            const users = await prismaClient.user.findMany();
            return ResponseSuccess.success(users.map(user => toUserResponse(user)), "Users retrieved successfully");
        } catch (error) {
            throw ResponseError.serverError("Failed to retrieve users");
        }
    }
    

    static async getById(id: string): Promise<ResponseSuccess> {
        if (!id) {
            throw ResponseError.badRequest("User ID is required");
        }
    
        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            }
        });
    
        if (!user) {
            throw ResponseError.notFound("User not found");
        }
    
        // Mengembalikan response sukses dengan data user yang ditemukan
        return ResponseSuccess.success(toUserResponse(user), "User retrieved successfully");
    }
    
    static async delete(id: string): Promise<void> {
        // Find the existing user
        const existingUser = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        });
    
        if (!existingUser) {
            throw new ResponseError(404, "User not found");
        }
    
        // Find the associated contact
        const contact = await prismaClient.contact.findFirst({
            where: {
                id: id
            }
        });
    
        if (contact) {
            // Delete all addresses related to the contact
            await prismaClient.address.deleteMany({
                where: {
                    contact_id: contact.id
                }
            });
    
    
            // Delete the contact
            await prismaClient.contact.delete({
                where: {
                    id: contact.id
                }
            });
        }
    
        // Delete the user
        await prismaClient.user.delete({
            where: {
                id: id
            }
        });
    }
    
    
}


