import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
import productRoutes from './routes/productRoutes.js';
import usersRoutes from './routes/userRoute.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import ordersRoutes from './routes/ordersRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();

const app = express();

//json Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('api is running');
  });
}
// Add this middleware to serve static files

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
