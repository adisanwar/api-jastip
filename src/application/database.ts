import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});

// Event listener untuk log
prismaClient.$on("error", (e) => {
    logger.error(e);
});

prismaClient.$on("warn", (e) => {
    logger.warn(e);
});

prismaClient.$on("info", (e) => {
    logger.info(e);
});

prismaClient.$on("query", (e) => {
    logger.info(e);
});

// Fungsi untuk memeriksa koneksi ke database
const checkDatabaseConnection = async () => {
    try {
        await prismaClient.$connect();
        logger.info("Database connection successful");
    } catch (error) {
        logger.error("Database connection failed, check your databases", error);
        process.exit(1); // Keluar dari aplikasi jika koneksi gagal
    }
};

// Panggil fungsi untuk memeriksa koneksi saat aplikasi dimulai
checkDatabaseConnection();
