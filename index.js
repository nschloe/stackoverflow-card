const http = require("http");
const url = require("url");
const fetch = require("node-fetch");
const StackOverflowCard = require("./src/stackoverflow-card");

const stringToBoolean = function (string) {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

http
  .createServer(async (req, res) => {
    // req.url is a relative URL, and url.parse() has no problem parsing it. However,
    // it's deprecated
    // <https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost>.
    // new URL() could take its job, but doesn't handle relative URLs well, see
    // <https://github.com/nodejs/node/issues/12682> and
    // <https://github.com/whatwg/url/issues/531>. Work around it for now.
    // See <https://github.com/nodejs/node/issues/12682#issuecomment-830843630>.
    // const reqUrl = new URL(req.url, `http://${req.headers.host}`);

    // req.url is the relative part,
    const reqUrl = req.url[0] === "/" ? req.url.substring(1) : req.url;
    const searchParams = new URLSearchParams(reqUrl);

    if (!searchParams.has("userID")) {
      res.write(
        JSON.stringify({
          error: "Missing userID",
        })
      );
      res.end();
      return;
    }
    const userID = searchParams.get("userID");

    const showLogo = searchParams.has("showLogo")
      ? stringToBoolean(searchParams.get("showLogo"))
      : true;

    const theme = searchParams.has("theme")
      ? searchParams.get("theme")
      : "stackoverflow-light";

    const showBorder = searchParams.has("showBorder")
      ? stringToBoolean(searchParams.get("showBorder"))
      : true;

    const showIcons = searchParams.has("showIcons")
      ? stringToBoolean(searchParams.get("showIcons"))
      : true;

    const showAnimations = searchParams.has("showAnimations")
      ? stringToBoolean(searchParams.get("showAnimations"))
      : true;

    const responseArticles = await fetch(
      `https://api.stackexchange.com/2.3/users/${userID}?site=stackoverflow`
    );
    const json = await responseArticles.json();

    if (!json.items || json.items.length === 0) {
      res.write(JSON.stringify({ error: "Failed fetching data" }));
      res.end();
      return;
    }

    const res2 = await fetch(
      `https://stackoverflow.com/users/rank\?userId\=${userID}`
    );
    // get text, trim, and remove tags
    const ratingText = (await res2.text()).trim().replace(/(<([^>]+)>)/gi, "");

    const result = await StackOverflowCard(
      json.items[0],
      ratingText,
      showLogo,
      showBorder,
      showIcons,
      showAnimations,
      theme
    );

    // res.setHeader(
    //   "Cache-Control",
    //   "private, no-cache, no-store, must-revalidate"
    // );
    // res.setHeader("Expires", "-1");
    // res.setHeader("Pragma", "no-cache");
    res.writeHead(200, { "Content-Type": "image/svg+xml" });

    res.write(result);
    res.end();
  })
  .listen(process.env.PORT || 3000, function () {
    console.log("server start at port 3000");
  });
