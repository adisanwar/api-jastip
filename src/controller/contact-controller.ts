import { Request, Response, NextFunction } from "express";
import { CreateContactRequest, UpdateContactRequest, SearchContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";
import { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";
import path from "path";
// import { deleteOldFile, getDestinationFolder, handleFileUpload } from "../middleware/upload-middleware";
import { ResponseSuccess } from "../response/response-success";
import { ResponseError } from "../response/response-error";

export class ContactController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest;
            // handleFileUpload(req, request);
            const response = await ContactService.create(req.user!, request);
            logger.debug("response : " + JSON.stringify(response));

            // Menggunakan ResponseSuccess
            res.status(201).json(ResponseSuccess.created(response, "Contact created successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = String(req.params.contactId);
            const response = await ContactService.get(req.user!, contactId);
            logger.debug("response : " + JSON.stringify(response));

            // Menggunakan ResponseSuccess
            res.status(200).json(ResponseSuccess.success(response, "Contact retrieved successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contact = await ContactService.get(req.user!, String(req.params.contactId));
            const request: UpdateContactRequest = req.body as UpdateContactRequest;
            request.id = String(req.params.contactId);
            // getDestinationFolder('contact');
            
            // if (contact.image) {
            //     deleteOldFile(contact.image);
            // }
            // handleFileUpload(req, request);

            const response = await ContactService.update(req.user!, request);
            logger.debug("response : " + JSON.stringify(response));

            // Menggunakan ResponseSuccess
            res.status(200).json(ResponseSuccess.success(response, "Contact updated successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = String(req.params.contactId);
            await ContactService.remove(req.user!, contactId);
            logger.debug("Contact removed: " + contactId);

            // Menggunakan ResponseSuccess
            res.status(200).json(ResponseSuccess.success(null, "Contact deleted successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchContactRequest = {
                name: req.query.name as string,
                email: req.query.email as string,
                phone: req.query.phone as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            };
            const response = await ContactService.search(req.user!, request);
            logger.debug("response : " + JSON.stringify(response));

            // Menggunakan ResponseSuccess
            res.status(200).json(ResponseSuccess.success(response, "Contacts retrieved successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }
}
