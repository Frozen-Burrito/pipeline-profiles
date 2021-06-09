import canadaMap from "../../../conditions/base_maps/base_map.json";
import conditionsData from "../../../conditions/company_data/en/SouthernLightsPipeline.json";
import incidentData from "../../../incidents/company_data/SouthernLightsPipeline.json";
import trafficData from "../../../traffic/company_data/EnbridgeSouthernLightsGPInc.json";
import apportionData from "../../../apportionment/company_data/EnbridgeSouthernLightsGPInc.json";
// import oandmData from "../../../oandm/company_data/SouthernLightsPipeline.json";
// import remediationData from "../../../remediation/company_data/SouthernLightsPipeline.json";
import { loadAllCharts } from "../../loadDashboards_en";

const data = {
  canadaMap,
  conditionsData,
  incidentData,
  trafficData,
  apportionData,
  // oandmData,
  // remediationData,
};

loadAllCharts(data);
