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

const StackOverflowCard = async (data, ratingText, theme) => {
  if (theme === "dracula") {
    background = "#282a36";
    foreground = "#f8f8f2";
    gold = "#f1fa8c";
    silver = "#6272a4";
    bronze = "#ffb86c";
  } else if (theme === "stackoverflow-dark") {
    background = "#2D2D2D";
    foreground = "#F2F2F3";
    gold = "#F1B600";
    silver = "#9A9B9E";
    bronze = "#AB825F";
  } else {
    // fallback
    if (theme !== "stackoverflow-light") {
      console.warn("Illegal theme " + theme);
    }
    background = "#fff";
    foreground = "#0f0f0f";
    gold = "#F1B600";
    silver = "#9A9B9E";
    bronze = "#AB825F";
  }

  const width = 300;
  const height = 120;
  const fontSize = 12;
  const xOffset1 = 13;
  const xOffset2 = 150;
  const baseYOffset = 48;
  const lineHeight = 17;
  const badgeRadius = 3.5;
  const fontFamily = "Arial-BoldMT, Arial";

  const borderRadius = 4.5;

  return `
    <svg
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}"
     xmlns="http://www.w3.org/2000/svg"
    >
      <rect
       fill="${background}"
       width="${width}"
       height="${height}"
       rx="${borderRadius}"
      />
      <text
       font-family="${fontFamily}"
       font-size="15"
       font-weight="bold"
       fill="${foreground}"
      >
        <tspan x="12" y="23">StackOverflow</tspan>
      </text>
      <text
       font-family="${fontFamily}"
       font-size="${fontSize}"
       fill="${foreground}"
       font-weight="bold"
      >
        <tspan x="${xOffset1}" y="${baseYOffset}">Total Reputation:</tspan>
        <tspan x="${xOffset2}" y="${baseYOffset}">${nFormatter(
    data.reputation,
    1
  )}</tspan>
        <tspan x="${xOffset1}" y="${
    baseYOffset + lineHeight
  }">Reputation this Year:</tspan>
        <tspan x="${xOffset2}" y="${baseYOffset + lineHeight}">+${nFormatter(
    data.reputation_change_year,
    1
  )}</tspan>
        <tspan x="${xOffset1}" y="${
    baseYOffset + 2 * lineHeight
  }">Rating:</tspan>
        <tspan x="${xOffset2}" y="${
    baseYOffset + 2 * lineHeight
  }">${ratingText}</tspan>
        <tspan x="${xOffset1}" y="${
    baseYOffset + 3 * lineHeight
  }">Badges:</tspan>
        <!--tspan x="${xOffset2}" y="${
    baseYOffset + 3 * lineHeight
  }">okay</tspan-->
      </text>
      <g fill="${gold}">
        <circle
         cx="${xOffset2 + badgeRadius}"
         cy="${baseYOffset + 3 * lineHeight - badgeRadius}"
         r="${badgeRadius}"
        />
        <text
         font-family="${fontFamily}"
         font-size="${fontSize}"
         font-weight="bold"
         >
          <tspan
           x="${xOffset2 + 10}"
           y="${baseYOffset + 3 * lineHeight}"
          >${data.badge_counts.gold}</tspan>
        </text>
      </g>
      <g fill="${silver}">
        <circle
         cx="${xOffset2 + badgeRadius + 35}"
         cy="${baseYOffset + 3 * lineHeight - badgeRadius}"
         r="${badgeRadius}"
        />
        <text
         font-family="${fontFamily}"
         font-size="${fontSize}"
         font-weight="bold"
        >
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
        <text
         font-family="${fontFamily}"
         font-size="${fontSize}"
         font-weight="bold"
        >
          <tspan
           x="${xOffset2 + badgeRadius + 90}"
           y="${baseYOffset + 3 * lineHeight}"
          >${data.badge_counts.bronze}</tspan>
        </text>
      </g>
    </svg>
  `;
};

module.exports = StackOverflowCard;
