const puppeteer = require("puppeteer");
const stdin = process.stdin;
const screenshot = "strava.png";
const loginURL =
  "https://www.strava.com/login?cta=log-in&element=global-header&source=registers_show";

async function giveThumbUps(listOfAthletePages) {
  /*Login first*/
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    defaultViewport: { width: 1200, height: 1200 },
  });
  const page = await browser.newPage();
  await page.goto(loginURL);
  await page.type("#email", EMAIL);
  await page.type("#password", PASSWORD);
  await page.click('[id="login-button"]');
  await page.waitForNavigation();

  /* Go over all the activity pages and give thumbs up */
  for (const activityPage of listOfAthletePages) {
    process.stdout.write(`- ${activityPage}:`);
    await page.goto(activityPage);
    const thumbsUp = await page.$$(
      "button.btn.btn-default.btn-kudo.btn-xs.js-add-kudo",
      (b) => b
    );
    for (const tu of thumbsUp) {
      process.stdout.write("👍 ");
      await tu.click();
    }
    const msg = thumbsUp.length > 0 ? "\n" : " no new activities ";
    process.stdout.write(`${msg} \n`);
  }
  browser.close();
}

const { EMAIL, PASSWORD } = process.env;
if (!EMAIL || !PASSWORD) {
  console.log(
    "Please, pass the strava credentials by setting the EMAIL and PASSWORD env vars."
  );
  process.exit(0);
}

let inputData = [];
stdin.on("data", (data) => inputData.push(data));

stdin.on("end", async () => {
  const listOfAthletePages = JSON.parse(inputData.join());
  await giveThumbUps(listOfAthletePages);
});
