//       import React, { useState } from 'react';




// const MySets: React.FC = () => {
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]; // קבל את הקובץ הראשון שנבחר

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // כשקריאת הקובץ מסתיימת, שמור את ה-Data URL בסטייט
//         setCapturedImage(reader.result as string);
//         console.log("תמונה צולמה:", reader.result);
//       };
//       reader.readAsDataURL(file); // קרא את הקובץ כ-Data URL
//     }
//   };

//   return (
//     <div>
//       {/*
//         האטריבוט 'capture="user"' אומר לדפדפן לפתוח את מצלמת הסלפי (קדמית)
//         אפשר גם 'capture="environment"' למצלמה הראשית (אחורית)
//       */}
//       <input
//         type="file"
//         accept="image/*" // קבל רק קבצי תמונה
//         capture="user" // פתח את המצלמה
//         onChange={handleFileChange}
//         style={{ display: 'none' }} // הסתר את ה-input הסטנדרטי
//         id="camera-input" // תן לו ID כדי שנוכל ללחוץ עליו עם label
//       />
//       <label htmlFor="camera-input" style={{ padding: '10px 20px', border: '1px solid blue', cursor: 'pointer' }}>
//         פתח מצלמה וצלם
//       </label>

//       {capturedImage && (
//         <div>
//           <h2>תמונה שצולמה:</h2>
//           <img
//             src={capturedImage}
//             alt="Captured"
//             style={{ maxWidth: '100%', height: 'auto', border: '1px solid green', marginTop: '10px' }}
//           />
//           <a href={capturedImage} download="my_camera_image.png" style={{ display: 'block', marginTop: '10px' }}>
//             הורד תמונה
//           </a>
//         </div>
//       )}
  
//     </div>
//   )
// }

// export default MySets

  import React, { useRef, useState } from 'react';

const MySets: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("לא ניתן לגשת למצלמה:", err);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      setCapturedImage(dataURL);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    videoRef.current!.srcObject = null;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {!capturedImage && (
        <>
          <video ref={videoRef} style={{ width: '100%', maxWidth: 400, borderRadius: 8 }} autoPlay muted />
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          <div style={{ marginTop: 20 }}>
            <button
              onClick={capturePhoto}
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                backgroundColor: '#ff3b3b',
                border: '4px solid white',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
              }}
            />
            <div style={{ marginTop: 10 }}>
              <button onClick={startCamera}>📷 הפעל מצלמה</button>
              <button onClick={stopCamera} style={{ marginRight: 10 }}>🛑 עצור</button>
            </div>
          </div>
        </>
      )}

      {capturedImage && (
        <div>
          <h3>תמונה שצולמה:</h3>
          <img src={capturedImage} alt="תמונה" style={{ maxWidth: '100%', border: '1px solid gray' }} />
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setCapturedImage(null)}>↩️ צלם שוב</button>
            <a href={capturedImage} download="captured.png" style={{ marginRight: 10 }}>
              📥 הורד
            </a>
          </div>
        </div>
      )}
    </div>
  );
};



export default MySets;
