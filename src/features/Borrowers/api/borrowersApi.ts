import {
  Borrower,
  IndividualBorrowerRaw,
  LegalEntityBorrowerRaw,
  mapIndividualBorrower,
  mapLegalEntityBorrower,
} from "../model/types/types";
import { $api } from "../../../shared/api/axiosInstance";
import axios from "axios";

const INDIVIDUAL_API_URL = `/api/individual_borrowers/`;
const LEGAL_ENTITY_API_URL = `/api/legal_entity_borrowers/`;

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const fetchBorrowersArray = async (): Promise<Borrower[]> => {
  try {
    const [individualResponse, legalEntityResponse] = await Promise.all([
      $api
        .get<ApiResponse<IndividualBorrowerRaw>>(INDIVIDUAL_API_URL)
        .catch((error) => {
          console.error("Error fetching individual borrowers:", error);
          return {
            data: { count: 0, next: null, previous: null, results: [] },
          };
        }),
      $api
        .get<ApiResponse<LegalEntityBorrowerRaw>>(LEGAL_ENTITY_API_URL)
        .catch((error) => {
          console.error("Error fetching legal entity borrowers:", error);
          return {
            data: { count: 0, next: null, previous: null, results: [] },
          };
        }),
    ]);

    const individualRawBorrowers = individualResponse.data.results;
    const legalEntityRawBorrowers = legalEntityResponse.data.results;

    console.log("Individual raw borrowers:", individualRawBorrowers);
    console.log("Legal entity raw borrowers:", legalEntityRawBorrowers);

    const individualBorrowers = individualRawBorrowers.map(
      mapIndividualBorrower
    );
    const legalEntityBorrowers = legalEntityRawBorrowers.map(
      mapLegalEntityBorrower
    );

    console.log("Mapped individual borrowers:", individualBorrowers);
    console.log("Mapped legal entity borrowers:", legalEntityBorrowers);

    const combinedBorrowers = [...individualBorrowers, ...legalEntityBorrowers];

    console.log("Combined borrowers:", combinedBorrowers);

    // Remove duplicates by id and type
    const uniqueBorrowersById = Array.from(
      new Map(
        combinedBorrowers.map((item) => [`${item.id}-${item.type}`, item])
      ).values()
    );

    console.log("Unique borrowers by id:", uniqueBorrowersById);

    // Remove duplicates by name and inn
    const uniqueBorrowers = Array.from(
      new Map(
        uniqueBorrowersById.map((borrower) => {
          const key = `${borrower.name}|${borrower.inn}`;
          return [key, borrower];
        })
      ).values()
    );

    console.log("Unique borrowers:", uniqueBorrowers);

    return uniqueBorrowers;
  } catch (error) {
    console.error("Ошибка при получении заемщиков:", error);
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || "Не удалось загрузить заемщиков"
        : "Неизвестная ошибка"
    );
  }
};
