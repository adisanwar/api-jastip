import {Request, Response, NextFunction} from "express";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "../model/user-model";
import {UserService} from "../service/user-service";
import {UserRequest} from "../type/user-request";
import { ResponseError } from "../response/response-error";
import { ResponseSuccess } from "../response/response-success";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
          if (req.body.role === undefined){
            req.body.role = "customer"
          }
          const request: CreateUserRequest = req.body as CreateUserRequest;
          
          // Memanggil service untuk register user
          const response = await UserService.register(request);
    
          // Menggunakan status 201 karena resource baru (user) telah dibuat
          res.status(201).json(ResponseSuccess.created(response, "User created successfully"));
          
        } catch (e) {
          next(e); // Mengoper error lainnya ke middleware
        }
      }

      static async login(req: Request, res: Response, next: NextFunction) {
        try {
          const request: LoginUserRequest = req.body as LoginUserRequest;
          const response = await UserService.login(request);
    
          // Menggunakan ResponseSuccess dengan status 200
          res.status(200).json(ResponseSuccess.success(response, "Login successful"));
          
        } catch (e) {
          next(e);
        }
      }
    
      // Get method
      static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
          const response = await UserService.get(req.user!);
    
          // Response dengan status 200 dan data user
          res.status(200).json(ResponseSuccess.success(response, "User data retrieved successfully"));
          
        } catch (e) {
          next(e);
        }
      }
    
      // Update method
      static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
          const request: UpdateUserRequest = req.body as UpdateUserRequest;
          const response = await UserService.update(req.user!, request);
    
          // Menggunakan status 200 dengan data yang diupdate
          res.status(200).json(ResponseSuccess.success(response, "User updated successfully"));
          
        } catch (e) {
          next(e);
        }
      }
    
      // Logout method
      static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
          await UserService.logout(req.user!);
    
          // Menggunakan ResponseSuccess dengan status 200 dan pesan logout sukses
          res.status(200).json(ResponseSuccess.success(null, "Logout successful"));
          
        } catch (e) {
          next(e);
        }
      }

    // Get all users
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getAll();
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    // Get user by username
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const username: string = req.params.username;
            console.log(username);
            if (!username) {
                throw new ResponseError(400, "Username is required");
            }
            const response = await UserService.getById(username);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
    

    // Remove user by username (new method)
    // static async deleteUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const request: RemoveUserRequest = { username: req.params.username };
    //         await UserService.delete(request.username);
    //         res.status(204).send(); // No Content on successful deletion
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const username: string = req.params.username; // Ensure username is a string
            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const response = await UserService.updateUser(username, request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
    

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const username: string = req.params.username;
            console.log(username)
            await UserService.delete(username);
            res.status(200).json({
                data : 'User Deleted'
            });
        } catch (e) {
            next(e);
        }
    }

}

