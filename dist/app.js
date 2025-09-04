"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const errorHandler_1 = require("./middleware/errorHandler");
const convert_1 = require("./routes/convert");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
    }
    initializeRoutes() {
        this.app.use('/api/convert', convert_1.convertRouter);
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'ok' });
        });
    }
    initializeErrorHandling() {
        this.app.use(errorHandler_1.errorHandler);
    }
}
exports.default = new App().app;
