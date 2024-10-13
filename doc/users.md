# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "id": 1,
  "username": "Adi",
  "password": "rahasia",
  "email": "adi@adi.com",
  "status": "true/false",
  "last_login": "admin/user",
  "role": "admin/user/toko",
  "createdAt": "date",
  "updatedAt": "date"
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "User created successfully",
  "data": {
    "username": "Adi",
    "name": "Adi",
    "email": "adi@adi.com",
    "status": "true/false",
    "role": "admin/user/toko"
  }
}
```

Response Body (Failed) :

```json
{
  "status": 400,
  "message": "Bad  Request",
  "errors": {
    "error_code": "Username must not blank, ...",
    "error_message": "Field 'email' must be a valid email address."
  }
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "Adi",
  "email": "adi@adi.com",
  "password": "rahasia",
  "role": "admin"
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Login successfully",
  "data": {
    "username": "Adi",
    "name": " Adi",
    "token": "uuid",
    "role": "admin"
  }
}
```

Response Body (Failed) :

```json
{
  "status" : 400,
  "message" : "Bad  Request",
  "errors" : {
    "errors" : "Username or password wrong, ..."
    }
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "status": 200,
  "message": "User created successfully",
  "data": {
    "username": "Adi",
    "email": "Adi@adi.com",
    "role" : "admin",
    "last_login" : "date",
    "status" : "active"
  }
}
```

Response Body (Failed) :

```json
{
  "status": 401,
  "message": "Unauthorize",
  "errors": "Please Login First"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "password": "rahasia", // tidak wajib
  "name": " Adi" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "Adi",
    "name": " Adi"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```
