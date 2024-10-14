# store API Spec

## Create store

Endpoint : POST /api/contacts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "name" : "Toko Berkah",
    "description" : "deskripsi",
    "location" : "Tanah Abang",
    "createdAt" : "date",
    "updatedAt" : "date"
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "store created successfully",
  "data" : {
    "name" : "Toko Berkah",
    "description" : "deskripsi",
    "location" : "Tanah Abang",
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

## Get store

Endpoint : GET /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "store created successfully",
  "data" : {
    "id" : 1,
    "name" : "Toko Berkah",
    "description" : "deskripsi",
    "location" : "Tanah Abang",
  }
}
```

Response Body (Failed) :

```json
{
    "status": 404,
  "message": "store Not Found",
  "errors" : "store is not found"
}
```

## Update store

Endpoint : PATCH /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "id" : 1,
    "name" : "Toko Berkah",
    "description" : "deskripsi",
    "location" : "Tanah Abang",
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "store updated successfully",
 "data" : {
    "id" : 1,
    "name" : "Toko Berkah",
    "description" : "deskripsi",
    "location" : "Tanah Abang",
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

## Remove store

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "store Removed",
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "status": 404,
  "message": "store Not Found",
  "errors" : "store is not found"
}
```

## Search store

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
    "name" : "Toko Berkah",
    "description" : "deskripsi",
    "location" : "Tanah Abang",
  },
    {
    "id" : 1,
    "name" : "Toko Berkah",
    "description" : "deskripsi",
    "location" : "Tanah Abang",
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