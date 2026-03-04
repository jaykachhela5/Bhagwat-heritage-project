import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { generalLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import { generateOpenAPI } from "./docs/openapi";

import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import donationRoutes from "./routes/donationRoutes";
import donorRoutes from "./routes/donorRoutes";
import volunteerRoutes from "./routes/volunteerRoutes";
import mediaRoutes from "./routes/mediaRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import eventRoutes from "./routes/eventRoutes";
import spiritualRoutes from "./routes/spiritualRoutes";
import culturalRoutes from "./routes/culturalRoutes";
import mandirRoutes from "./routes/mandirRoutes";
import involvedRoutes from "./routes/involvedRoutes";
import devoteeRoutes from "./routes/devoteeRoutes";
import bookRoutes from "./routes/bookRoutes";
import issueRoutes from "./routes/issueRoutes";
import memberRoutes from "./routes/memberRoutes";
import pathshalaRoutes from "./routes/pathshalaRoutes";

const app = express();

/* ── Swagger UI (dev / staging only) ──────────────────────────────────────────
   Must be mounted BEFORE helmet so its inline scripts/styles are not blocked
   by the default Content-Security-Policy header.
─────────────────────────────────────────────────────────────────────────────── */
if (env.NODE_ENV !== "production") {
  const openApiDocument = generateOpenAPI();
  app.use("/docs", swaggerUi.serve);
  app.get("/docs", swaggerUi.setup(openApiDocument, {
    customSiteTitle: "Bhagwat Heritage API Docs",
    swaggerOptions: { persistAuthorization: true },
  }));
}

/* ── Global middleware ─────────────────────────────────────────────────────── */

const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(generalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ── API routes ────────────────────────────────────────────────────────────── */

app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/spiritual", spiritualRoutes);
app.use("/api/cultural", culturalRoutes);
app.use("/api/mandir", mandirRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/involved", involvedRoutes);
app.use("/api/devotee", devoteeRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issue", issueRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/pathshala", pathshalaRoutes);

app.use(errorHandler);

export default app;
