const puppeteer = require("puppeteer");
const screenshot = "strava.png";
const loginURL =
  "https://www.strava.com/login?cta=log-in&element=global-header&source=registers_show";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    defaultViewport: { width: 1200, height: 1200 },
  });
  const page = await browser.newPage();
  await page.goto(loginURL);

  await page.type("#email", "xxxxxxxxx");
  await page.type("#password", "xxxxx");
  await page.click('[id="login-button"]');
  await page.waitForNavigation();

  console.log("going to second page");
  await page.goto("https://www.strava.com/athletes/820359");
  console.log("IN second page");

  //const buttons = await page.$$(
  // "button[class='btn btn-icon btn-icon-only btn-kudo btn-xs js-add-kudo']"
  //);
  const els = "button.btn.btn-default.btn-kudo.btn-xs.js-add-kudo";
  const all = await page.$$(els, (b) => b);
  for (e of all) {
    await e.click();
  }

  //await page.screenshot({ path: screenshot });
  browser.close();
  console.log("See screenshot: " + screenshot);
})();
