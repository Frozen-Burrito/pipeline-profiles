console.time(`chart loading`);
import { generalTheme } from "../modules/themes.js";
import ieWarn from "ie-gang";
import { runConditions } from "../conditions/TransCanadaPipeLinesLimited/index.js";
import { runIncidents } from "../incidents/TransCanadaPipeLinesLimited/index.js";
import { runSettlements } from "../settlements/TransCanadaPipeLinesLimited/index.js";

let warningParams = {
  message:
    "We noticed you are using Internet Explorer. Please consider using a different browser for a better experience on this page.",
  type: "alert",
  title: "Old Browser Warning",
  applyIE: false,
};

ieWarn(warningParams);
generalTheme();

// async version
async function loadAllCharts() {
  let arrayOfCharts = [
    runConditions(),
    runIncidents(),
    runSettlements(),
  ];
  Promise.allSettled(arrayOfCharts).then((value) => {
    console.timeEnd(`chart loading`);
  });
}

loadAllCharts();
