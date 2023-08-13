"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scrapeLogic_1 = require("./scrapeLogic");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.get("/scrape", (req, res) => {
    (0, scrapeLogic_1.scrapeLogic)(res);
});
app.get("/", (req, res) => {
    res.send("Render Puppeteer server is up and running!");
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
