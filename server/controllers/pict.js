// const pythonApiUrl = 'http://localhost:5000/predict';
// const imagePath = req.file.path;

// try {
//     const formData = new FormData();
//     formData.append('image', fs.createReadStream(imagePath), req.file.originalname);

//     const response = await axios.post(pythonApiUrl, formData, {
//         headers: {
//             ...formData.getHeaders(),
//         },
//     });

//     // מחיקת הקובץ הזמני לאחר השליחה
//     fs.unlinkSync(imagePath);

//     res.json(response.data); // החזרת התגובה משירות ה-Python ל-Frontend
// } catch (error) {
//     console.error('Error communicating with Python API:', error.response ? error.response.data : error.message);
//     res.status(500).send('Error classifying image.');
