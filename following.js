const puppeteer = require("puppeteer");
const loginURL =
  "https://www.strava.com/login?cta=log-in&element=global-header&source=registers_show";
const followingPage =
  "https://www.strava.com/athletes/736965/follows?type=following";

const { EMAIL, PASSWORD } = process.env;

if (!EMAIL || !PASSWORD) {
  console.error(
    "Please, pass the strava credentials by setting the EMAIL and PASSWORD env vars."
  );
  process.exit(0);
}

(async () => {
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

  let athletesLinks = [];
  let nextPage = followingPage;
  let pageNum = 1;
  while (nextPage) {
    await page.goto(nextPage);

    /* Get athlete links given a page */
    const athleteLinksOnPage = await page.$$eval("a.avatar-content", (nodes) =>
      nodes.map((n) => n.href)
    );
    console.error(
      `Page #${pageNum}, # of athletes: ${athleteLinksOnPage.length}`
    );
    athletesLinks = [...athletesLinks, ...athleteLinksOnPage];

    nextPage = await page.evaluate(() => {
      const el = document.querySelectorAll("li.next_page")[0].children[0];
      return (el.tagName = "A" ? el.href : null);
    });
    pageNum += 1;
  }

  const onlyPeople = athletesLinks.filter((l) => l.match(/\/athletes\/\d+$/));
  console.log(JSON.stringify(onlyPeople));
  browser.close();
})();
