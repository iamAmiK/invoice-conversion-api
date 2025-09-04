"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRouter = void 0;
const express_1 = require("express");
const convertController_1 = require("../controllers/convertController");
const validateRequest_1 = require("../middleware/validateRequest");
exports.convertRouter = (0, express_1.Router)();
exports.convertRouter.post('/', validateRequest_1.validateConvertRequest, convertController_1.convertController.convert);
