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
  const height = 125;
  const fontSize = 12;
  const xOffset2 = 170;
  const baseYOffset = 57;
  const lineHeight = 17;
  const badgeRadius = 3.5;
  const fontFamily = "Arial-BoldMT, Arial";

  const borderRadius = 4.5;

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
      X
      <g>
      X
      </g>
      <g fill="${gold}">
        <circle
         cx="${xOffset2 + badgeRadius}"
         cy="${baseYOffset + 3 * lineHeight - badgeRadius}"
         r="${badgeRadius}"
        />
        <text>X
          <!--tspan
           x="${xOffset2 + 10}"
           y="${baseYOffset + 3 * lineHeight}"
          >${data.badge_counts.gold}</tspan-->
        </text>
      </g>
      <g fill="${silver}">
        <circle
         cx="${xOffset2 + badgeRadius + 35}"
         cy="${baseYOffset + 3 * lineHeight - badgeRadius}"
         r="${badgeRadius}"
        />
        <text>
          <tspan
           x="${xOffset2 + badgeRadius + 42}"
           y="${baseYOffset + 3 * lineHeight}"
          >${data.badge_counts.silver}</tspan>
        </text>
      </g>
      <g fill="${bronze}">
        <circle
         cx="${xOffset2 + badgeRadius + 80}"
         cy="${baseYOffset + 3 * lineHeight - badgeRadius}"
         r="${badgeRadius}"/>
        <text>
          <tspan
           x="${xOffset2 + badgeRadius + 90}"
           y="${baseYOffset + 3 * lineHeight}"
          >${data.badge_counts.bronze}</tspan>
        </text>
      </g>`;
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
     font-family="${fontFamily}"
     font-size="${fontSize}"
     fill="${foreground}"
     font-weight="bold"
    >
      <rect
       fill="${background}"
       width="${width}"
       height="${height}"
       rx="${borderRadius}"
      />

      <g transform="translate(25, 25)">
        ${lineRep}
      </g>
      <g transform="translate(25, 45)">
        ${lineRepYear}
      </g>
      <g transform="translate(25, 65)">
        ${lineRating}
      </g>
      <g transform="translate(25, 85)">
        ${lineBadges}
      </g>
    </svg>
  `;
};

module.exports = StackOverflowCard;
