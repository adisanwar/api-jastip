# deliveries API Spec

## Create deliveries

Endpoint : POST /api/contacts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "order_id" : "John Doe",
    "delivery_address" : "John Doe",
    "delivery_status" : "delivered",
    "delivery_date" : 100000,
    "shipping_cost" : 100000,
    "createdAt" : "date",
    "updatedAt" : "date"
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "deliveries created successfully",
  "data" : {
    "order_id" : "John Doe",
    "delivery_address" : "John Doe",
    "delivery_status" : "delivered",
    "delivery_date" : 100000,
    "shipping_cost" : 100000,
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

## Get deliveries

Endpoint : GET /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "deliveries created successfully",
  "data" : {
    "id" : 1,
    "order_id" : "John Doe",
    "delivery_address" : "John Doe",
    "delivery_status" : "delivered",
    "delivery_date" : 100000,
    "shipping_cost" : 100000,
  }
}
```

Response Body (Failed) :

```json
{
    "status": 404,
  "message": "deliveries Not Found",
  "errors" : "deliveries is not found"
}
```

## Update deliveries

Endpoint : PATCH /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "id" : 1,
    "order_id" : "John Doe",
    "delivery_address" : "John Doe",
    "delivery_status" : "delivered",
    "delivery_date" : 100000,
    "shipping_cost" : 100000,
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "deliveries updated successfully",
 "data" : {
    "id" : 1,
    "order_id" : "John Doe",
    "delivery_address" : "John Doe",
    "delivery_status" : "delivered",
    "delivery_date" : 100000,
    "shipping_cost" : 100000,
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

## Remove deliveries

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "deliveries Removed",
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "status": 404,
  "message": "deliveries Not Found",
  "errors" : "deliveries is not found"
}
```

## Search deliveries

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
    "delivery_address" : "John Doe",
    "delivery_status" : "delivered",
    "delivery_date" : 100000,
    "shipping_cost" : 100000,
  },
    {
    "id" : 1,
    "order_id" : "John Doe",
    "delivery_address" : "John Doe",
    "delivery_status" : "delivered",
    "delivery_date" : 100000,
    "shipping_cost" : 100000,
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