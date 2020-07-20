const stdin = process.stdin;
const common = require("./common");

async function giveThumbUps(listOfAthletePages) {
  const { page, browser } = await common.getPage();
  let ok = 0;
  let failed = 0;

  /* Go over all the activity pages and give thumbs up */
  for (const activityPage of listOfAthletePages) {
    try {
      process.stdout.write(`- ${activityPage}:`);
      await page.goto(activityPage);
      const thumbsUp = await page.$$(
        "button.btn.btn-default.btn-kudo.btn-xs.js-add-kudo",
        (b) => b
      );
      for (const tu of thumbsUp) {
        process.stdout.write("👍 ");
        await tu.click();
        await common.sleep(1000);
      }
      const msg = thumbsUp.length > 0 ? "" : " no new activities ";
      process.stdout.write(`${msg} \n`);
      ok++;
    } catch (error) {
      process.stderr.write("Error when trying to give thumbs up. Skipping.");
      process.stderr.write(error);
      failed++;
      continue;
    }
  }
  process.stdout.write(
    `Results (athletes processed): ${ok} OK, ${failed} failed \n`
  );
  browser.close();
}

let inputData = [];
stdin.on("data", (data) => inputData.push(data));

stdin.on("end", async () => {
  const listOfAthletePages = JSON.parse(inputData.join());
  await giveThumbUps(listOfAthletePages);
});
