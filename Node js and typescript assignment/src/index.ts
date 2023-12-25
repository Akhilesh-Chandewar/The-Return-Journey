import express from "express";
import requestLogger from "./middleware/requestLogger";
import productRoutes from "./routes/productRouets";
import errorHandler from "./middleware/errorHandler";

const app = express();
const PORT = 8888;

app.use(express.json());
app.use(requestLogger);

app.use("/product" , productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(errorHandler);

export { app };