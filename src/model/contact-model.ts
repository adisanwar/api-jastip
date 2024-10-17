import {Contact} from "@prisma/client";

export type ContactResponse = {
    id: string;
    fullname: string | null;
    image?: string | null;
    phone?: string | null;
    gender?: string | null;
    birth?: Date | null;
    no_nik?:string | null;
}

export type CreateContactRequest = {
    fullname: string;
    image?: string | null;
    phone?: string | null;
    gender?: string | null;
    birth?: Date | null;
    no_nik?:string | null;
}

export type UpdateContactRequest = {
    id: string;
    fullname: string | null;
    image?: string | null;
    phone?: string | null;
    gender?: string | null;
    birth?: Date | null;
    no_nik?:string | null
}

export type RemoveContactRequest = {
    id: number;
}

export type SearchContactRequest = {
    fullname?: string;
    name?: string;
    phone?: string;
    email?: string;
    page: number;
    size: number;
}

export function toContactResponse(contact : Contact): ContactResponse {
    return {
        id: contact.id,
        fullname: contact.fullname,
        image: contact.image,
        gender: contact.gender,
        phone: contact.phone,
        birth: contact.birth,
        no_nik:contact.no_nik
    }
}
