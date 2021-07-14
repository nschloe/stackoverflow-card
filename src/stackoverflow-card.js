const artwork = require("./artwork.js");

// https://stackoverflow.com/a/9462382/
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

const statLine = (icon, label, value, shiftValuePos) => {
  const showIcons = (icon === null);
  const labelOffset = showIcons ? "" : `x="25"`;
  return `
    ${icon}
    <text ${labelOffset} y="12.5">${label}:</text>
    <text x="${(showIcons ? 140 : 120) + shiftValuePos}" y="12.5">${value}</text>
  `;
};

const StackOverflowCard = async (
  data,
  ratingText,
  showLogo,
  showBorder,
  showIcons,
  theme
) => {
  if (theme === "dracula") {
    background = "#282a36";
    foreground = "#f8f8f2";
    logoColor = foreground;
  } else if (theme === "stackoverflow-dark") {
    background = "#2D2D2D";
    foreground = "#F2F2F3";
    logoColor = foreground;
  } else {
    // fallback
    if (theme !== "stackoverflow-light") {
      console.warn("Illegal theme " + theme);
    }
    background = "#fff";
    foreground = "#0f0f0f";
    logoColor = "default";
  }

  // hide_title=true
  // hide_border=true
  // show_icons=true
  // include_all_commits=true
  // count_private=true
  // line_height=21
  // theme=dracula

  iconColor = foreground;

  const gold = "#F1B600";
  const silver = "#9A9B9E";
  const bronze = "#AB825F";

  const width = 320;
  const height = 135;

  if (showLogo) {
    logoSvg = `
      <g fill="${foreground}" transform="translate(14, 5)">
        ${artwork.logo(logoColor, 25)}
      </g>`;
  } else {
    logoSvg = ``;
  }

  const iconSize = 16;

  const lineRep = statLine(
      artwork.coinsMono(iconSize),
      "Total Reputation",
      nFormatter(data.reputation, 1),
      40
    );
  const lineRepYear = statLine(
      artwork.reputation(iconSize),
      "Reputation this Year",
      nFormatter(data.reputation_change_year, 1),
      40
    );
  const lineRating = statLine(
      artwork.achievementsSm(iconSize),
      "Rating",
      ratingText,
      40
    );

  const badges = `
      <circle cx="0" cy="0" r="5"/>
      <tspan fill="${gold}">
        ● ${data.badge_counts.gold}
      </tspan>
      <tspan fill="${silver}" dx="1em">
        ● ${data.badge_counts.silver}
      </tspan>
      <tspan fill="${bronze}" dx="1em">
        ● ${data.badge_counts.bronze}
      </tspan>`;
  const lineBadges = statLine(
      artwork.medal(iconSize),
      "Badges",
      badges,
      40
    );

  return `
    <svg
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}"
     xmlns="http://www.w3.org/2000/svg"
     font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Liberation Sans,sans-serif"
     font-size="12"
     fill="${foreground}"
     font-weight="bold"
    >
      <rect
       fill="${background}"
       width="${width}"
       height="${height}"
       rx="4.5"
      />
      ${logoSvg}

      <g transform="translate(25, 40)">
        ${lineRep}
      </g>
      <g transform="translate(25, 60)">
        ${lineRepYear}
      </g>
      <g transform="translate(25, 80)">
        ${lineRating}
      </g>
      <g transform="translate(25, 100)">
        ${lineBadges}
      </g>
    </svg>
  `;
};

module.exports = StackOverflowCard;
