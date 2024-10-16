export class ResponseError extends Error{
    constructor(
      public status: number,
      public message: string,
      public data: any = null
    ) {
        super(message);
    }
  
    static notFound(message: string = "Resource not found", data: any = null) {
      return new ResponseError(404, message, data);
    }
  
    static badRequest(message: string = "Bad request", data: any = null) {
      return new ResponseError(400, message, data);
    }
  
    static unauthorized(message: string = "Unauthorized", data: any = null) {
      return new ResponseError(401, message, data);
    }

    static serverError(message: string = "Internal Server Error", data: any = null) {
        return new ResponseError(500, message, data);
      }
  
    // Kamu bisa menambahkan lebih banyak tipe response error jika dibutuhkan
  }

//   import { ResponseError } from './response-error';

// if (!userHasPermission) {
//   throw ResponseError.forbidden("You do not have permission to access this resource");
// }

// if (requestIsInvalid) {
//   throw ResponseError.unprocessableEntity("The request data is invalid");
// }

// if (tooManyRequests) {
//   throw ResponseError.tooManyRequests("Please wait before sending more requests");
// }

  
//   export class ResponseError extends Error {
//     constructor(public status: number, public message: string) {
//         super(message);
//     }
// }
