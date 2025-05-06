import { create } from "zustand";
import axios from "axios";

export type IndividualPledgor = {
  type: "individual";
  full_name: string;
  inn: string;
  birth_date: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: string;
};

export type LegalEntityPledgor = {
  type: "legal";
  id?: string;
  with_passport_photo_url?: string;
  company_name: string;
  company_inn: string;
  founding_document: string;
  registration_date: string;
  authorized_person_full_name: string;
  inn: string;
  birth_date: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: string;
  position: string;
  person_document?: string | File;
  with_passport_photo?: string | File;
};

export type Pledgor = IndividualPledgor | LegalEntityPledgor;

export type CollateralData = {
  eni_code: string; // Код ЕНИ
  city: string; // Город/Село
  street: string; // Улица
  house_number: string; // № дома
  collateral_value?: string; // Залоговая стоимость (опционально)
  collateral_coefficient?: string; // Залоговый коэффициент (опционально)
  collateral_type: number; // Предмет залога
  region: number; // Область
  district: number; // Район
};

export type PledgeStore = {
  data: {
    eniCode: string;
    inn: string;
    pledgors: Pledgor[];
    collateral: CollateralData;
  };
  pledgeExists: boolean;
  addPledgor: (type: "individual" | "legal") => void;
  updatePledgor: (index: number, value: Partial<Pledgor>) => void;
  removePledgor: (index: number) => void;
  setPledgeExists: (value: boolean) => void;
  setField: <T extends keyof PledgeStore["data"]>(
    field: T,
    value: PledgeStore["data"][T]
  ) => void;
  updateCollateral: (value: Partial<CollateralData>) => void;
  checkPledge: () => Promise<{
    exists: boolean;
    innMatch: boolean;
  }>;
  submitPledge: () => Promise<void>;
};

