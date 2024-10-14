# order API Spec

## Create order

Endpoint : POST /api/contacts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "order_id" : "John Doe",
    "user_id" : "John Doe",
    "product_id" : "John Doe",
    "qty" : 1,
    "total" : 100000,
    "status" : "Pending",
    "createdAt" : "date",
    "updatedAt" : "date"
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "order created successfully",
  "data" : {
    "order_id" : "John Doe",
    "user_id" : "John Doe",
    "product_id" : "John Doe",
    "qty" : 1,
    "total" : 100000,
    "status" : "Pending",
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

## Get order

Endpoint : GET /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "order created successfully",
  "data" : {
    "id" : 1,
    "order_id" : "John Doe",
    "user_id" : "John Doe",
    "product_id" : "John Doe",
    "qty" : 1,
    "total" : 100000,
    "status" : "Pending",
  }
}
```

Response Body (Failed) :

```json
{
    "status": 404,
  "message": "order Not Found",
  "errors" : "order is not found"
}
```

## Update order

Endpoint : PATCH /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "id" : 1,
    "order_id" : "John Doe",
    "user_id" : "John Doe",
    "product_id" : "John Doe",
    "qty" : 1,
    "total" : 100000,
    "status" : "Pending",
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "order updated successfully",
 "data" : {
    "id" : 1,
    "order_id" : "John Doe",
    "user_id" : "John Doe",
    "product_id" : "John Doe",
    "qty" : 1,
    "total" : 100000,
    "status" : "Pending",
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

## Remove order

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "order Removed",
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "status": 404,
  "message": "order Not Found",
  "errors" : "order is not found"
}
```

## Search order

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
    "order_id" : "John Doe",
    "user_id" : "John Doe",
    "product_id" : "John Doe",
    "qty" : 1,
    "total" : 100000,
    "status" : "Pending",
  },
    {
    "id" : 1,
    "order_id" : "John Doe",
    "user_id" : "John Doe",
    "product_id" : "John Doe",
    "qty" : 1,
    "total" : 100000,
    "status" : "Pending",
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