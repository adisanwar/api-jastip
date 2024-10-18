import {Address, User} from "@prisma/client";
import {
    AddressResponse,
    CreateAddressRequest,
    GetAddressRequest, RemoveAddressRequest,
    toAddressResponse,
    UpdateAddressRequest
} from "../model/address-model";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {ContactService} from "./contact-service";
import {prismaClient} from "../application/database";
import {ResponseError} from "../response/response-error";

export class AddressService {

    // static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    //     // Validasi input request
    //     const createRequest: any = Validation.validate(AddressValidation.CREATE, request);
    
    //     // Pastikan kontak yang sesuai dengan user dan contactId ada
    //     await ContactService.checkContactMustExists(user.id, request.contactId);
    
    //     // Buat data address
    //     const address = await prismaClient.address.create({
    //         data: {
    //             contact_id: createRequest.contactId,  // Gunakan contact_id sesuai dengan relasi
    //             street: createRequest.street,
    //             city: createRequest.city,
    //             province: createRequest.province,
    //             country: createRequest.country,
    //             postalCode: createRequest.postalCode,
    //         },
    //     });
    
    //     return toAddressResponse(address);
    // }
    

    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest : any = Validation.validate(AddressValidation.CREATE, request);
        await ContactService.checkContactMustExists(user.id, request.contact_id);

        const address = await prismaClient.address.create({
            data: createRequest
        });

        return toAddressResponse(address);
    }

    static async checkAddressMustExists(contactId: string, addressId: string): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        });

        if (!address) {
            throw new ResponseError(404, "Address is not found");
        }

        return address;
    }

    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = Validation.validate(AddressValidation.GET, request);
        await ContactService.checkContactMustExists(user.id, request.contact_id);
        const address = await this.checkAddressMustExists(getRequest.contact_id, getRequest.id);

        return toAddressResponse(address);
    }

    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.UPDATE, request);
        await ContactService.checkContactMustExists(user.id, request.contact_id);
        await this.checkAddressMustExists(updateRequest.contact_id, updateRequest.id);

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        })

        return toAddressResponse(address);
    }

    static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
        const removeRequest = Validation.validate(AddressValidation.GET, request);
        await ContactService.checkContactMustExists(user.username, request.contact_id);
        await this.checkAddressMustExists(removeRequest.contact_id, removeRequest.id);

        const address = await prismaClient.address.delete({
            where: {
                id: removeRequest.id
            }
        });

        return toAddressResponse(address);
    }

    static async list(user: User, contactId: string): Promise<Array<AddressResponse>> {
        await ContactService.checkContactMustExists(user.id, contactId);

        const addresses = await prismaClient.address.findMany({
            where:{
                contact_id: contactId
            }
        });

        return addresses.map((address) => toAddressResponse(address));
    }

}
