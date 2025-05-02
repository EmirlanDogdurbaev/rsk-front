import { $api } from "../../../shared/api/axiosInstance";
import {
  IndividualPledgorRaw,
  LegalEntityPledgorRaw,
  Pledgee,
  mapIndividualPledgor,
  mapLegalEntityPledgor,
} from "../model/types/types";

const INDIVIDUAL_PLEDGORS_URL = "/api/individual_pledgors/";
const LEGAL_ENTITY_PLEDGORS_URL = "/api/legal_entity_pledgors/";

export const fetchPledgeesArray = async (): Promise<Pledgee[]> => {
  try {
    const [individualResponse, legalEntityResponse] = await Promise.all([
      $api.get<{ results: IndividualPledgorRaw[] }>(INDIVIDUAL_PLEDGORS_URL),
      $api.get<{ results: LegalEntityPledgorRaw[] }>(LEGAL_ENTITY_PLEDGORS_URL),
    ]);

    const individualPledgees = Array.isArray(individualResponse.data.results)
      ? individualResponse.data.results.map(mapIndividualPledgor)
      : [];
    const legalEntityPledgees = Array.isArray(legalEntityResponse.data.results)
      ? legalEntityResponse.data.results.map(mapLegalEntityPledgor)
      : [];

    return [...individualPledgees, ...legalEntityPledgees];
  } catch (error) {
    console.error("Ошибка при получении залогодержателей:", error);
    return [];
  }
};
