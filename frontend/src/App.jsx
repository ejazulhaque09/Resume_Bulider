import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TemplateSelection from "./components/TemplateSelection";
import TemplateEditor from "./components/TemplateEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/edit" element={<TemplateEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
