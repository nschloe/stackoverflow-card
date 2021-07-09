const http = require("http");
const url = require("url");
const fetch = require("node-fetch");
const StackOverflowCard = require("./src/stackoverflow-card");

http
  .createServer(async (req, res) => {
    const reqURL = url.parse(req.url, true);
    const { userID, theme = "stackoverflow-light" } = reqURL.query;

    if (!userID) {
      res.write(
        JSON.stringify({
          error: "Missing userID",
        })
      );
      res.end();
      return;
    }

    const responseArticles = await fetch(
      `https://api.stackexchange.com/2.3/users/${userID}?site=stackoverflow`
    );
    const json = await responseArticles.json();

    if (!json.items || json.items.length === 0) {
      res.write(
        JSON.stringify({ error: "Failed fetching data" })
      );
      res.end();
      return;
    }

    const res2 = await fetch(
      `https://stackoverflow.com/users/rank\?userId\=${userID}`
    );
    // get text, trim, and remove tags
    const ratingText = (await res2.text()).trim().replace(/(<([^>]+)>)/gi, "");

    const result = await StackOverflowCard(json.items[0], ratingText, theme);

    res.setHeader(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");
    res.writeHead(200, { "Content-Type": "image/svg+xml" });

    res.write(result);
    res.end();
  })
  .listen(process.env.PORT || 3000, function () {
    console.log("server start at port 3000");
  });
