import React from "react";

import PatientCard from "@/components/shared/patient-card";
import { patientData } from "@/data";

const PatientInfoTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {patientData.cards.map((card) => (
        <PatientCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default PatientInfoTab;
