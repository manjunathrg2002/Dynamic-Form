import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { mockApiResponse, Field } from "../data/mockApi.ts";
import ProgressBar from "./ProgressBar.tsx";
import FormDataTable from "./FormDataTable.tsx";

type FormData = Record<string, any>;

const DynamicForm: React.FC = () => {
  const [formType, setFormType] = useState<keyof typeof mockApiResponse>("User Information");
  const [formData, setFormData] = useState<Record<string, FormData[]>>({
    "User Information": [],
    "Address Information": [],
    "Payment Information": [],
  });

  const { control, handleSubmit, watch, setValue, reset, formState: { errors }, register } = useForm<FormData>();
  const fields: Field[] = mockApiResponse[formType]?.fields || [];

  const onSubmit = (data: FormData): void => {
    setFormData((prevData) => ({
      ...prevData,
      [formType]: [...prevData[formType], data],
    }));

    alert("Form submitted successfully!"); // Show success alert after submission
    reset(); // Reset the form fields after submission
  };

  const progress = (): number => {
    const completed = fields.filter((field) => watch(field.name)).length;
    return (completed / fields.length) * 100;
  };

  const handleEdit = (index: number): void => {
    const selectedData = formData[formType][index];
    Object.keys(selectedData).forEach((key) => setValue(key, selectedData[key]));
    setFormData((prevData) => ({
      ...prevData,
      [formType]: prevData[formType].filter((_, i) => i !== index),
    }));
  };

  const handleDelete = (index: number): void => {
    setFormData((prevData) => ({
      ...prevData,
      [formType]: prevData[formType].filter((_, i) => i !== index),
    }));
    alert("Entry deleted successfully."); // Show success alert after deletion
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProgressBar progress={progress()} />
        <select value={formType} onChange={(e) => setFormType(e.target.value as keyof typeof mockApiResponse)}>
          {Object.keys(mockApiResponse).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            {field.type === "dropdown" ? (
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                render={({ field: dropdownField }) => (
                  <select {...dropdownField}>
                    <option value="">Select</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              />
            ) : (
              <input type={field.type} {...register(field.name, { required: field.required })} />
            )}
            {errors[field.name] && <p className="error">This field is required.</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <FormDataTable data={formData[formType]} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DynamicForm;
