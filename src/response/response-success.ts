export class ResponseSuccess{
    constructor(
      public status: number = 200,
      public message: string = "Operation successful", // default message
      public data: any = null
    ) {}
  
    // Method untuk status 200
    static success(data: any, message: string = "Operation successful") {
      return new ResponseSuccess(200, message, data);
    }
  
    // Method untuk status 201 (Created)
    static created(data: any, message: string = "Resource created successfully") {
      return new ResponseSuccess(201, message, data);
    }
  }
  