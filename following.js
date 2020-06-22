const common = require("./common.js");

(async () => {
  const followingPage =
    "https://www.strava.com/athletes/736965/follows?type=following";
  const { browser, page } = await common.getPage();
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
