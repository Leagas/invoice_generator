const puppeteer = require('puppeteer');
const path = require("path")
const data = require("./input.json")

function getContent(i) {
  const keys = Object.keys(data[i]);

  return keys.reduce((prev, curr, index) => {
    let currentItem = data[i][curr];
    let  newItem;

    if (typeof currentItem !== "string") {
      currentItem = JSON.stringify(currentItem)
      newItem = `let ${curr} = ${currentItem}`
    } else {
      newItem = `let ${curr} = '${currentItem}'`
    }

    if (index !== keys.length) {
      prev += "\n"
    }

    return prev + newItem
  }, "")
}

async function main(data) {

  for (let i = 0; i < data.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(require.resolve(path.join(__dirname, "./index.html")), {
      waitUntil: 'networkidle0',
      timeout: 0
    });
    await page.addScriptTag({type: "text/javascript", content: `${getContent(i)}; init();` });
    await page.pdf({ path: `output/${i}.pdf` })

    await browser.close();
  }
}

main(data)