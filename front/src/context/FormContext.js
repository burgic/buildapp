import React, { createContext, useState } from 'react';

export const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalDetails: {},
    employmentDetails: {},
    incomes: [],
    expenses: [],
    // other sections...
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;