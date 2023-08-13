"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeLogic = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
require("dotenv").config();
const scrapeLogic = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: "new",
        args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote"],
        executablePath: process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer_1.default.executablePath(),
    });
    try {
        const page = yield browser.newPage();
        const url = "https://www.robandrose.ch";
        yield page.goto(url, { waitUntil: "networkidle2" });
        const pdfres = yield page.pdf({
            format: "A4",
            landscape: false,
            margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
        });
        browser.close();
        //res.header('Content-Disposition: attachment; filename="whatever.pdf"');
        res.header("Content-Type", "application/pdf");
        res.send(pdfres);
    }
    catch (e) {
        console.error(e);
        res.send(`Something went wrong while running Puppeteer: ${e}`);
    }
    finally {
        yield browser.close();
    }
});
exports.scrapeLogic = scrapeLogic;
