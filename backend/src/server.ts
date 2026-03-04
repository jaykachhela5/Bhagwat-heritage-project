import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const PORT = Number(env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  await connectDB();

  const server = app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });

  const shutdown = (signal: string) => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(async () => {
      const mongoose = await import("mongoose");
      await mongoose.default.disconnect();
      logger.info("MongoDB disconnected");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
