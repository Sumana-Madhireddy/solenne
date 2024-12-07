# Solenne E-commerce Website

Solenne is a modern and user-friendly e-commerce platform designed to provide a seamless shopping experience. This web application allows users to browse products, add them to their cart, and complete secure payments. Additionally, it features an admin dashboard for managing products, orders, and customers.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Product Catalog**: Browse and search for products across various categories.
- **Shopping Cart**: Add products to the cart and manage quantities.
- **Order Management**: Users can view and track their order status.
- **Admin Dashboard**: Admins can manage products, view orders, and update user information.
- **Responsive Design**: The site is optimized for both desktop and mobile devices.
- **Secure Payments**: Integration with Stripe for secure payment processing.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - React Router
- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - Sequelize ORM
  - Stripe API for payment processing
- **Authentication**:
  - JWT (JSON Web Tokens)
- **Testing**:
  - Jest (Unit Testing)

## Getting Started

Follow these steps to get your local development environment set up.

### Prerequisites

- Node.js (v16+)
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/solenne-ecommerce.git

2. Navigate to the project directory:
    ```bash
    cd solenne-ecommerce

3. Install the required dependencies:
    ```bash
    npm install

4. Set up the environment variables by creating a .env file in the root directory:
    ```bash
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key

5. Run database migrations to set up the tables:
    ```bash
    npx sequelize-cli db:migrate

6. Seed the database with some sample data (optional):
    ```bash
    npx sequelize-cli db:seed:all

7. Start the development server:
    ```bash
    npm run dev

The frontend will be available at http://localhost:3000 and the backend API at http://localhost:5000.

## API Endpoints

### Authentication
- **POST /api/auth/signup**: Register a new user
- **POST /api/auth/login**: Log in an existing user

### Products
- **GET /api/products**: Get all products
- **GET /api/products/:id**: Get a specific product by ID

### Cart
- **GET /api/cart**: Get the current user's cart
- **POST /api/cart**: Add an item to the cart
- **PUT /api/cart**: Update the quantity of an item in the cart
- **DELETE /api/cart/:itemId**: Remove an item from the cart

### Orders
- **POST /api/orders**: Place an order
- **GET /api/orders**: Get all orders for the authenticated user

### Admin (Protected Routes)
- **POST /api/admin/products**: Add a new product (Admin only)
- **PUT /api/admin/products/:id**: Update a product (Admin only)
- **DELETE /api/admin/products/:id**: Delete a product (Admin only)

## Testing

Run the tests with:

```bash
npm test

## Deployment

For deploying the application to production, you can use services like Heroku, AWS, or DigitalOcean.

### 1. Build the frontend for production:
```bash
npm run build

## Contributing

We welcome contributions! To contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Write tests and ensure the code passes existing tests.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Sequelize](https://sequelize.org/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
