import React, { useState } from "react";

const ModalContent = ({ title, fields, handleSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target; // Sửa lỗi cú pháp
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>{title}</h2>
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
        />
      ))}
      <button onClick={() => handleSubmit(formData)}>Gửi dữ liệu</button> {/* Truyền dữ liệu */}
    </div>
  );
};

export default ModalContent;
