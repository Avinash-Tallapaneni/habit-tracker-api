import express, { Request, Response } from "express";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes";
import ErrorHandler from "./middleware/errorHandler";

const app = express();
app.use(express.json());

/**
 * After deployment if ur still getting , cant be reached
 * check the frontendurl in env
 * in development the origin is set to any
 */

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

/**
 * this route is used to check
 * the status of the server by
 * going to this route
 */

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Server is up and running" });
});

app.use("/habits", habitRoutes);

/**
 * Error handle middleware, will catch all errror
 */
app.use(ErrorHandler);

export default app;
