import { listOrParagraph } from "./util.js"

const dynamicValue = (val) => {
  return `<i class="bg-primary" style="font-style: normal"><strong>&nbsp${val}&nbsp</strong></i>`;
};

const postWord = (val, type) => {
  if (type == "have") {
    if (val == 1) {
      return "has";
    } else {
      return "have";
    }
  } else if (type == "fatality") {
    if (val == 1) {
      return "fatality";
    } else {
      return "fatalities";
    }
  }
};

const changeText = (num, frontText = true) => {
  if (frontText) {
    var textInfo = (val) => {
      if (val > 0) {
        return ["bg-success", `increased by ${Math.abs(num)}%`]
      } else if (val < 0) {
        return ["bg-danger", `decreased by ${Math.abs(num)}%`]
      } else {
        return ["bg-info", "not changed"]
      }
    }
  } else {
    var textInfo = (val) => {
      if (val > 0) {
        return ["bg-success", `${Math.abs(num).toFixed(0)}% above`]
      } else if (val < 0) {
        return ["bg-danger", `${Math.abs(num).toFixed(0)}% below`]
      } else {
        return ["bg-info", "equal to"]
      }
    }
  }

  let [flag, text] = textInfo(num)
  return `<i class="${flag}" style="font-style: normal"><strong>${text}</strong></i>`
};

const quarters = { 12: "Q4", 9: "Q3", 6: "Q2", 3: "Q1" };

export const incidentsTextEng = (id, meta) => {
  const paragraph = document.getElementById(id);
  let paragraphText = `<p>`;
  //total incidents.
  paragraphText += `The ${meta.systemName
    } has reported a total of ${dynamicValue(
      meta.release + meta.nonRelease
    )} incidents since 2008. Of those incidents, ${dynamicValue(
      meta.release
    )} have resulted in some volume of product being released, with ${dynamicValue(
      meta.mostCommonSubstance
    )} being the most commonly released substance. \
        The dashboard below provides some more information about these product release incidents.`;
  paragraphText += `</p>`;

  //most common reasons
  paragraphText += `<p>Part of the CER's incident review classifies incidents based on the\ 
        circumstances that directly led to the incident (what happened), and the underlying reasons for the incident (why it happened).\ 
        On this pipeline system, the most common what happened is ${dynamicValue(
    meta.mostCommonWhat
  )} and the most common why it happened is ${dynamicValue(
    meta.mostCommonWhy
  )}.`;
  paragraphText += ` Take a look at the incident trends section of the dashboard below for definitions and a breakdown of what and why.</p>`;

  //other important non-release incident types
  paragraphText += `<p>`;
  paragraphText += `The dashboard below displays only the incidents that resulted in a release of product from the pipeline, however there are other \
        important incident types that may not appear on the dashboard. \
        Of ${meta.systemName}'s reported incidents, ${dynamicValue(
    meta.seriousEvents["Adverse Environmental Effects"]
  )} ${postWord(
    meta.seriousEvents["Adverse Environmental Effects"],
    "have"
  )} resulted in adverse environmental effects.\
        There have been ${dynamicValue(
    meta.seriousEvents["Serious Injury (CER or TSB)"]
  )} serious injuries, and ${dynamicValue(
    meta.seriousEvents["Fatality"]
  )} ${postWord(
    meta.seriousEvents["Fatality"],
    "fatality"
  )} related to incident events. Open the dropdown below to view the definitions of these incident types.`;
  paragraphText += `</p>`;
  paragraph.innerHTML = paragraphText;
};

export const incidentsTextFra = (id, meta) => {
  const paragraph = document.getElementById(id);
  let paragraphText = `<p>`;
  //total incidents.
  paragraphText += `Un total de ${dynamicValue(
    meta.release + meta.nonRelease
  )} incidents ont été signalés à l’égard du réseau de ${meta.systemName
    } depuis 2008. De ces incidents, ${dynamicValue(
      meta.release
    )} ont entraîné le rejet d’un certain volume de produit. Le ${dynamicValue(
      meta.mostCommonSubstance
    )} est la substance la plus couramment rejetée. Le tableau de bord ci-dessous renferme de plus amples renseignements sur ces incidents.`;
  paragraphText += `</p>`;

  //most common reasons
  paragraphText += `<p>Dans le cadre de l’examen des incidents, la Régie classe ceux-ci en fonction des circonstances directement \
  liées à leur origine (ce qui s’est produit) et de leurs causes sous-jacentes (pourquoi cela s’est produit). \
  Sur ce réseau pipelinier, ce qui s’est produit le plus souvent, c’est de ${dynamicValue(
    meta.mostCommonWhat
  )} et la question de ${dynamicValue(meta.mostCommonWhy)}`;
  paragraphText += ` explique le plus souvent pourquoi cela s’est produit. Jetez un coup d’œil à la section sur les tendances des incidents du tableau de bord ci-dessous pour obtenir des définitions et une explication de ce qui se produit et pourquoi.</p>`;

  //other important non-release incident types
  paragraphText += `<p>`;
  paragraphText += `Le tableau de bord ci-dessous ne montre que les incidents qui ont entraîné un déversement de produit à partir du pipeline,\
   mais il y a d’autres types d’incidents importants qui peuvent ne pas y figurer. \
   Parmi les incidents signalés pour le ${meta.systemName}, ${dynamicValue(
    meta.seriousEvents["Adverse Environmental Effects"]
  )} ont entraîné des effets environnementaux négatifs.\
  Il y a eu ${dynamicValue(
    meta.seriousEvents["Serious Injury (CER or TSB)"]
  )} cas de blessures graves et ${dynamicValue(
    meta.seriousEvents["Fatality"]
  )} décès liés à des incidents. Cliquez sur le menu déroulant ci-dessous pour voir les définitions de ces types d’incidents.`;
  paragraphText += `</p>`;
  paragraph.innerHTML = paragraphText;
};

