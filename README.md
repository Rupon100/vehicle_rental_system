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
### 3 Create .env
- JWT_TOKEN ( create it your own )
- CONNECTION_STRING ( Go to neon -> create a project -> click connect button -> get the connection string -> paste it on .env )
### 4 Start Development Server Locally
- npm run dev

## Usage Instructions
This section explains how to use every API endpoint in the Vehicle Rental System.
All protected routes require a JWT token, provided after login:
- Authorization: Bearer <jwt_token>

#### Authentication Endpoints
1. User Registration
- Access: Public
- Registers a new user.
##### POST /api/v1/auth/signup
- Request Body
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}

2. User Login
- Access: Public
- Returns a JWT token.
##### POST /api/v1/auth/signin
- Request Body
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}


### Vehicle Endpoints
3. Create Vehicle
- Access: Admin only
##### POST /api/v1/vehicles
- Request Body
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
4. Get All Vehicles
Access: Public
##### GET /api/v1/vehicles

5. Get Vehicle by ID
- Access: Public
##### GET /api/v1/vehicles/:vehicleId

6. Update Vehicle
- Access: Admin only
##### PUT /api/v1/vehicles/:vehicleId
- Request Body (optional fields)
{
  "vehicle_name": "Toyota Camry 2024 Premium",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 55,
  "availability_status": "available"
}

7. Delete Vehicle
- Access: Admin only
- Deletes vehicle if no active bookings exist.
##### DELETE /api/v1/vehicles/:vehicleId


### User Endpoints
8. Get All Users
- Access: Admin only
##### GET /api/v1/users

9. Update User
- Access: Admin OR Own profile
##### PUT /api/v1/users/:userId
- Request Body (optional)
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567899",
  "role": "admin"
}
10. Delete User
- Access: Admin only
##### DELETE /api/v1/users/:userId

### Booking Endpoints
11. Create Booking
- Access: Customer or Admin
- Automatically calculates pricing & updates vehicle availability.
##### POST /api/v1/bookings
- Request Body
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}

12. Get All Bookings
- Access: Admin → sees all bookings
- Customer → sees only their bookings
#### GET /api/v1/bookings


13. Update Booking
- Access: Customer → can cancel
- Admin → can mark as returned
##### PUT /api/v1/bookings/:bookingId
- Customer Cancel Example
{ "status": "cancelled" }
- Admin Mark Returned Example
{ "status": "returned" }

 