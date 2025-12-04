# **App Name**: SatsForGood Frontend

## Core Features:

- Donate Form: Allows users to enter their name (optional) and the donation amount (in sats). Generates a Lightning invoice via a POST request to the /api/create-invoice/ endpoint.
- Invoice QR Code: Displays the Lightning invoice as a QR code and the raw invoice string. The component includes logic to automatically poll the /api/invoice-status/{payment_hash}/ endpoint to update the payment status.
- Donation Statistics: Displays the total donated sats and the number of donors.
- Recent Donations List: Shows a table or list of recent donations with the donor name, amount, timestamp, and status, fetched from GET /api/recent-donations/.
- Payment Status Updates: Provides real-time updates on the payment status (Pending → Paid) by polling the /api/invoice-status/{payment_hash}/ endpoint.

## Style Guidelines:

- Primary color: Bitcoin orange (#F7931A) to represent the Bitcoin brand and evoke energy and excitement.
- Background color: Dark grey (#222222) for a modern fintech dark mode theme with good contrast.
- Accent color: Electric purple (#BF5AF2) to add a unique, eye-catching accent, analogous to the orange primary but creating sufficient contrast.
- Headline font: 'Space Grotesk' (sans-serif) for headlines and shorter amounts of body text; this font communicates a contemporary and slightly techy aesthetic. Body font: 'Inter' (sans-serif) to use with Space Grotesk when longer text is anticipated.
- Use Lightning ⚡ and Bitcoin ₿ icons throughout the interface to visually reinforce the application's purpose.
- Design a fully responsive layout that adapts to both mobile and desktop devices.
- Implement smooth animations for the QR code display and payment confirmation to enhance the user experience. An optional confetti animation will trigger upon successful payment.