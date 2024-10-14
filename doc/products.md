# Product API Spec

## Create Product

Endpoint : POST /api/products

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "name" : "Bakso",
    "description" : "deskripsi",
    "price" : "10,000",
    "image_url": "test",
    "createdAt" : "date",
    "updatedAt" : "date"
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Product created successfully",
  "data" : {
     "name" : "Bakso",
    "description" : "deskripsi",
    "price" : "10,000",
    "image_url": "test",
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

## Get Product

Endpoint : GET /api/products/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Product created successfully",
  "data" : {
    "id" : 1,
    "name" : "Bakso",
    "description" : "deskripsi",
    "price" : "10,000",
    "image_url": "test",
  }
}
```

Response Body (Failed) :

```json
{
    "status": 404,
  "message": "Product Not Found",
  "errors" : "Product is not found"
}
```

## Update Product

Endpoint : PATCH /api/Products/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "data" : {
    "id" : 1,
    "name" : "Bakso",
    "description" : "deskripsi",
    "price" : "10,000",
    "image_url": "test",
  }
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Product updated successfully",
 "data" : {
    "id" : 1,
    "name" : "Bakso",
    "description" : "deskripsi",
    "price" : "10,000",
    "image_url": "test",
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

## Remove Product

Endpoint : DELETE /api/Products/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Product Removed",
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "status": 404,
  "message": "Product Not Found",
  "errors" : "Product is not found"
}
```

## Search Product

Endpoint : GET /api/Products

Query Parameter :
- name : string, Product first name or Product last name, optional
- phone : string, Product phone, optional
- ktp   : number  Product ktp
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
    "name" : "Bakso",
    "description" : "deskripsi",
    "price" : "10,000",
    "image_url": "test",
  },
    {
    "id" : 1,
    "name" : "Bakso",
    "description" : "deskripsi",
    "price" : "10,000",
    "image_url": "test",
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
  "errors" : "Please Login First"
}
```