import { useState, ChangeEvent } from "react";
import axios from "axios";

const TryPython = () => {
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post<{ label: string }>(
        "http://localhost:5000/uploadsPic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLabel(res.data.label);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">זיהוי פריט לבוש</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        שלח
      </button>
      {label && <p className="mt-4">זוהה כ: {label}</p>}
    </div>
  );
};

export default TryPython;
