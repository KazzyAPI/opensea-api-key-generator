/** @format */

const puppeteer = require("puppeteer-extra");
const colors = require("colors");
const config = require("./config.json");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
let counter = 1;
async function scrape() {
  try {
    console.log(colors.green("[+] Starting Automation"));
    puppeteer.launch({ headless: false }).then(async (browser) => {
      const page = await browser.newPage();
      await page.goto(
        "https://docs.google.com/forms/d/e/1FAIpQLScC_p4RrldpdTq-zSLXrYtyqRhMDU9oCKx-eAq_9kHbj68C8g/viewform?embedded=true",
        { waitUntil: "load" }
      );
      let username = `#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input`;
      await page.waitForSelector(username);
      let projectName = `#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(2) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input`;
      let projectDescription = `#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(3) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPapertextareaMainContent.exportContent > div.quantumWizTextinputPapertextareaContentArea.exportContentArea > textarea`;
      let linkToWebsite = `#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(4) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input`;
      let submitButton = `#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewNavigationNavControls > div.freebirdFormviewerViewNavigationButtonsAndProgress.hasClearButton > div.freebirdFormviewerViewNavigationLeftButtons > div > span > span`;
      let chromeBug = config.email.split("@");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.click(username);
      await page.type(
        username,
        `${chromeBug[0]}+${randomWord(8)}@${chromeBug[1]}`,
        { delay: 50 }
      );
      console.log(
        colors.green("[+] Username: ") +
          colors.yellow(`${chromeBug[0]}+${randomWord(8)}@${chromeBug[1]}`)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.click(projectName);
      console.log(
        colors.green("[+] Project Name: ") + colors.yellow(`${config.project}`)
      );
      await page.type(projectName, config.project, { delay: 50 });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.click(projectDescription);
      await page.type(projectDescription, config["project-description"], {
        delay: 100,
      });
      console.log(
        colors.green("[+] Project Description: ") +
          colors.yellow(`${config["project-description"]}`)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.click(linkToWebsite);
      await page.type(linkToWebsite, config["project-url"], { delay: 50 });
      console.log(
        colors.green("[+] Link to Website: ") +
          colors.yellow(`${config["project-url"]}`)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(
        colors.green(
          `[+] Submitted Form (${counter}/${config["amount-to-send"]})`
        )
      );
      console.log(colors.green("[+] Closing Browser"));
      await browser.close();
      if (counter <= config["amount-to-send"]) {
        counter++;
        scrape();
      } else {
        console.log(colors.green("[+] Finished Automation"));
      }
    });
  } catch (error) {
    console.log(colors.red(`[-] Error: ${error.message}`));
    await browser.close();
  }
}

function randomWord(length) {
  var result = "";
  var words = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < length; i++)
    result += words.charAt(Math.floor(Math.random() * words.length));
  return result;
}

scrape();
