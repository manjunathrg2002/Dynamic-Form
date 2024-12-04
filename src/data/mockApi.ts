export interface Field {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

export interface MockApiResponse {
  [key: string]: {
    fields: Field[];
  };
}

export const mockApiResponse: MockApiResponse = {
  "User Information": {
    fields: [
      { name: "FirstName", type: "text", label: "First Name", required: true },
      { name: "LastName", type: "text", label: "Last Name", required: true },
      { name: "Age", type: "number", label: "Age", required: false },
    ],
  },
  "Address Information": {
    fields: [
      { name: "Street", type: "text", label: "Street", required: true },
      { name: "City", type: "text", label: "City", required: true },
      {
        name: "State",
        type: "dropdown",
        label: "State",
        options: ["Andhra Pradesh", "Karnataka", "Telangana"],
        required: true,
      },
      { name: "ZipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  "Payment Information": {
    fields: [
      { name: "CardNumber", type: "text", label: "Card Number", required: true },
      { name: "ExpiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "Cvv", type: "password", label: "CVV", required: true },
      { name: "CardholderName", type: "text", label: "Cardholder Name", required: true },
    ],
  },
};
