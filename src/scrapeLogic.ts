import { Response } from "express";
import puppeteer from "puppeteer";
require("dotenv").config();

export const scrapeLogic = async (res: Response) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote"],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  let pdfres = {};
  try {
    const page = await browser.newPage();
    const url = "https://www.robandrose.ch";

    await page.goto(url, { waitUntil: "networkidle2" });

    pdfres = await page.pdf({
      format: "A4",
      landscape: false,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    //res.header('Content-Disposition: attachment; filename="whatever.pdf"');
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
    res.header("Content-Type", "application/pdf");
    res.send(pdfres);
  }
};
