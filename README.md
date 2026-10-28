# 🍛 KD Delivery

**Traditional taste. Fresh meals. Delivered with care.**

KD Delivery is a restaurant ordering and delivery web application designed to make it easy for customers to explore traditional food, place orders, and choose convenient delivery or pickup options. The project also includes separate interfaces for restaurant administrators and delivery riders.

The application is being developed with a modern web stack, a warm orange-and-cream design, and a mobile-friendly user experience.

> **Project status:** In development. Some interfaces use demo data. MongoDB persistence, authentication, real order assignment, and payment processing still need to be integrated and tested before production use.

---

## 📌 Table of Contents

- [Features](#-features)
- [Application Areas](#-application-areas)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Routes](#-available-routes)
- [Order Workflow](#-order-workflow)
- [Database Plan](#-database-plan)
- [Payment and Delivery](#-payment-and-delivery)
- [Development Roadmap](#-development-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🛍️ Customer Storefront

- Responsive homepage with hero, featured dishes, and restaurant information.
- Menu browsing with food images, categories, descriptions, and serving-size pricing.
- Shopping cart powered by Redux.
- Cart quantity and item management.
- Dedicated checkout page.
- Home delivery and restaurant pickup options.
- Three configurable delivery zones with different delivery fees.
- Cash-on-delivery and planned online-payment options.
- Customer contact information, delivery address, and order notes.
- About Us and Contact pages.

### 🛠️ Admin Dashboard

The admin area is intended to provide restaurant staff with tools to manage daily operations.

Planned capabilities include:

- Overview of restaurant activity.
- Order management and status updates.
- Product and menu management.
- Category management.
- Rider assignment.
- Restaurant and delivery settings.

Some admin interfaces may currently use sample data. Backend persistence and access protection must be completed before production use.

### 🛵 Rider Panel

A separate rider interface is included for delivery operations.

Current interface features:

- Rider dashboard and delivery statistics.
- Availability toggle for the demo interface.
- List of assigned sample deliveries.
- Delivery status filters.
- Customer contact links.
- Delivery status progression:
  - Assigned
  - Picked up
  - Delivered

**Note:** Rider availability and status changes currently use local UI state. They do not yet update a shared database or the admin dashboard.

### 🛒 Cart and Checkout

- Redux-based cart state.
- Support for multiple serving sizes.
- Item quantity and unit-price calculations.
- Order subtotal and delivery-fee calculation.
- Delivery fee determined by the selected delivery zone.
- Free pickup option.
- Checkout form validation.

The order submission API is currently a placeholder and does not save orders to MongoDB.

---

## 🧩 Application Areas

| Area                | Route           | Purpose                              |
| ------------------- | --------------- | ------------------------------------ |
| Customer storefront | `/`             | Homepage and restaurant introduction |
| Menu                | `/menu`         | Browse available food                |
| Cart                | `/cart`         | Review selected items                |
| Checkout            | `/checkout`     | Enter order and delivery details     |
| About Us            | `/about`        | Learn about the restaurant           |
| Contact             | `/contact`      | Contact information and form         |
| Admin               | `/admin`        | Restaurant management interface      |
| Rider dashboard     | `/rider`        | Rider overview                       |
| Rider deliveries    | `/rider/orders` | Manage sample deliveries             |

Additional admin routes may include product, category, order, and login pages.

---

## 🧰 Technology Stack

| Technology                                     | Purpose                                          |
| ---------------------------------------------- | ------------------------------------------------ |
| [Next.js](https://nextjs.org/)                 | React framework and App Router                   |
| [React](https://react.dev/)                    | User interface                                   |
| [TypeScript](https://www.typescriptlang.org/)  | Type safety                                      |
| [Tailwind CSS](https://tailwindcss.com/)       | Responsive styling                               |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Cart and client-side state management            |
| [MongoDB](https://www.mongodb.com/)            | Planned database for products, users, and orders |
| [Mongoose](https://mongoosejs.com/)            | Planned MongoDB object modeling, if selected     |

MongoDB and Mongoose should be considered planned backend components until the database connection and persistence layer have been implemented and verified.

---

## 📁 Project Structure

The following is a representative structure. Your local project may contain additional files or folders.

```text
kd_delivery/
├── app/
│   ├── (shop)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── orders/
│   │       └── [id]/
│   │           └── page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   └── categories/
│   │       └── page.tsx
│   ├── rider/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── orders/
│   │       └── page.tsx
│   ├── api/
│   │   └── orders/
│   │       └── route.ts
│   ├── StoreProvider.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── home/
│   ├── menu/
│   ├── cart/
│   ├── admin/
│   └── contact/
├── lib/
│   ├── delivery.ts
│   └── redux/
│       ├── store.ts
│       ├── hooks.ts
│       └── features/
│           └── cart/
│               └── cartSlice.ts
├── public/
│   └── data/
│       └── menu.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

This structure is a guide, not a guarantee that every listed file already exists.

---

## 🚀 Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — use a version supported by your installed Next.js version.
- npm, which is included with Node.js.
- Git.
- A code editor such as Visual Studio Code.

MongoDB is needed when you begin implementing the database-backed features, but it is not required simply to run the current UI.

### 1. Clone the repository

Replace the example URL with your actual GitHub repository URL.

```bash
git clone https://github.com/YOUR_USERNAME/kd_delivery.git
cd kd_delivery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root when environment variables are needed.

Example for the planned MongoDB connection:

```env
MONGODB_URI=your_mongodb_connection_string
```

Do not commit real database credentials or API secrets.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

Run the production build after making changes to catch build-time errors.

---

## 🔐 Environment Variables

| Variable                     | Purpose                   | Status         |
| ---------------------------- | ------------------------- | -------------- |
| `MONGODB_URI`                | MongoDB connection string | Planned        |
| Payment provider credentials | Online payment processing | Not configured |
| Authentication secrets       | Session or token security | Not configured |

Add new environment variables as the backend is implemented. Keep `.env.local` out of version control and use a separate secure configuration for deployment.

---

## 🔗 Available Routes

### Customer

- `/`
- `/menu`
- `/cart`
- `/checkout`
- `/orders/[id]`
- `/about`
- `/contact`

### Admin

- `/admin`
- `/admin/login`
- `/admin/orders`
- `/admin/products`
- `/admin/categories`

### Rider

- `/rider`
- `/rider/orders`

Routes may exist before their corresponding backend functionality is complete. A visible login page or dashboard does not by itself guarantee authentication or authorization.

---

## 📦 Order Workflow

The intended end-to-end order workflow is:

1. The customer browses the menu.
2. The customer adds items and serving sizes to the cart.
3. The customer chooses delivery or restaurant pickup.
4. For delivery, the customer selects a delivery zone and enters an address.
5. The customer chooses a payment method.
6. The backend validates the submitted order and calculates trusted prices and delivery fees.
7. The order is saved to MongoDB.
8. Admin staff review the order and assign a rider when appropriate.
9. The rider picks up the order and completes the delivery.
10. The customer and admin can view the updated order status.

**Current implementation:** The customer UI, Redux cart, checkout form, and rider demo interface are under development. The complete workflow above is the target architecture; database persistence, real assignment, and cross-panel status synchronization remain to be implemented.

---

## 🗄️ Database Plan

MongoDB is intended to store the application's persistent data.

Potential collections include:

| Collection      | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| `users`         | Customers, administrators, and riders                              |
| `products`      | Food items, descriptions, prices, and availability                 |
| `categories`    | Menu categories                                                    |
| `orders`        | Customer orders, totals, addresses, payment and fulfillment status |
| `deliveryZones` | Zone names, fees, and delivery estimates                           |

A production implementation should include server-side validation, secure authentication, role-based access control, and consistent order-status rules.

The backend must calculate prices using trusted database values rather than relying on totals sent by the browser.

---

## 💳 Payment and Delivery

### Fulfillment methods

- **Home delivery:** A delivery fee is calculated using the selected zone.
- **Restaurant pickup:** No delivery fee.

The current delivery-zone values are examples and should be updated to match the restaurant's actual service areas and pricing.

### Payment methods

- **Cash on delivery:** Planned as a supported order payment method.
- **Online payment:** Requires integration with a payment provider before it can be used for real transactions.

Do not treat a checkout selection as proof that payment has been received. Online payments need verified provider callbacks or webhooks and server-side payment-status updates.

---

## 🛣️ Development Roadmap

- [x] Set up the Next.js application.
- [x] Establish the customer storefront design.
- [x] Build reusable storefront sections.
- [x] Add Redux-based cart functionality.
- [x] Develop the checkout interface.
- [x] Add delivery and pickup options to the checkout UI.
- [x] Build the About Us page.
- [x] Develop the rider dashboard and delivery-list demo.
- [ ] Connect MongoDB and implement a reusable database connection.
- [ ] Implement persistent products and categories.
- [ ] Implement server-side order creation and validation.
- [ ] Add secure customer, admin, and rider authentication.
- [ ] Implement protected routes and role-based permissions.
- [ ] Connect the admin panel to real orders.
- [ ] Implement rider assignment and persistent delivery status updates.
- [ ] Add customer order tracking.
- [ ] Integrate and verify an online payment provider.
- [ ] Add tests, error handling, and production deployment configuration.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes.
4. Run the build and any available tests.
5. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

6. Push the branch and open a pull request.

Keep changes focused, follow the existing TypeScript and Tailwind conventions, and avoid committing secrets or personal customer information.

---

## 🔒 Security Notes

Before using KD Delivery for real customer orders:

- Implement secure authentication for admin and rider accounts.
- Verify permissions on the server for every protected action.
- Validate customer input and all submitted order data.
- Recalculate item prices, totals, and delivery fees on the server.
- Protect customer addresses and phone numbers.
- Verify payment events with the payment provider.
- Use environment variables for secrets.
- Avoid exposing database credentials or sensitive data in client-side code.

---

## 📄 License

No license has been specified yet. Unless a license is added to the repository, do not assume that others have permission to redistribute or reuse the code.

---

## ❤️ Built with care

**KD Delivery** — bringing traditional flavors closer to home.
