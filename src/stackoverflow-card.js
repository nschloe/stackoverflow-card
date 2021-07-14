const artwork = require("./artwork.js");
const themes = require("./themes.js");

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

const statLine = (icon, iconColor, label, value) => {
  const showIcons = icon === null;
  const labelOffset = showIcons ? "" : `x="25"`;
  const shiftValuePos = 40;
  return `
    <g fill="${iconColor}">${icon}</g>
    <text ${labelOffset} y="12.5" fill="">${label}:</text>
    <text x="${
      (showIcons ? 100 : 120) + shiftValuePos
    }" y="12.5">${value}</text>
  `;
};

const StackOverflowCard = async (
  data,
  ratingText,
  showLogo,
  showBorder,
  showIcons,
  showAnimations,
  theme
) => {
  // normalize scheme name: remove all non-alphanumeric chars, lowercase
  theme = theme.replace(/\W/g, "").toLowerCase();

  if (theme in themes) {
    colors = themes[theme];
  } else {
    console.warn("Illegal theme " + theme);
    colors = themes["stackoverflowlight"];
  }

  const width = 325;
  const height = showLogo ? 135 : 105;
  const yOffset = showLogo ? 40 : 10;

  if (showLogo) {
    logoSvg = `
      <g transform="translate(14, 5)">
        ${artwork.logo(colors.logo, 25)}
      </g>`;
  } else {
    logoSvg = ``;
  }

  const iconSize = 16;

  const lineRep = statLine(
    showIcons ? artwork.coinsMono(iconSize) : null,
    colors.icon,
    "Total Reputation",
    nFormatter(data.reputation, 1)
  );
  const lineRepYear = statLine(
    showIcons ? artwork.reputation(iconSize) : null,
    colors.icon,
    "Reputation this Year",
    nFormatter(data.reputation_change_year, 1)
  );
  const lineRating = statLine(
    showIcons ? artwork.achievementsSm(iconSize) : null,
    colors.icon,
    "Rating",
    ratingText
  );

  // colors from stackoverflow
  const badges = `
      <tspan fill="#F1B600">
        ● ${data.badge_counts.gold}
      </tspan>
      <tspan fill="#9A9B9E" dx="1em">
        ● ${data.badge_counts.silver}
      </tspan>
      <tspan fill="#AB825F" dx="1em">
        ● ${data.badge_counts.bronze}
      </tspan>`;
  const lineBadges = statLine(
    showIcons ? artwork.medal(iconSize) : null,
    colors.icon,
    "Badges",
    badges,
    40
  );

  lines = [lineRep, lineRepYear, lineRating, lineBadges];
  linesStr = ``;
  for (i = 0; i < lines.length; i++) {
    anim = showAnimations
      ? `class=\"fadein\" style=\"animation-delay: ${300 + i * 200}ms\"`
      : "";
    linesStr = linesStr.concat(`
      <g ${anim} transform="translate(25, ${yOffset + i * 20})">
        ${lines[i]}
      </g>`);
  }

  return `
    <svg
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}"
     xmlns="http://www.w3.org/2000/svg"
     font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Liberation Sans,sans-serif"
     font-size="12"
     fill="${colors.foreground}"
     font-weight="bold"
    >
      <style>
        .fadein {
          animation: fadeInAnimation 0.8s ease-in-out forwards;
          opacity: 0;
        }
        @keyframes fadeInAnimation {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      </style>

      <rect
       fill="${colors.background}"
       width="${width}"
       height="${height}"
       stroke="${colors.border}"
       stroke-opacity="${showBorder ? 1 : 0}"
       rx="4.5"
      />
      ${logoSvg}

      ${linesStr}
    </svg>
  `;
};

module.exports = StackOverflowCard;
