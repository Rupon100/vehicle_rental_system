# Vehicle Rental System
### Live Link:  https://vehicle-rental-system-ashy.vercel.app/

## Features
### 🔐 Authentication & Authorization
- User registration & login
- Password hashing with bcrypt
- JWT-based authentication
- Role-based access (admin, customer)

### 🚙 Vehicle Management
- Add, update, delete vehicles
- Fetch all vehicles or by ID
- Check availability status
- Prevent booking unavailable vehicles

### 🧑‍🤝‍🧑 User & Customer Handling
- Create users with roles
- Manage customer data
- Fetch profile details

### 📅 Booking System
- Create a booking
- Prevent overlapping bookings
- Get bookings by user or by vehicle
- Auto update vehicle availability

## Technology stack
| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| Auth | JWT, bcrypt |
| DB Driver | `pg` |
| Environment | dotenv |
| Validation | custom validation |


## Setup
Follow the steps below to set up the project locally
### 1 Clone the Repository
- git clone https://github.com/Rupon100/vehicle_rental_system.git
- cd vehicle-rental-system
### 2 Install Dependencies
- npm install
### Create .env
- JWT_TOKEN ( create it your own )
- CONNECTION_STRING ( Go to neon -> create a project -> click connect button -> get the connection string -> paste it on .env )
### Start Development Server Locally
- npm run dev

## Usage Instructions

This section explains how to use every API endpoint in the Vehicle Rental System.
All protected routes require a JWT token, provided after login:

Authorization: Bearer <jwt_token>

🔐 Authentication Endpoints
1. User Registration

Access: Public
Registers a new user.

POST /api/v1/auth/signup

Request Body

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}


Success Response

{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "01712345678",
    "role": "customer"
  }
}

2. User Login

Access: Public
Returns a JWT token.

POST /api/v1/auth/signin

Request Body

{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}


Success Response

{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "customer"
    }
  }
}

🚗 Vehicle Endpoints
3. Create Vehicle

Access: Admin only

POST /api/v1/vehicles

Headers

Authorization: Bearer <jwt_token>


Request Body

{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}


Success Response

{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "id": 1,
    "vehicle_name": "Toyota Camry 2024",
    "type": "car",
    "registration_number": "ABC-1234",
    "daily_rent_price": 50,
    "availability_status": "available"
  }
}

4. Get All Vehicles

Access: Public

GET /api/v1/vehicles

Success Response

{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [...]
}

5. Get Vehicle by ID

Access: Public

GET /api/v1/vehicles/:vehicleId

Success Response

{
  "success": true,
  "message": "Vehicle retrieved successfully",
  "data": { ... }
}

6. Update Vehicle

Access: Admin only

PUT /api/v1/vehicles/:vehicleId

Headers

Authorization: Bearer <jwt_token>


Request Body (optional fields)

{
  "vehicle_name": "Toyota Camry 2024 Premium",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 55,
  "availability_status": "available"
}


Success Response

{
  "success": true,
  "message": "Vehicle updated successfully",
  "data": { ... }
}

7. Delete Vehicle

Access: Admin only
Deletes vehicle if no active bookings exist.

DELETE /api/v1/vehicles/:vehicleId

Success Response

{
  "success": true,
  "message": "Vehicle deleted successfully"
}

👥 User Endpoints
8. Get All Users

Access: Admin only

GET /api/v1/users

Headers

Authorization: Bearer <jwt_token>


Success Response

{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [...]
}

9. Update User

Access: Admin OR Own profile

PUT /api/v1/users/:userId

Headers

Authorization: Bearer <jwt_token>


Request Body (optional)

{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567899",
  "role": "admin"
}


Success Response

{
  "success": true,
  "message": "User updated successfully",
  "data": { ... }
}

10. Delete User

Access: Admin only

DELETE /api/v1/users/:userId

Success Response

{
  "success": true,
  "message": "User deleted successfully"
}

📅 Booking Endpoints
11. Create Booking

Access: Customer or Admin
Automatically calculates pricing & updates vehicle availability.

POST /api/v1/bookings

Headers

Authorization: Bearer <jwt_token>


Request Body

{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}


Success Response

{
  "success": true,
  "message": "Booking created successfully",
  "data": { ... }
}

12. Get All Bookings

Access:

Admin → sees all bookings

Customer → sees only their bookings

GET /api/v1/bookings

Headers

Authorization: Bearer <jwt_token>


Success Response (admin/customer)
Returns data based on role.

13. Update Booking

Access:

Customer → can cancel

Admin → can mark as returned

PUT /api/v1/bookings/:bookingId

Headers

Authorization: Bearer <jwt_token>

Customer Cancel Example
{ "status": "cancelled" }

Admin Mark Returned Example
{ "status": "returned" }


Success Responses

Booking cancelled

Booking marked returned + vehicle made available