# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "fullname" : "Adi S. Anwar",
    "phone" : "089999999",
    "birth" : "12/12/1290",
    "no_nik": "1234",
    "createdAt" : "date",
    "updatedAt" : "date"
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Contact created successfully",
  "data" : {
     "fullname" : "Adi S. Anwar",
    "phone" : "089999999",
    "birth" : "12/12/1290",
    "no_nik": "1234",
  }
}
```

Response Body (Failed) :

```json
{
  "status": 400,
  "message": "Bad  Request",
  "errors": {
    "error_code": "Name must not blank, ...",
    "error_message": "Field 'email' must be a valid email address."
  }
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Contact created successfully",
  "data" : {
    "id" : 1,
    "fullname" : "Adi S. Anwar",
    "phone" : "089999999",
    "birth" : "12/12/1290",
    "no_nik": "1234",
  }
}
```

Response Body (Failed) :

```json
{
    "status": 404,
  "message": "Contact Not Found",
  "errors" : "Contact is not found"
}
```

## Update Contact

Endpoint : PATCH /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "id" : 1,
    "fullname" : "Adi S. Anwar",
    "phone" : "089999999",
    "birth" : "12/12/1290",
    "no_nik": "1234",
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Contact updated successfully",
 "data" : {
    "id" : 1,
    "fullname" : "Adi S. Anwar",
    "phone" : "089999999",
    "birth" : "12/12/1290",
    "no_nik": "1234",
  }
}
```

Response Body (Failed) :

```json
{
  "status": 400,
  "message": "Bad Request",
  "errors" : "fullname must not blank, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Contact Removed",
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "status": 404,
  "message": "Contact Not Found",
  "errors" : "Contact is not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :
- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- ktp   : number  contact ktp
- page : number, default 1
- size : number, default 10

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Success",
  "data" : [
    {
    "id" : 1,
    "fullname" : "Adi S. Anwar",
    "phone" : "089999999",
    "birth" : "12/12/1290",
    "no_nik": "1234",
  },
    {
    "id" : 1,
    "fullname" : "Adi S. Anwar",
    "phone" : "089999999",
    "birth" : "12/12/1290",
    "no_nik": "1234",
    }
  ],
  "paging" : {
    "current_page" : 1,
    "total_page" : 10,
    "size" : 10
  }
}
```

Response Body (Failed) :

```json
{
  "status": 401,
  "message": "Unauthorized",
  "errors" : "Unauthorized"
}
```