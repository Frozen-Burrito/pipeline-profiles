import { cerPalette, conversions } from "../modules/util.js";
import { KeyPointMap } from "../modules/dashboard.js";

export async function mainTraffic(trafficData, metaData, lang) {
  function addPointButtons(metaData, defaultSelect) {
    let btnGroup = $("#traffic-points-btn");
    if (defaultSelect !== "Burnaby") {
      metaData.points.map((point) => {
        if (point == defaultSelect) {
          var checkTxt = " active";
        } else {
          var checkTxt = "";
        }
        btnGroup.append(
          `<div class="btn-group btn-point"><button type="button" value="${point}" class="btn btn-default${checkTxt}">${point}</button></div>`
        );
      });
    } else {
      metaData.points.map((point, i) => {
        btnGroup.append(
          `<div class="checkbox-inline">
          <label for="inlineCheck${i}" label><input id="inlineCheck${i}" checked="checked" type="checkbox" value="${point}">${point}</label>
       </div>`
        );
      });
    }
  }

  function addUnits(defaultUnit) {
    var buttonHTML = "";
    const unitsHolder = { base: defaultUnit, current: defaultUnit };

    const radioBtn = (unit, checked, i) => {
      if (checked) {
        var checkhtml = 'checked="checked"';
      } else {
        var checkhtml = " ";
      }
      return `<label for="units${i}" class="radio-inline">
    <input id="units${i}" value="${unit}" type="radio"${checkhtml}name="trafficUnits" />
    ${unit}</label>`;
    };
    if (defaultUnit == "Bcf/d") {
      var secondUnit = "Million m3/d";
      unitsHolder["conversion"] = conversions["Bcf/d to Million m3/d"];
    } else if (defaultUnit == "Mb/d") {
      var secondUnit = "Thousand m3/d";
      unitsHolder["conversion"] = conversions["Mb/d to Thousand m3/d"];
    }

    [
      [defaultUnit, true],
      [secondUnit, false],
    ].map((unit, i) => {
      buttonHTML += radioBtn(unit[0], unit[1], i);
    });
    document.getElementById("select-units-radio").innerHTML = buttonHTML;

    return unitsHolder;
  }

  const setTitle = (point, tradeType, tm = false) => {
    if (!tm) {
      return `${point} - monthly ${tradeType[1]} traffic (Direction of flow: ${tradeType[0]})`;
    } else {
      return `${point.join("-")} monthly traffic`;
    }
  };

  function tooltipText(event, units) {
    const rounding = 2;

    const addRow = (p, unit, rounding, extraStyle = "") => {
      return `<tr style="${extraStyle}"><th style="color:${p.color}">${
        p.series.name
      }:</th><th>&nbsp${p.y.toFixed(rounding)} ${unit}</th></tr>`;
    };

    const addTable = (section) => {
      let toolText = `<table class="mrgn-tp-sm">`;
      let total = 0;
      section.traffic.map((row) => {
        toolText += row[0];
        total += row[1];
      });
      if (section.traffic.length >= 2) {
        toolText += addRow(
          {
            color: cerPalette["Cool Grey"],
            series: { name: "Total" },
            y: total,
          },
          units,
          rounding,
          "border-top: 1px dashed grey"
        );
      }
      if (section.hasOwnProperty("capacity")) {
        toolText += section.capacity[0];
        toolText += addRow(
          {
            color: cerPalette["Cool Grey"],
            series: { name: "Utilization" },
            y: (total / section.capacity[1]) * 100,
          },
          "%",
          0,
          "border-top: 1px solid grey"
        );
      }

      toolText += `</table>`;
      return toolText;
    };

    var textHolder = {
      imports: { traffic: [], capacity: 0 },
      other: { traffic: [] },
    };
    var hasImports = false;
    event.points.map((p) => {
      if (p.series.name == "import") {
        hasImports = true;
        textHolder.imports.traffic.push([addRow(p, units, rounding), p.y]);
      } else if (p.series.name == "Import Capacity") {
        textHolder.imports.capacity = [addRow(p, units, rounding), p.y];
      } else if (
        p.series.name == "Capacity" ||
        p.series.name == "Export Capacity"
      ) {
        textHolder.other.capacity = [addRow(p, units, rounding), p.y];
      } else {
        textHolder.other.traffic.push([addRow(p, units, rounding), p.y]);
      }
    });

    // tooltip header
    let toolText = `<strong>${Highcharts.dateFormat(
      "%b, %Y",
      event.x
    )}</strong>`;

    toolText += addTable(textHolder.other);

    if (hasImports) {
      toolText += addTable(textHolder.imports);
    }
    return toolText;
  }

  const createSeries = (trafficData, defaultPoint, includeList = []) => {
    var firstSeries = [];
    var capAdded = false;
    if (defaultPoint == "Burnaby") {
      for (const [key, keyData] of Object.entries(
        JSON.parse(JSON.stringify(trafficData))
      )) {
        if (includeList.includes(key)) {
          keyData.map((data) => {
            if (data.name == "Capacity" && !capAdded) {
              capAdded = true;
              firstSeries.push(data);
            } else if (data.name !== "Capacity") {
              data.name = data.name + "-" + key;
              firstSeries.push(data);
            }
          });
        }
      }
    } else {
      firstSeries = trafficData[defaultPoint];
    }
    return firstSeries;
  };

  function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
  }

  function addSeriesParams(series, unitsHolder) {
    series.sort(function (a, b) {
      return compareStrings(a.name, b.name);
    });
    const newSeries = JSON.parse(JSON.stringify(series));
    return newSeries.map((s) => {
      s.id = s.name;
      if (unitsHolder.base !== unitsHolder.current) {
        s.data = s.data.map((row) => {
          return [row[0], row[1] ? row[1] * unitsHolder.conversion : null];
        });
      } else {
        s.data = s.data;
      }
      if (
        s.name == "Capacity" ||
        s.name == "Import Capacity" ||
        s.name == "Export Capacity"
      ) {
        s.type = "line";
        s.zIndex = 5;
        s.lineWidth = 3;
      } else {
        s.type = "area";
        s.zIndex = 4;
        s.lineWidth = 1;
      }
      return s;
    });
  }

  function getPointList(keyPoints) {
    var pointList = [];
    keyPoints.map((point) => {
      pointList.push(point["Key Point"]);
    });
    return pointList.sort();
  }

  const trafficChart = (series, title, units, div = "traffic-hc") => {
    return new Highcharts.chart(div, {
      chart: {
        zoomType: "x",
        marginRight: 0,
        animation: false,
      },
      credits: {
        text: "",
      },
      title: {
        align: "left",
        x: 10,
        text: title,
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      xAxis: {
        type: "datetime",
        crosshair: true,
      },
      yAxis: [
        {
          title: {
            text: units,
          },
          min: 0,
        },
        { visible: false },
      ],
      tooltip: {
        shared: true,
        backgroundColor: "white",
        useHTML: true,
        formatter: function () {
          return tooltipText(this, units);
        },
      },
      legend: {
        alignColumns: false,
        margin: 0,
        symbolPadding: 2,
      },
      plotOptions: {
        area: {
          stacking: "normal",
        },
        series: {
          connectNulls: false,
          marker: {
            enabled: false,
          },
          states: {
            inactive: {
              opacity: 1,
            },
          },
        },
      },
      series: series,
    });
  };

  const hasImportsRedraw = (chart, btnValue, metaData, units) => {
    chart.update(
      {
        title: {
          text: setTitle(btnValue, metaData.directions[btnValue]),
        },
        yAxis: [
          {
            title: {
              text: `Exports (${units})`,
            },
            height: "45%",
            min: 0,
            max: undefined,
          },
          {
            visible: true,
            title: {
              text: `Imports (${units})`,
            },
            top: "50%",
            height: "45%",
            offset: 0,
            min: 0,
            max: undefined,
          },
        ],
      },
      false,
      false,
      false
    );
    chart.redraw(false);
    var maxY = Math.max(chart.yAxis[0].max, chart.yAxis[1].max);
    chart.update(
      {
        yAxis: [
          {
            max: maxY,
          },
          {
            max: maxY,
          },
        ],
      },
      false,
      false,
      false
    );
    return chart;
  };

  function buildDashboard() {
    try {
      var defaultPoint = metaData.defaultPoint;
      if (defaultPoint == "Burnaby") {
        var tm = true;
      } else {
        var tm = false;
      }
      const unitsHolder = addUnits(metaData.units);
      var pointMap = undefined;
      metaData.points = getPointList(metaData.keyPoints);
      if (defaultPoint !== "system") {
        if (metaData.points.length == 1) {
          // eg, Keystone
          ["traffic-points-btn", "key-point-title"].map((hideDiv) => {
            document.getElementById(hideDiv).style.display = "none";
          });
        } else {
          addPointButtons(metaData, defaultPoint);
        }

        if (
          ["TransCanada PipeLines Limited", "Enbridge Pipelines Inc."].includes(
            metaData.companyName
          )
        ) {
          var minRadius = 50000;
          var padding = [0, 0];
        } else if (metaData.companyName == "Trans Mountain Pipeline ULC") {
          var minRadius = 2000;
          var padding = [60, 60];
        } else if (metaData.points.length == 1) {
          var minRadius = 30000;
          var padding = [150, 150];
        } else {
          var minRadius = 30000;
          var padding = [30, 30];
        }
        pointMap = new KeyPointMap({
          points: metaData.keyPoints,
          selected: !tm ? [defaultPoint] : metaData.points,
          minRadius: minRadius,
          padding: padding,
        });
        pointMap.addBaseMap();
        pointMap.addPoints();
      } else {
        ["traffic-points-btn", "traffic-container", "key-point-title"].map(
          (hideDiv) => {
            document.getElementById(hideDiv).style.display = "none";
          }
        );
        var element = document.getElementById("traffic-hc-column");
        element.className = element.className.replace("col-md-8", "col-md-12");
      }

      const firstSeries = createSeries(
        trafficData,
        defaultPoint,
        metaData.points
      );

      const chart = trafficChart(
        addSeriesParams(firstSeries, unitsHolder),
        !tm
          ? setTitle(defaultPoint, metaData.directions[defaultPoint])
          : setTitle(metaData.points, undefined, tm),
        unitsHolder.current
      );
      var hasImports = false;
      if (defaultPoint == "St. Stephen") {
        ["traffic-points-btn", "key-point-title"].map((hideDiv) => {
          document.getElementById(hideDiv).style.display = "none";
        });
        hasImports = true;
        hasImportsRedraw(chart, defaultPoint, metaData, unitsHolder.current);
        chart.redraw(true);
      }
      lang.dynamicText(metaData, defaultPoint, unitsHolder.current, tm);

      // user selects key point
      if (!tm) {
        $("#traffic-points-btn button").on("click", function () {
          $(".btn-point > .btn").removeClass("active");
          var thisBtn = $(this);
          hasImports = false;
          thisBtn.addClass("active");
          defaultPoint = thisBtn.val();
          const newSeries = addSeriesParams(
            trafficData[defaultPoint],
            unitsHolder
          );

          var currentIds = chart.series.map((s) => {
            return s.userOptions.id;
          });

          var newIds = newSeries.map((s) => {
            return s.id;
          });

          currentIds.map((id) => {
            if (!newIds.includes(id)) {
              chart.get(id).remove(false);
            }
          });

          newSeries.map((newS) => {
            if (currentIds.includes(newS.id)) {
              chart.get(newS.id).setData(newS.data, false, false, false);
            } else {
              chart.addSeries(newS, false, true);
            }
            if (newS.name == "import") {
              hasImports = true;
            }
          });
          if (hasImports) {
            hasImportsRedraw(
              chart,
              defaultPoint,
              metaData,
              unitsHolder.current
            );
          } else {
            chart.update(
              {
                title: {
                  text: setTitle(
                    defaultPoint,
                    metaData.directions[defaultPoint]
                  ),
                },
                yAxis: [
                  {
                    title: {
                      text: unitsHolder.current,
                    },
                    height: "100%",
                    min: 0,
                    max: undefined,
                  },
                  { visible: false },
                ],
              },
              false
            );
          }
          chart.redraw(true);
          pointMap.pointChange([defaultPoint]);
          lang.dynamicText(metaData, defaultPoint, unitsHolder.current, tm);
        });
      } else {
        $("#traffic-points-btn input[type=checkbox]").on("change", function () {
          if ($(this).is(":checked")) {
            metaData.points.push($(this).val());
          } else {
            metaData.points = metaData.points.filter(
              (point) => point !== $(this).val()
            );
          }
          const newSeries = addSeriesParams(
            createSeries(trafficData, defaultPoint, metaData.points),
            unitsHolder
          );
          while (chart.series.length) {
            chart.series[0].remove(false, false, false);
          }
          newSeries.map((newS) => {
            chart.addSeries(newS, false, false);
          });
          chart.update(
            {
              title: {
                text: setTitle(metaData.points, undefined, tm),
              },
            },
            false
          );
          chart.redraw(true);
          pointMap.pointChange(metaData.points);
        });
      }

      //user selects units
      $("#select-units-radio input[name='trafficUnits']").click(function () {
        unitsHolder.current = $("input:radio[name=trafficUnits]:checked").val();
        chart.update(
          {
            series: addSeriesParams(
              !tm
                ? createSeries(trafficData, defaultPoint)
                : createSeries(trafficData, defaultPoint, metaData.points),
              unitsHolder
            ),
            yAxis: [
              {
                title: { text: unitsHolder.current },
              },
            ],
            tooltip: {
              formatter: function () {
                return tooltipText(this, unitsHolder.current);
              },
            },
          },
          true,
          false,
          false
        );
        if (hasImports) {
          hasImportsRedraw(chart, defaultPoint, metaData, unitsHolder.current);
          chart.redraw(false);
        }
      });

      // update map zoom
      $("#key-point-zoom-btn button").on("click", function () {
        $(".btn-map > .btn").removeClass("active");
        var inOutBtn = $(this);
        inOutBtn.addClass("active");
        var zoomResponse = inOutBtn.val();
        if (zoomResponse == "zoom-in") {
          pointMap.reZoom(true);
        } else {
          pointMap.reZoom(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  function buildDecision(trafficData) {
    if (trafficData && Object.keys(trafficData).length === 0) {
      document.getElementById("traffic-section").style.display = "none";
    } else {
      return buildDashboard();
    }
  }

  return buildDecision(trafficData);
}