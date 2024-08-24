import puppeteer from "puppeteer";
import cors from "cors";
const express = require("express");
const app = express();
app.use(cors());
app.get("/", (req, res) => res.send("NONNONON"));

app.get("/instagramData", (req, res) => {
  const username = req?.body?.username || "tanishqkrk";
  try {
    puppeteer.launch().then(async function (browser) {
      const page = await browser.newPage();
      const instagram_username = "briqs.site";
      const instagram_password = "tanishqkrk";

      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      );
      await page.setViewport({ width: 1560, height: 900 });
      await page.goto("https://www.instagram.com/");
      await page.waitForSelector("input[name='username']");
      await page.type("input[name='username']", instagram_username);
      await page.type("input[name='password']", instagram_password);
      await page.click("._acan._acap._acas._aj1-._ap30");
      // await page.waitForTimeout(5000);
      await page.goto("https://www.instagram.com/" + username);
      const loaded = await page.waitForSelector(".html-span");
      const stats = async function allStats() {
        return await page.evaluate(() => {
          const data = Array.from(document.querySelectorAll(".html-span")).map(
            (stat) => {
              return stat.textContent;
            }
          );
          const pfp = document.querySelector(
            ".xpdipgo.x972fbf.xcfux6l.x1qhh985.xm0m39n.xk390pu.x5yr21d.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xl1xv1r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x11njtxf.xh8yej3"
            // @ts-ignore
          )?.src;
          const name = document.querySelector(
            ".x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.xvs91rp.x1s688f.x5n08af.x10wh9bi.x1wdrske.x8viiok.x18hxmgj"
          )?.textContent;
          const bio = document.querySelector(
            "._ap3a._aaco._aacu._aacx._aad7._aade"
          )?.textContent;
          return {
            data,
            pfp,
            name,
            bio,
          };
        });
      };
      const { data, pfp, name, bio } = await stats();
      await browser.close();
      res.json({
        posts: data[0],
        followers: data[1],
        following: data[2],
        pfp: pfp || "",
        name,
        bio,
      });
    });
  } catch (err) {
    res.json({
      error: "",
    });
  }
});

app.listen(5000, () => console.log("This is " + 5000));

module.exports = app;
