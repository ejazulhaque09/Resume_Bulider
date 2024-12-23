import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TemplateSelection = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch templates from backend
    fetch("http://127.0.0.1:5000/api/templates")
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);   

  const handleSelect = (template) => {
    setSelectedTemplate(template);
    console.log(selectedTemplate)
    navigate("/edit", { state: { selectedTemplate: template } }); // Pass template as state
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Select a CV Template
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-shadow duration-300"
            onClick={() => handleSelect(template)}
          >
            <img
              src={template.preview}
              alt={template.name}
              className="rounded-t-lg object-cover h-48 w-full"
            />
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-700 text-center">
                {template.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
