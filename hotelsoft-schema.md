## 1. Guest Management:
   **Guests Table:**
   - `guestID`: Primary Key
   - `firstName`: String
   - `lastName`: String
   - `email`: String
   - `phoneNumber`: String

## 2. Reservation Management:
   **Rooms Table:**
   - `roomID`: Primary Key
   - `type`: String (example: single, double)
   - `price`: Decimal
   - `status`: String (example: available, booked)
   
   **Reservations Table:**
   - `reservationID`: Primary Key
   - `guestID`: Foreign Key (references Guests)
   - `roomID`: Foreign Key (references Rooms)
   - `checkInDate`: Date
   - `checkOutDate`: Date
   - `status`: String (example: confirmed, canceled)

## 3. Room Management:
   (Handled in Rooms Table)

## 4. Billing and Payment Management:
   **Invoices Table:**
   - `invoiceID`: Primary Key
   - `reservationID`: Foreign Key (references Reservations)
   - `amount`: Decimal
   - `status`: String (e.g., paid, unpaid)

   **Payments Table:**
   - `paymentID`: Primary Key
   - `invoiceID`: Foreign Key (references Invoices)
   - `amount`: Decimal
   - `method`: String (e.g., cash, credit card)
   - `date`: Date

## 5. Maintenance Management:
   **MaintenanceRequests Table:**
   - `requestID`: Primary Key
   - `roomID`: Foreign Key (references Rooms)
   - `description`: Text
   - `status`: String (e.g., pending, completed)
   - `scheduledDate`: Date 

## 6. Security:
   **Users Table:**
   - `userID`: Primary Key
   - `username`: String
   - `password`: Encrypted String
   - `role`: String (e.g., admin, guest)
