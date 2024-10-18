import { prismaClient } from "../application/database";
import {
  CreateContactRequest,
  UpdateContactRequest,
  ContactResponse,
  toContactResponse,
  SearchContactRequest,
} from "../model/contact-model";
import { Validation } from "../validation/validation";
import { ContactValidation } from "../validation/contact-validation";
import { Contact, User } from "@prisma/client";
import { ResponseError } from "../response/response-error";
import { Pageable } from "../model/page";
import fs from "fs";
import path from "path";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const record: any = {
      ...createRequest,
      user_id: user.id,  // Hubungkan kontak dengan user melalui user_id
    };

    const contact = await prismaClient.contact.create({
      data: record,
    });

    return toContactResponse(contact);
  }

  static async checkContactMustExists(
    userId: string,
    contactId: string
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  static async get(user: User, id: string): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, id);
    return toContactResponse(contact);
  }

  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest: any = Validation.validate(
      ContactValidation.UPDATE,
      request
    );
    await this.checkContactMustExists(user.id, updateRequest.id);

    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return toContactResponse(contact);
  }

  static async remove(user: User, id: string): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, id);

    if (contact.image) {
      fs.unlinkSync(path.resolve(contact.image)); // Remove the photo file if it exists
    }

    const deletedContact = await prismaClient.contact.delete({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    return toContactResponse(deletedContact);
  }

  // static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
  //     const searchRequest = Validation.validate(ContactValidation.SEARCH, request);
  //     const skip = (searchRequest.page - 1) * searchRequest.size;

  //     const filters = [];
  //     if (searchRequest.name) {
  //         filters.push({
  //             OR: [
  //                 {
  //                     fullname: {
  //                         contains: searchRequest.name
  //                     },
  //                 },
  //             ]
  //         });
  //     }
  //     if (searchRequest.email) {
  //         filters.push({
  //             email: {
  //                 contains: searchRequest.email
  //             }
  //         });
  //     }
  //     if (searchRequest.phone) {
  //         filters.push({
  //             phone: {
  //                 contains: searchRequest.phone
  //             }
  //         });
  //     }

  //     const contacts = await prismaClient.contact.findMany({
  //         where: {
  //             user_id: user.id,
  //             AND: filters
  //         },
  //         take: searchRequest.size,
  //         skip: skip
  //     });

  //     const total = await prismaClient.contact.count({
  //         where: {
  //             user_id: user.id,
  //             AND: filters
  //         },
  //     });

  //     return {
  //         data: contacts.map(contact => toContactResponse(contact)),
  //         paging: {
  //             current_page: searchRequest.page,
  //             total_page: Math.ceil(total / searchRequest.size),
  //             size: searchRequest.size
  //         }
  //     };
  // }

  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<Pageable<ContactResponse>> {
    const searchRequest = Validation.validate(
      ContactValidation.SEARCH,
      request
    );
    const skip = (searchRequest.page - 1) * searchRequest.size;

    // Membangun filter langsung sebagai objek, bukan array
    const filters: any = {
      user_id: user.id, // Pastikan kontak milik user yang sedang login
    };

    // Menambahkan kondisi filter berdasarkan input
    if (searchRequest.name) {
      filters.fullname = { contains: searchRequest.name };
    }
    if (searchRequest.email) {
      filters.email = { contains: searchRequest.email };
    }
    if (searchRequest.phone) {
      filters.phone = { contains: searchRequest.phone };
    }

    // Query untuk mengambil data kontak
    const contacts = await prismaClient.contact.findMany({
      where: filters,
      take: searchRequest.size,
      skip: skip,
    });

    // Query untuk menghitung total kontak yang cocok dengan filter
    const total = await prismaClient.contact.count({
      where: filters,
    });

    // Mengembalikan response dalam format paginated
    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