export function trafficTrendTextEng(
  metaData,
  defaultPoint,
  unitsHolder,
  tm,
  numberFormat
) {
  const formatValue = (value, units) => {
    if (units.base !== units.current) {
      return numberFormat(value * units.conversion);
    } else {
      return numberFormat(value);
    }
  };

  const trendSub = (commodity) => {
    if (commodity === "gas") {
      return "year over year";
    } else if (commodity === "oil") {
      return "quarter over quarter";
    } else {
      return "";
    }
  };

  const buildText = (trendText, trend, point, units) => {
    if (trend.name === "default") {
      var trendId = "";
    } else {
      var trendId = ` (${trend.name})`;
    }
    trendText += `Throughputs at the ${dynamicValue(
      point + trendId
    )} key point have ${changeText(trend.throughChange.pct)} ${trendSub(
      metaData.commodity
    )}, from an average of ${formatValue(trend.throughChange.from, units)} ${units.current
      } in ${quarters[trend.fromDate[1]]} ${trend.fromDate[0]
      } to an average of ${formatValue(trend.throughChange.to, units)} ${units.current
      } in ${quarters[trend.toDate[1]]} ${trend.toDate[0]
      } (most recent quarter of data).`;
    return trendText;
  };

  const buildFiveText = (ft, tt) => {
    let pctChange = ((ft.lastYrQtr - ft.fiveYrQtr) / ft.fiveYrQtr) * 100
    if (pctChange) {
      let qtr = `${quarters[tt.toDate[1]]} ${tt.toDate[0]}`
      return `<p style="margin-bottom: 0px">Throughputs in ${qtr} are ${changeText(pctChange, false)} the five year average.</p>`
    } else {
      return ""
    }
  }

  let trendText = "";
  if (!tm) {
    const thisTrend = metaData.trendText[defaultPoint.id];
    thisTrend.map((trend) => {
      trendText += `<p>${buildText("", trend, defaultPoint.name, unitsHolder)}</p>`
    });
    if (metaData.fiveTrend) {
      trendText += buildFiveText(metaData.fiveTrend, thisTrend[0])
    }
  } else {
    let pointNames = {};
    metaData.points.map((p) => {
      pointNames[p.id] = p.name;
    });

    let pointText = []
    for (const [defaultPoint, thisTrend] of Object.entries(
      metaData.trendText
    )) {
      if (defaultPoint in pointNames) {
        pointText.push({
          textCol: buildText(
            "",
            thisTrend[0],
            pointNames[defaultPoint],
            unitsHolder
          )
        });
      }

    }
    trendText = listOrParagraph(pointText, "textCol")
  }
  document.getElementById("traffic-trends").innerHTML = trendText;
}

export function trafficTrendTextFra(
  metaData,
  defaultPoint,
  unitsHolder,
  tm,
  numberFormat
) {
  const formatValue = (value, units) => {
    if (units.base !== units.current) {
      return numberFormat(value * units.conversion);
    } else {
      return numberFormat(value);
    }
  };

  const trendSub = (commodity) => {
    if (commodity === "gas") {
      return "year over year";
    } else if (commodity === "oil") {
      return "quarter over quarter";
    } else {
      return "";
    }
  };

  const buildText = (trendText, trend, point, units) => {
    if (trend.name === "default") {
      var trendId = "";
    } else {
      var trendId = ` (${trend.name})`;
    }
    trendText += `Throughputs at the ${dynamicValue(
      point + trendId
    )} key point have ${changeText(trend.throughChange.pct)} ${trendSub(
      metaData.commodity
    )}, from an average of ${formatValue(trend.throughChange.from, units)} ${units.current
      } in ${quarters[trend.fromDate[1]]} ${trend.fromDate[0]
      } to an average of ${formatValue(trend.throughChange.to, units)} ${units.current
      } in ${quarters[trend.toDate[1]]} ${trend.toDate[0]
      } (most recent quarter of data).`;
    return trendText;
  };

  const buildFiveText = (ft, tt) => {
    let pctChange = ((ft.lastYrQtr - ft.fiveYrQtr) / ft.fiveYrQtr) * 100
    if (pctChange) {
      let qtr = `${quarters[tt.toDate[1]]} ${tt.toDate[0]}`
      return `<p style="margin-bottom: 0px">Throughputs in ${qtr} are ${changeText(pctChange, false)} the five year average.</p>`
    } else {
      return ""
    }
  }

  let trendText = "";
  if (!tm) {
    const thisTrend = metaData.trendText[defaultPoint.id];
    thisTrend.map((trend) => {
      trendText += `<p>${buildText("", trend, defaultPoint.name, unitsHolder)}</p>`
    });
    if (metaData.fiveTrend) {
      trendText += buildFiveText(metaData.fiveTrend, thisTrend[0])
    }
  } else {
    let pointNames = {};
    metaData.points.map((p) => {
      pointNames[p.id] = p.name;
    });

    let pointText = []
    for (const [defaultPoint, thisTrend] of Object.entries(
      metaData.trendText
    )) {
      if (defaultPoint in pointNames) {
        pointText.push({
          textCol: buildText(
            "",
            thisTrend[0],
            pointNames[defaultPoint],
            unitsHolder
          )
        });
      }

    }
    trendText = listOrParagraph(pointText, "textCol")
  }
  document.getElementById("traffic-trends").innerHTML = trendText;
}
