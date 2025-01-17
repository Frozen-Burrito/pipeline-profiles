import { EventMap } from "../modules/dashboard/EventMap";
import { EventNavigator } from "../modules/dashboard/EventNavigator";
import { EventTrend } from "../modules/dashboard/EventTrend";
import { remediationText } from "../modules/dynamicText";
import { loadChartError } from "../modules/util";
import { noEventsFlag } from "./dashboardUtil";

export async function mainRemediation(data, lang) {
  const eventType = "remediation";
  const field = "w"; // within 30m of a water body
  const filters = { type: "frequency" };

  const setTitle = (language, meta) => {
    document.getElementById("remediation-dashboard-title").innerHTML =
      language.title(meta.systemName, meta.cutoffDate);
  };

  const remediationBar = (events, map, langPillTitles) => {
    const barNav = new EventNavigator({
      plot: map,
      numberOfPills: 4,
      langPillTitles,
      data: events,
    });
    barNav.makeBar("y", "rem-year-bar", "activated");
    barNav.makeBar("w", "rem-water-bar", "deactivated");
    barNav.makeBar("use", "rem-use-bar", "deactivated");
    barNav.makeBar("p", "rem-province-bar", "deactivated");
    barNav.divEvents();
    return barNav;
  };

  const remediationMap = (events, mapField, mapFilters, mapLang) => {
    const map = new EventMap({
      eventType,
      field: mapField,
      filters: mapFilters,
      minRadius: 14000,
      divId: "remediation-map",
      toolTipFields: ["vol", "use", "c", "ps"],
      lang: mapLang,
      regdocsClick: true,
    });
    map.addBaseMap();
    map.processEventsData(events);
    map.lookForSize();
    return map;
  };

  const remediationTimeSeries = (timeField, timeFilters) => {
    const timeSeries = new EventTrend({
      eventType,
      field: timeField,
      filters: timeFilters,
      data: data.data,
      divId: "remediation-time-series",
      legendClickText: { enabled: true, text: lang.dashboard.legendClick },
      oneToMany: { c: true },
      lang: lang.dashboard,
      // definitions: lang.definitions,
    });

    const trendNav = new EventNavigator({
      plot: timeSeries,
      numberOfPills: 4,
      langPillTitles: { titles: lang.dashboard.pillTitles.titles }, // Remove click text from pill
    });
    trendNav.makeBar("s", "rem-status-trend", "activated");
    trendNav.makeBar("a", "rem-activity-trend", "deactivated");
    trendNav.makeBar("ps", "rem-pipeline-trend", "deactivated");
    trendNav.makeBar("c", "rem-contaminant-trend", "deactivated");
    trendNav.divEvents();

    return timeSeries;
  };

  function buildDashboard() {
    if (data.data.length > 0) {
      const chartParams = data.meta;
      if (
        Object.prototype.hasOwnProperty.call(
          lang.companyToSystem,
          data.meta.companyName
        )
      ) {
        chartParams.systemName = lang.companyToSystem[data.meta.companyName];
      } else {
        chartParams.systemName = data.meta.companyName;
      }

      // add the cutoff date to the chartParams
      // const cutoffDate = new Date(2018, 9,15)
      chartParams.cutoffDate = lang.dateFormat(new Date(2018, 7, 15));
      remediationText(chartParams, lang);

      setTitle(lang, chartParams);
      const thisMap = remediationMap(data.data, field, filters, lang.dashboard);
      const bars = remediationBar(
        data.data,
        thisMap,
        lang.dashboard.pillTitles
      );

      remediationTimeSeries(field, filters);

      thisMap.switchDashboards(bars);
      thisMap.nearbySlider(
        lang.dashboard.rangeTitle,
        lang.dashboard.findBtnTitle
      );
      thisMap.nearbyListener(lang.dashboard.locationError);
      thisMap.resetCirclesListener();
    } else {
      noEventsFlag(
        lang.noEvents.header,
        lang.noEvents.note,
        data.meta.companyName,
        "remediation-dashboard"
      );
    }
  }
  try {
    return buildDashboard();
  } catch (err) {
    return loadChartError("remediation-dashboard", lang.dashboardError);
  }
}
