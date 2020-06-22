const puppeteer = require("puppeteer");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPage() {
  const loginURL =
    "https://www.strava.com/login?cta=log-in&element=global-header&source=registers_show";
  const { EMAIL, PASSWORD } = process.env;
  let page;

  if (!EMAIL || !PASSWORD) {
    console.log(
      "Please, pass the strava credentials by setting the EMAIL and PASSWORD env vars."
    );
    process.exit(0);
  }

  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    defaultViewport: { width: 1200, height: 1200 },
  });

  page = await browser.newPage();
  await page.goto(loginURL);
  await page.type("#email", EMAIL);
  await page.type("#password", PASSWORD);
  await page.click('[id="login-button"]');
  await page.waitForNavigation();

  return { page, browser };
}

module.exports = { sleep, getPage };
