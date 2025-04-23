import axios from "axios";
import {
  Borrower,
  IndividualBorrowerRaw,
  LegalEntityBorrowerRaw,
  mapIndividualBorrower,
  mapLegalEntityBorrower,
} from "../model/types/types";

const INDIVIDUAL_API_URL = "http://127.0.0.1:8000/api/individual_borrowers/";
const LEGAL_ENTITY_API_URL =
  "http://127.0.0.1:8000/api/legal_entity_borrowers/";

export const fetchBorrowersArray = async (): Promise<Borrower[]> => {
  try {
    const individualResponse = await axios.get<IndividualBorrowerRaw[]>(
      INDIVIDUAL_API_URL
    );
    const individualBorrowers = individualResponse.data.map(
      mapIndividualBorrower
    );

    const legalEntityResponse = await axios.get<LegalEntityBorrowerRaw[]>(
      LEGAL_ENTITY_API_URL
    );
    const legalEntityBorrowers = legalEntityResponse.data.map(
      mapLegalEntityBorrower
    );

    const allBorrowers = [...individualBorrowers, ...legalEntityBorrowers];

    const uniqueBorrowers = Array.from(
      new Map(allBorrowers.map((borrower) => [borrower.id, borrower])).values()
    );

    return uniqueBorrowers;
  } catch (error) {
    console.error("Ошибка при получении заёмщиков:", error);
    return [];
  }
};
