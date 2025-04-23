import axios from "axios";
import {
  Borrower,
  mapIndividualBorrower,
  mapLegalEntityBorrower,
} from "../model/types/types";

const INDIVIDUAL_API_URL = "http://127.0.0.1:8000/api/individual_borrowers/";
const LEGAL_ENTITY_API_URL =
  "http://127.0.0.1:8000/api/legal_entity_borrowers/";

export const fetchBorrowersArray = async (): Promise<Borrower[]> => {
  try {
    let individualBorrowers: Borrower[] = [];
    try {
      const individualResponse = await axios.get(INDIVIDUAL_API_URL);
      const responseData = individualResponse.data;

      console.log("Individual Borrowers Response:", responseData);
      console.log("Is results an array?", Array.isArray(responseData?.results));

      if (
        responseData &&
        typeof responseData === "object" &&
        Array.isArray(responseData.results)
      ) {
        individualBorrowers = responseData.results.map(mapIndividualBorrower);
      } else {
        console.error(
          "Individual Borrowers: Ожидался массив в results, получено:",
          responseData
        );
      }
    } catch (error) {
      console.error("Ошибка при запросе к /api/individual_borrowers/:", error);
    }

    let legalEntityBorrowers: Borrower[] = [];
    try {
      const legalEntityResponse = await axios.get(LEGAL_ENTITY_API_URL);
      const responseData = legalEntityResponse.data;

      console.log("Legal Entity Borrowers Response:", responseData);
      console.log("Is results an array?", Array.isArray(responseData?.results));

      if (
        responseData &&
        typeof responseData === "object" &&
        Array.isArray(responseData.results)
      ) {
        legalEntityBorrowers = responseData.results.map(mapLegalEntityBorrower);
      } else {
        console.error(
          "Legal Entity Borrowers: Ожидался массив в results, получено:",
          responseData
        );
      }
    } catch (error) {
      console.error(
        "Ошибка при запросе к /api/legal_entity_borrowers/:",
        error
      );
    }

    const allBorrowers = [...individualBorrowers, ...legalEntityBorrowers];

    const uniqueBorrowers = Array.from(
      new Map(allBorrowers.map((borrower) => [borrower.id, borrower])).values()
    );

    return uniqueBorrowers;
  } catch (error) {
    console.error("Общая ошибка при получении заёмщиков:", error);
    return [];
  }
};
