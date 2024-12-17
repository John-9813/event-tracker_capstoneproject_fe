import React from "react";

const formatDateToItalian = (dateString) => {
    if (!dateString) return "Data non disponibile";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("it-IT", options);
  };

  export { formatDateToItalian };
