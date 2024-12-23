import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const TemplateEditor = () => {
  const navigate = useNavigate();
  const { state } = useLocation();  // Get state from location
  const { selectedTemplate } = state;  // Destructure the template object from state
  console.log(selectedTemplate);

  // Initialize formData manually based on the template's fields
  const initialFormData = {
    Name: "",
    Email: "",
    LinkedIn: "",
    "Company Name": "",
    Position: "",
    "Years Worked": "",
    "Project Name": "",
    Description: "",
    Duration: "",
    "Skill Name": "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    const doc = new jsPDF();
  
    // Title / Header Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(formData.Name || "Your Name", 20, 30);
    doc.line(20, 35, 200, 35); 
  
    // Personal Information Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Personal Information", 20, 50);
    doc.setFontSize(12);
    doc.text(`Email: ${formData.Email || "Your Email"}`, 20, 60);
    doc.text(`Phone: ${formData.Phone || "Your Phone"}`, 20, 70);
    doc.text(`LinkedIn: ${formData.LinkedIn || "Your LinkedIn"}`, 20, 80);
    doc.line(20, 85, 200, 85); // Horizontal line after personal info
  
    // Work Experience Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Work Experience", 20, 100);
    doc.setFontSize(12);
    doc.text(`Company: ${formData["Company Name"] || "Your Company"}`, 20, 110);
    doc.text(`Position: ${formData.Position || "Your Position"}`, 20, 120);
    doc.text(`Years Worked: ${formData["Years Worked"] || "Your Years Worked"}`, 20, 130);
    doc.line(20, 135, 200, 135); // Horizontal line after work experience
  
    // Projects Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Projects", 20, 150);
    doc.setFontSize(12);
    doc.text(`Project Name: ${formData["Project Name"] || "Your Project"}`, 20, 160);
    doc.text(`Description: ${formData.Description || "Project Description"}`, 20, 170);
    doc.text(`Duration: ${formData.Duration || "Project Duration"}`, 20, 180);
    doc.line(20, 185, 200, 185); // Horizontal line after projects
  
    // Skill Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Skill", 20, 200);
    doc.setFontSize(12);
    doc.text(`Skill: ${formData["Skill Name"] || "Your Skill"}`, 20, 210);
    doc.line(20, 215, 200, 215); // Horizontal line after hobbies
  
    // Save the PDF with the name provided by the user
    doc.save(`${formData.Name || "CV"}_CV.pdf`);
  };
  

  const handleNavigate = () => {
    navigate("/");  // Navigate back to Template Selection page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Edit CV - Template: {selectedTemplate.name || "Default Template"}
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {selectedTemplate.layout.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">{section.name}</h3>
              {section.fields.map((field, fieldIndex) => (
                <label key={fieldIndex} className="block">
                  <span className="text-gray-700">{field}</span>
                  <input
                    name={field}
                    type="text"
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>    
              ))}
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div id="preview" className="bg-gray-50 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">{formData.Name || "Your Name"}</h2>
          <table className="min-w-full table-auto">
            {/* <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Field</th>
                <th className="border px-4 py-2 text-left">Value</th>
              </tr>
            </thead> */}
            <tbody>
              {selectedTemplate.layout.sections.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  <tr>
                    <td colSpan="2" className="border-b text-lg font-semibold py-2">
                      {section.name}
                    </td>
                  </tr>
                  {section.fields.map((field, fieldIndex) => (
                    <tr key={fieldIndex}>
                      <td className="border px-4 py-2">{field}</td>
                      <td className="border px-4 py-2">
                        {formData[field] || `Add your ${field.toLowerCase()}`}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white mx-6 px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Export as PDF
          </button>
          <button
            onClick={handleNavigate}
            className="bg-red-500 text-white mx-6 px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
