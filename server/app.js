import express from "express";
import hpp from "hpp";
import helmet from "helmet";
import mongoose from "mongoose";
import config from "./config"
import morgan from "morgan";
import cors from "cors";

// Routes
import postRoutes from "./routes/api/post"
import userRoutes from "./routes/api/user"
import authRoutes from "./routes/api/auth"

const app = express();
const { MONGO_URI } = config;

// 미들웨어 설정
app.use(hpp());
app.use(helmet());
app.use(cors({ origin: true, credentails: true }))
app.use(morgan("dev"));
app.use(express.json());

// mongoDB connect
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("✅ MongoDB connecting Success!"))
    .catch((e) => console.log(e))

// Use router
app.get("/");
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

export default app;