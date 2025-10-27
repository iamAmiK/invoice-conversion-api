"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixRouter = void 0;
const express_1 = require("express");
const fixController_1 = require("../controllers/fixController");
exports.fixRouter = (0, express_1.Router)();
// POST /api/fix/analyse - analyse invoice and return missing fields
exports.fixRouter.post('/analyse', fixController_1.fixController.analyse);
// POST /api/fix/apply - Apply fixes to invoice and return updated JSON + XML
exports.fixRouter.post('/apply', fixController_1.fixController.apply);
