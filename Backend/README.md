# /users/register Endpoint Documentation

## Description
The `/users/register` endpoint registers a new user. It accepts POST requests and expects the client to send a JSON payload containing user details.

## Request Data
The endpoint requires the following data in the request body:

- **email**: A valid email address.
- **fullname**: An object containing:
  - **firstname**: A string with a minimum length of 3 characters.
  - **lastname**: A string with a minimum length of 3 characters.
- **password**: A string with a minimum length of 6 characters.

### Example Request Body
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "secret123"
}
```

## Response Status Codes
- **201**: Registration successful. Returns a JSON object containing a JWT token and the registered user.
- **400**: Validation error. Returns details of the invalid fields.
- **500**: Server error. Returns an error message.

## Usage
Send a POST request to `/users/register` with the specified JSON payload to create a new user.

# /users/login Endpoint Documentation

## Description
The `/users/login` endpoint logs in an existing user by verifying their credentials. It accepts POST requests with JSON data containing the user's email and password.

## Request Data
The endpoint requires the following data in the request body:

- **email**: A valid email address.
- **password**: A string with a minimum length of 6 characters.

### Example Request Body
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

## Response Status Codes
- **200**: Login successful. Returns a JSON object containing a JWT token and the user details.
- **400**: Validation error. Returns details of the invalid fields.
- **401**: Unauthorized. Returned when the email or password is incorrect.
- **500**: Server error. Returns an error message.

## Usage
Send a POST request to `/users/login` with the specified JSON payload to authenticate the user.
