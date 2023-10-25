## 1. Guest Management:
   **Guests Table:**
   - `guestID`: Primary Key
   - `firstName`: String
   - `lastName`: String
   - `email`: String
   - `phoneNumber`: String

## 2. Reservation Management:
   **Reservations Table:**
   - `reservationID`: Primary Key
   - `guestID`: Foreign Key (references Guests)
   - `roomID`: Foreign Key (references Rooms)
   - `checkInDate`: Date
   - `checkOutDate`: Date
   - `status`: String (example: confirmed, canceled)

## 3. Room Management:
**Rooms Table:**
- `roomID`: Primary Key
- `type`: String (example: single, double)
- `price`: Decimal
- `status`: String (example: available, booked)
