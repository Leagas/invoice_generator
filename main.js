const puppeteer = require('puppeteer');
const path = require("path")
const data = require("./input.json")

async function main(data) {

  for (let i = 0; i < data.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.addScriptTag({ content: `window.name = "${data[i].name}"` });
    await page.goto(require.resolve(path.join(__dirname, "./index.html")));
    await page.pdf({ path: `output/${i}.pdf`, format: "a4" })
  
    await browser.close();
  }
}

main(data)