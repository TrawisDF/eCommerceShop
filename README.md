# eCommercShop 2023
        this website was builded for learing only, not work for any profit or any merchandise 
From MERN stack from scratch course. I have learned from an empty folder until I really can deploy this project on render.com, which is free for hosting, so it's unavoidable to have access downtime. (it takes time about 30 seconds to open this web) <br/>

## Links

#### Website

https://e-commerceshop-v2.onrender.com/

#### Tester account

    Admin account

          Email:admin@email.com

          Password:123456
          
    Guest account

          Email:basbaverrick@gmail.com

          Password:123456

         
#### Demo
![eCom](https://github.com/TrawisDF/eCommerceShop/assets/134593322/02ea12e1-22d9-478b-8dda-6a27b94b5e22)


## Features

- Full-featured shopping cart with quantity<br/>
- Product reviews and ratings<br/>
- Top products carousel<br/>
- Product pagination<br/>
- Product search feature<br/>
- User profile with orders<br/>
- Admin product management<br/>
- Admin user management<br/>
- Admin Order details page<br/>
- Mark orders as delivered option<br/>
- Checkout process (shipping, payment method, etc)<br/>
- PayPal / credit card integration<br/>
- Custom database seeder script<br/>

## Tech stacks

- React.js
- Bootstrap
- Node.js(Express)
- MongoDB
- JWT authentication
- Sweetalert

## Run Locally


Clone the project

```bash
  git clone https://github.com/TrawisDF/eCommerceShop
```

Go to the project directory

```bash
  cd eCommerceShop
```
Create .env file at root directory 

      NODE_ENV=developement
      MONGO_URI=your mongoDB uri
      PAGINATION_LIMIT=4 (depend on you want how many products will be show per page)
      PAYPAL_CLIENT_ID=your paypal client id
      SECRET_KEY=tawid626

Install dependencies(backend)

```bash
  npm install
```
Install dependencies(frontend)

```bash
  cd frontend
  npm install
```
Run both frontend and backend (at root folder)

```bash
  npm run dev
```

## Seeder
these command allow you to reset the initial data and set of user by following this commands.

    # Import data
    npm run data:import

    # Destroy data
    npm run data:destroy
  <br/>

    Sample User Logins

    admin@example.com (Admin)
    123456

    john@example.com (Customer)
    123456

    jane@example.com (Customer)
    123456   

