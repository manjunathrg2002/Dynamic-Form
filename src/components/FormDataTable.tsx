import React from "react";

interface FormDataTableProps {
  data: Record<string, any>[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const FormDataTable: React.FC<FormDataTableProps> = ({ data, onEdit, onDelete }) => {
  if (!data.length) return <p></p>;

  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((key) => (
              <td key={key}>{row[key]}</td>
            ))}
            <td>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormDataTable;
