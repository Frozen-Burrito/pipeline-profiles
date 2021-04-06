import canadaMap from "../../../conditions/base_maps/base_map.json";
import conditionsData from "../../../conditions/company_data/en/EnbridgeBakkenPipelineCompanyInc.json";
import incidentData from "../../../incidents/company_data/en/EnbridgeBakkenPipelineCompanyInc.json";
import trafficData from "../../../traffic/company_data/EnbridgeBakkenPipelineCompanyInc.json";
import { loadAllCharts } from "../../loadDashboards_en.js";

const data = {
  canadaMap: canadaMap,
  conditionsData: conditionsData,
  incidentData: incidentData,
  trafficData: trafficData,
};

loadAllCharts(data);
