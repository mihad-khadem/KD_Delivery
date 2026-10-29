# KD Delivery

**KD Delivery** is a single-restaurant food delivery web application built to simplify online food ordering and delivery management. It provides three separate interfaces: a customer storefront, an admin dashboard, and a rider dashboard.

## Features

### 🛍️ Customer Shop

- Browse the restaurant's menu and food categories.
- View food images, descriptions, and prices.
- Add food items to the cart.
- Review cart items and quantities.
- Place orders through the checkout page.
- View individual order details and track order status.

### 🛠️ Admin Dashboard

- Secure admin login.
- View and manage customer orders.
- Add, edit, and manage food products.
- Organize food categories.
- Manage delivery riders.
- Configure delivery zones and delivery charges.
- Update order statuses and monitor operations.

### 🛵 Rider Dashboard

- Secure rider login.
- View assigned deliveries.
- Access relevant customer and delivery details.
- Update delivery status.
- Use a mobile-friendly interface while delivering orders.

### 🔌 Backend and Database

- Connect to MongoDB.
- Manage products, categories, orders, users, and delivery zones.
- Provide API endpoints for products and orders.
- Separate admin, rider, and payment API functionality.
- Validate requests and enforce role-based access controls.

## Technology Stack

| Technology             | Purpose                                 |
| ---------------------- | --------------------------------------- |
| Next.js App Router     | Pages, layouts, and routing             |
| React                  | User interfaces and reusable components |
| TypeScript             | Type-safe application development       |
| Tailwind CSS           | Responsive styling                      |
| MongoDB                | Database                                |
| Next.js Route Handlers | Backend API endpoints                   |
| Authentication         | Secure access for admins and riders     |

## Project Structure

```text
kd_delivery/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   └── orders/
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   ├── riders/
│   │   │   └── page.tsx
│   │   └── delivery-zones/
│   │       └── page.tsx
│   │
│   ├── rider/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── deliveries/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── products/
│   │   │   └── route.ts
│   │   ├── orders/
│   │   │   └── route.ts
│   │   ├── admin/
│   │   ├── rider/
│   │   └── payments/
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── menu/
│   ├── cart/
│   ├── checkout/
│   ├── admin/
│   └── rider/
│
├── lib/
│   ├── mongodb.ts
│   ├── auth.ts
│   └── utils.ts
│
├── models/
│   ├── Product.ts
│   ├── Category.ts
│   ├── Order.ts
│   ├── User.ts
│   └── DeliveryZone.ts
│
├── hooks/
├── types/
├── public/
│   └── images/
├── .env.local
├── package.json
└── README.md
```

_Note: This is the planned project structure. Some files and features may need to be created as development progresses._

## Application Routes

### Customer

| Route          | Description                  |
| -------------- | ---------------------------- |
| `/`            | Customer homepage            |
| `/menu`        | Food menu                    |
| `/cart`        | Shopping cart                |
| `/checkout`    | Checkout and order placement |
| `/orders/[id]` | View an individual order     |

### Admin

| Route                   | Description              |
| ----------------------- | ------------------------ |
| `/admin/login`          | Admin login              |
| `/admin`                | Admin dashboard          |
| `/admin/orders`         | Order management         |
| `/admin/products`       | Product management       |
| `/admin/categories`     | Category management      |
| `/admin/riders`         | Rider management         |
| `/admin/delivery-zones` | Delivery zone management |

### Rider

| Route               | Description         |
| ------------------- | ------------------- |
| `/rider/login`      | Rider login         |
| `/rider`            | Rider dashboard     |
| `/rider/deliveries` | Assigned deliveries |

### API

| Endpoint            | Purpose                      |
| ------------------- | ---------------------------- |
| `/api/products`     | Retrieve and manage products |
| `/api/orders`       | Create and manage orders     |
| `/api/admin/...`    | Admin-specific operations    |
| `/api/rider/...`    | Rider-specific operations    |
| `/api/payments/...` | Payment-related operations   |

API methods and nested endpoints will be defined as the backend is implemented.

## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — preferably an active LTS version.
- npm.
- A MongoDB database, either local or hosted through [MongoDB Atlas](https://www.mongodb.com/atlas).

### 1. Navigate to the Project

```bash
cd F:\projects\kd_delivery
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
```

Add authentication and payment environment variables when those features are implemented.

**Security:** Never commit `.env.local` to Git. Keep database credentials and secret keys on the server, not in browser-accessible code.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Architecture and Development Guidelines

- **Route groups:** The `(shop)` folder organizes customer pages without adding `shop` to their URLs.
- **Reusable components:** Keep shared UI elements inside `components/`.
- **Database access:** Use `lib/mongodb.ts` for the MongoDB connection.
- **Data models:** Define database schemas and models inside `models/`.
- **Type safety:** Keep shared TypeScript definitions inside `types/`.
- **Business logic:** Keep database operations and sensitive server-side logic out of client components.
- **Responsive design:** Make the customer storefront responsive and optimize the rider interface for mobile devices.
- **Access control:** Enforce admin and rider permissions on the server and in protected API handlers.

## Security Requirements

- Hash passwords using a secure password-hashing algorithm.
- Authenticate users before allowing access to protected pages or API operations.
- Check roles and permissions on every protected server-side request.
- Restrict riders to deliveries assigned to their accounts.
- Validate order quantities, product prices, delivery charges, and totals on the server.
- Validate and sanitize incoming data.
- Never expose database credentials, authentication secrets, or payment secrets to the browser.

## Development Roadmap

- [x] Initialize the Next.js application.
- [x] Build the initial customer homepage.
- [ ] Organize the customer homepage into reusable components.
- [ ] Create all customer shop pages.
- [ ] Implement menu browsing and cart functionality.
- [ ] Build checkout and order placement.
- [ ] Configure the MongoDB connection.
- [ ] Create database models.
- [ ] Implement authentication and role-based authorization.
- [ ] Build the admin dashboard and management pages.
- [ ] Build the mobile-friendly rider dashboard.
- [ ] Implement rider assignment and delivery status updates.
- [ ] Integrate a payment provider if required.
- [ ] Test, deploy, and document the production application.

## License

No license has been selected yet. Add a `LICENSE` file when you decide how the project may be used and distributed.

---

**KD Delivery** — making food ordering and delivery simpler.