export const usePledgeStore = create<PledgeStore>((set, get) => ({
  data: {
    eniCode: "",
    inn: "",
    pledgors: [],
    collateral: {
      eni_code: "",
      city: "",
      street: "",
      house_number: "",
      collateral_value: "",
      collateral_coefficient: "",
      collateral_type: 0,
      region: 0,
      district: 0,
    },
  },

  pledgeExists: false,

  setPledgeExists: (value) => {
    console.log("Setting pledgeExists to:", value);
    set({ pledgeExists: value });
  },

  setField: (field, value) => {
    console.log("Setting field:", field, "to value:", value);
    set((state) => ({
      data: {
        ...state.data,
        [field]: value,
      },
    }));
  },

  updateCollateral: (value) => {
    console.log("Updating collateral with:", value);
    set((state) => ({
      data: {
        ...state.data,
        collateral: {
          ...state.data.collateral,
          ...value,
        },
      },
    }));
  },

  addPledgor: (type) => {
    console.log("Adding pledgor with type:", type);
    set((state) => {
      const newPledgor = type === "individual"
        ? {
          type,
          full_name: "",
          inn: "",
          birth_date: "",
          passport_series: "",
          passport_number: "",
          passport_issued_by: "",
          passport_issue_date: "",
        }
        : {
          type,
          id: "",
          with_passport_photo_url: "",
          company_name: "",
          company_inn: "",
          founding_document: "",
          registration_date: "",
          authorized_person_full_name: "",
          inn: "",
          birth_date: "",
          passport_series: "",
          passport_number: "",
          passport_issued_by: "",
          passport_issue_date: "",
          position: "",
          person_document: "",
          with_passport_photo: "",
        };
      const newPledgors = [...state.data.pledgors, newPledgor];
      console.log("New pledgors array:", newPledgors);
      return {
        data: {
          ...state.data,
          pledgors: newPledgors,
        },
      };
    });
    console.log("After set, current pledgors:", get().data.pledgors);
  },

  updatePledgor: (index, value) => {
    console.log("Updating pledgor at index:", index, "with value:", value);
    set((state) => {
      const pledgors = [...state.data.pledgors];
      pledgors[index] = { ...pledgors[index], ...value } as Pledgor;
      console.log("Updated pledgors array:", pledgors);
      return {
        data: {
          ...state.data,
          pledgors,
        },
      };
    });
  },

  removePledgor: (index) => {
    console.log("Removing pledgor at index:", index);
    set((state) => {
      const pledgors = [...state.data.pledgors];
      pledgors.splice(index, 1);
      console.log("After removal, pledgors:", pledgors);
      return {
        data: {
          ...state.data,
          pledgors,
        },
      };
    });
  },


  checkPledge: async () => {
    console.log("checkPledge called with eniCode:", get().data.eniCode, "inn:", get().data.inn);
    const { eniCode, inn } = get().data;
    if (!eniCode || !inn) {
      console.log("checkPledge aborted: eniCode or inn is empty");
      return { exists: false, innMatch: false };
    }

    try {
      console.log("Sending API request...");
      const response = await axios.get(
        ` http://35.224.163.23/api/api/pledgor-collateral-relations/search/?eni=${eniCode}&inn=${inn}`
      );
      const result = response.data;
      console.log("API response:", result);

      if (result.exists !== undefined && result.innMatch !== undefined) {
        set({ pledgeExists: result.exists });
        return { exists: result.exists, innMatch: result.innMatch };
      } else {
        console.warn("Некорректный ответ от API:", result);
        return { exists: false, innMatch: false };
      }
    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
      return { exists: false, innMatch: false };
    }
  },

  submitPledge: async () => {
    const { pledgors, collateral, eniCode, inn } = get().data;

    console.log("Submit data check:", {
      eniCode,
      inn,
      collateral,
      pledgorsLength: pledgors.length,
    });

    if (
      !eniCode ||
      !inn ||
      !collateral.eni_code ||
      !collateral.city ||
      !collateral.street ||
      !collateral.house_number ||
      !collateral.collateral_type ||
      !collateral.region ||
      !collateral.district ||
      pledgors.length === 0
    ) {
      console.log("Validation failed: Missing required fields");
      return;
    }

    try {
      // Обработка каждого залогодателя
      // for (const pledgor of pledgors) {
      //   const baseData = {
      //     eniCode,
      //     inn,
      //     collateral: {
      //       ...collateral,
      //       collateral_type: Number(collateral.collateral_type),
      //       region: Number(collateral.region),
      //       district: Number(collateral.district),
      //       collateral_value: collateral.collateral_value ? Number(collateral.collateral_value) : null,
      //       collateral_coefficient: collateral.collateral_coefficient
      //         ? Number(collateral.collateral_coefficient)
      //         : null,
      //     },
      //     ...pledgor,
      //   };

      //   if (pledgor.type === "individual") {
      //     console.log("Sending to individual endpoint:", JSON.stringify(baseData, null, 2));
      //     await axios.post("http://35.224.163.23/api/individual_pledgors/", baseData);
      //   } else if (pledgor.type === "legal") {
      //     console.log("Sending to legal entity endpoint with FormData:");
      //     const formData = new FormData();
      //     Object.entries(baseData).forEach(([key, value]) => {
      //       if (key === "with_passport_photo" || key === "person_document") {
      //         if (value instanceof File) {
      //           formData.append(key, value);
      //         }
      //       } else if (value !== undefined && value !== null) {
      //         formData.append(key, value.toString());
      //       }
      //     });
      //     // Выводим содержимое FormData
      //     for (const [key, value] of formData.entries()) {
      //       console.log(`FormData key: ${key}, value: ${value instanceof File ? value.name : value}`);
      //     }
      //     await axios.post("http://35.224.163.23/api/legal_entity_pledgors/", formData, {
      //       headers: { "Content-Type": "multipart/form-data" },
      //     });
      //   }
      // }

      for (const pledgor of pledgors) {
        const baseData = {
          eniCode,
          inn: pledgor.type === "legal" ? pledgor.inn : inn,
          collateral: {
            ...collateral,
            collateral_type: Number(collateral.collateral_type),
            region: Number(collateral.region),
            district: Number(collateral.district),
            collateral_value: collateral.collateral_value ? Number(collateral.collateral_value) : null,
            collateral_coefficient: collateral.collateral_coefficient
              ? Number(collateral.collateral_coefficient)
              : null,
          },
          ...(pledgor.type === "legal" ? pledgor : {}),
          ...(pledgor.type === "individual" ? pledgor : {}),
        };

        // Преобразуем person_document в строку, если это файл
        if (pledgor.type === "legal" && 'person_document' in baseData && baseData.person_document instanceof File) {
          if ('person_document' in baseData && baseData.person_document instanceof File) {
            baseData.person_document = baseData.person_document.name;
          }
        }

        if (pledgor.type === "individual") {
          console.log("Sending to individual endpoint:", JSON.stringify(baseData, null, 2));
          await axios.post("http://35.224.163.23/api/individual_pledgors/", baseData);
        } else if (pledgor.type === "legal") {

          if (
            !baseData.company_name ||
            !baseData.company_inn ||
            !baseData.authorized_person_full_name
          ) {
            console.log("Validation failed for legal entity: Missing required fields", baseData);
            continue; // Пропускаем этого залогодателя
          }
          console.log("Sending to legal entity endpoint with FormData:", baseData);

          const formData = new FormData();
          Object.entries(baseData).forEach(([key, value]) => {
            if (key === "with_passport_photo" || key === "person_document") {
              if (value instanceof File) {
                formData.append(key, value);
              }
            } else if (value !== undefined && value !== null) {
              formData.append(key, value.toString());
            }
          });
          // Выводим содержимое FormData
          for (const [key, value] of formData.entries()) {
            console.log(`FormData key: ${key}, value: ${value instanceof File ? value.name : value}`);
          }
          await axios.post("http://35.224.163.23/api/legal_entity_pledgors/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      }

      // Отправка данных о залоге в JSON
      console.log("Sending collateral data as JSON:", JSON.stringify(collateral, null, 2));
      await axios.post("http://35.224.163.23/api/collaterals/", {
        eni_code: collateral.eni_code,
        city: collateral.city,
        street: collateral.street,
        house_number: collateral.house_number,
        collateral_value: collateral.collateral_value ? Number(collateral.collateral_value) : null,
        collateral_coefficient: collateral.collateral_coefficient
          ? Number(collateral.collateral_coefficient)
          : null,
        collateral_type: Number(collateral.collateral_type),
        region: Number(collateral.region),
        district: Number(collateral.district),
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });

      console.log("Pledge submitted successfully");
    } catch (error) {
      console.error("Error submitting pledge:", error);
    }
  },
}));