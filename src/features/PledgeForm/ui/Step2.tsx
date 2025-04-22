import { format, parse } from "date-fns";
import { useState, useEffect } from "react";
import { usePledgeStore } from "../model/store";
import { Button } from "../../../shared/ui";
import { PledgorCard } from ".";

export default function Step2() {
  const { data, addPledgor, updatePledgor, removePledgor } = usePledgeStore();

  const [dates, setDates] = useState<
    Record<
      number,
      {
        birthDate: Date | null;
        regDate: Date | null;
        passportIssueDate: Date | null;
      }
    >
  >({});

  useEffect(() => {
    const initialDates = data.pledgors.reduce((acc, pledgor, index) => {
      acc[index] = {
        birthDate: pledgor.birthDate
          ? parse(pledgor.birthDate, "MM/dd/yyyy", new Date())
          : null,
        regDate: pledgor.registrationDate
          ? parse(pledgor.registrationDate, "MM/dd/yyyy", new Date())
          : null,
        passportIssueDate: pledgor.passportIssueDate
          ? parse(pledgor.passportIssueDate, "MM/dd/yyyy", new Date())
          : null,
      };
      return acc;
    }, {});
    setDates(initialDates);
  }, [data.pledgors]);

  const handleDateChange = (
    date: Date | null,
    type: "birth" | "registration" | "passportIssue",
    index: number
  ) => {
    setDates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        ...(type === "birth" && { birthDate: date }),
        ...(type === "registration" && { regDate: date }),
        ...(type === "passportIssue" && { passportIssueDate: date }),
      },
    }));

    updatePledgor(index, {
      ...(type === "birth" && {
        birthDate: date ? format(date, "MM/dd/yyyy") : undefined,
      }),
      ...(type === "registration" && {
        registrationDate: date ? format(date, "MM/dd/yyyy") : undefined,
      }),
      ...(type === "passportIssue" && {
        passportIssueDate: date ? format(date, "MM/dd/yyyy") : undefined,
      }),
    });
  };

  const handleRemovePledgor = (index: number) => {
    removePledgor(index);
    setDates((prev) => {
      const newDates = { ...prev };
      delete newDates[index];

      const updatedDates: typeof newDates = {};
      Object.keys(newDates)
        .map(Number)
        .sort()
        .forEach((key, newIndex) => {
          updatedDates[newIndex] = newDates[key];
        });
      return updatedDates;
    });
  };

  return (
    <div className="px-0 py-6 space-y-6">
      {data.pledgors.map((pledgor, index) => (
        <PledgorCard
          key={index}
          index={index}
          pledgor={pledgor}
          updatePledgor={updatePledgor}
          removePledgor={handleRemovePledgor}
          canRemove={data.pledgors.length > 1}
          dates={
            dates[index] || {
              birthDate: null,
              regDate: null,
              passportIssueDate: null,
            }
          }
          handleDateChange={handleDateChange}
        />
      ))}

      <Button
        className="w-full bg-blue-600 text-white"
        onClick={() => addPledgor("individual")}
      >
        + Добавить залогодателя
      </Button>
    </div>
  );
}
