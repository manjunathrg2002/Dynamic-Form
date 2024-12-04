import React, { useState } from "react";
import DynamicForm from "./components/DynamicForm.tsx";
import FormDataTable from "./components/FormDataTable.tsx";
import './App.css';

import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";

type SubmittedData = Record<string, any>;

const App: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<SubmittedData[]>([]);

  const handleEdit = (index: number): void => {
    // Logic to handle editing of submitted data
  };

  const handleDelete = (index: number): void => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  return (
    <div className="hello">
      <Header />
      <div>
        <DynamicForm onSubmit={(data: SubmittedData) => setSubmittedData([...submittedData, data])} />
        <FormDataTable data={submittedData} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
