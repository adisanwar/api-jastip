import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {UserController} from "../controller/user-controller";
import {ContactController} from "../controller/contact-controller";
import {AddressController} from "../controller/address-controller";
import { StoreController } from "../controller/store-controller";
import { CategoryController } from "../controller/category-controller";
// import { uploadMiddleware } from "../middleware/upload-middleware";
// import {ShowtimeController} from "../controller/showtime-controller";
// import { TicketController } from "../controller/ticket-controller";
// import { OrderController } from "../controller/order-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User APi
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);


apiRouter.get("/api/users/", UserController.getAll);
// apiRouter.get("/api/users/:username", UserController.getById);
// apiRouter.patch("/api/users/:username", UserController.updateUser);
apiRouter.delete("/api/users/:userId", UserController.delete);

// // Contact API
apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId", ContactController.get);
apiRouter.patch("/api/contacts/:contactId", ContactController.update);
apiRouter.delete("/api/contacts/:contactId", ContactController.remove);
apiRouter.get("/api/contacts", ContactController.search);

// // Address API
apiRouter.post("/api/contacts/:contactId/addresses", AddressController.create);
apiRouter.get("/api/contacts/:contactId/addresses/:addressId", AddressController.get);
apiRouter.patch("/api/contacts/:contactId/addresses/:addressId", AddressController.update);
apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", AddressController.remove);
apiRouter.get("/api/contacts/:contactId/addresses", AddressController.list);

// // Store Api
apiRouter.post("/api/stores",  StoreController.create);
apiRouter.get("/api/stores/", StoreController.get);
apiRouter.get('/api/stores/:storeId', StoreController.getById);
apiRouter.patch('/api/stores/:storeId', StoreController.update)
apiRouter.delete('/api/stores/:storeId', StoreController.remove);

// // Store Api
apiRouter.post("/api/categories",  CategoryController.create);
apiRouter.get("/api/categories/", CategoryController.get);
apiRouter.get('/api/categories/:categoryId', CategoryController.getById);
apiRouter.patch('/api/categories/:categoryId', CategoryController.update)
apiRouter.delete('/api/categories/:categoryId', CategoryController.remove);

// // Show Api
// apiRouter.post("/api/shows/",uploadMiddleware, ShowController.create);
// apiRouter.get("/api/shows/:showId(\\d+)", ShowController.getById);
// apiRouter.get("/api/shows/current", ShowController.get);
// // apiRouter.patch("/api/shows/:showId(\\d+)/theaters/:theaterId(\\d+)",uploadMiddleware, ShowController.update);
// apiRouter.patch("/api/shows/:showId(\\d+)",uploadMiddleware, ShowController.update);
// apiRouter.delete("/api/shows/:showId(\\d+)", ShowController.remove);
// // apiRouter.get("/api/shows/:theaterId(\\d+)/shows", ShowController.list);

// // // ticket Api
// apiRouter.post("/api/tickets/", uploadMiddleware, TicketController.create);
// apiRouter.get("/api/tickets/:ticketId(\\d+)", TicketController.getById);
// apiRouter.get("/api/tickets/", TicketController.get);
// apiRouter.patch("/api/tickets/:ticketId(\\d+)",uploadMiddleware, TicketController.update);
// apiRouter.patch("/api/tickets/status/:ticketId(\\d+)",uploadMiddleware, TicketController.updateTicketStatus);
// apiRouter.delete("/api/tickets/:ticketId(\\d+)", TicketController.remove);
// // shuffle ticket
// apiRouter.post("/api/tickets/shuffle-tickets/:ticketsRequired(\\d+)", TicketController.shuffleTickets);
// apiRouter.get("/api/tickets/shuffle-tickets", TicketController.getShuffleData);

// // Showtime Api
// apiRouter.post("/api/showtimes/", ShowtimeController.create);
// apiRouter.get("/api/showtimes/:showtimeId(\\d+)", ShowtimeController.getById);
// apiRouter.get("/api/showtimes/current", ShowtimeController.get);
// apiRouter.patch("/api/showtimes/:showtimeId(\\d+)", ShowtimeController.update);
// apiRouter.delete("/api/showtimes/:showtimeId(\\d+)", ShowtimeController.remove);

// // Orders Api
// apiRouter.post("/api/orders/", OrderController.create);
// apiRouter.get("/api/orders/:id(\\d+)", OrderController.getById);
// apiRouter.get("/api/orders", OrderController.get);
// apiRouter.get('/payment/finish', OrderController.handleFinishRedirect);


