// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadImage=()=> {
//   const [result, setResult] = useState<string | null>(null);

//   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const res = await axios.post('http://localhost:3001/', formData);
//       setResult(res.data.predicted_class);
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <input type="file" onChange={handleChange} />
//       {result && <h3>קטגוריה מנובאת: {result}</h3>}
//     </div>
//   );
// }

// export default UploadImage;