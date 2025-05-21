// // import  { useState } from 'react';
// // //  import TextField from '@mui/material/TextField';

// // interface Product {
// //   name: string;
// //   imgSrc: string;
// //   price: string;
// // }

// // const productsData: Record<string, Product[]> = {
// //   חולצות: [
// //     { name: 'חולצה 1', imgSrc: '🧥', price: '100 ש"ח' },
// //     { name: 'חולzzzצה 2', imgSrc: '/images/tshirt2.jpg', price: '120 ש"ח' },
// //     { name: 'חולצה 3', imgSrc: '/images/tshirt3.jpg', price: '110 ש"ח' },
// //   ],
// //   חצאיות: [
// //     { name: 'חצאית 1', imgSrc: '/images/skirt1.jpg', price: '80 ש"ח' },
// //     { name: 'חצאית 2', imgSrc: '/images/skirt2.jpg', price: '90 ש"ח' },
// //   ],
// //   נעלים: [
// //     { name: 'נעל 1', imgSrc: '/images/shoes1.jpg', price: '150 ש"ח' },
// //     { name: 'נעל 2', imgSrc: '/images/shoes2.jpg', price: '170 ש"ח' },
// //   ],
// //   שמלות: [
// //     { name: 'שמלה 1', imgSrc: '/images/dress1.jpg', price: '200 ש"ח' },
// //     { name: 'שמלה 2', imgSrc: '/images/dress2.jpg', price: '220 ש"ח' },
// //   ],
// // };

// // const AddItem_Alert= ({ setIsAlertOpen, isAlertOpen }: { setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>, isAlertOpen: boolean }) =>  {
// //   const [currentCategory, setCurrentCategory] = useState<string>('חולצות');
// //   const [currentIndex, setCurrentIndex] = useState<number>(0);
// //   // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

// //   // פונקציה להציג את המוצרים של הקטגוריה הנוכחיתy
// //   const displayProducts = () => {
// //     const categoryProducts = productsData[currentCategory];
// //     const product = categoryProducts[currentIndex];

// //     return (
// //       <div className="product">
// //         <img src={product.imgSrc} alt={product.name} />
// //         <p>{product.name}</p>
// //         <p>{product.price}</p>
// //         <button onClick={() => handleAddToCart(product)}>הוסף לסל</button>
// //       </div>
// //     );
// //   };

// //   const handleAddToCart = (product: Product) => {
// //     console.log(`${product.name} הוספה לסל`);  // הדפסת מידע בלוג
// //     alert(`${product.name} הוספה לסל`);
// //   };

// //   // פונקציה לניווט בין קטגוריות
// //   const navigateCategory = (direction: 'next' | 'prev') => {
// //     const categories = Object.keys(productsData);
// //     const currentCategoryIndex = categories.indexOf(currentCategory);

// //     if (direction === 'next' && currentCategory !== 'פיז\'מות') {
// //       const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
// //       setCurrentCategory(categories[nextCategoryIndex]);
// //       setCurrentIndex(0); // התחל את המוצר הראשון
// //     } else if (direction === 'prev' && currentCategory !== 'חולצות') {
// //       const prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
// //       setCurrentCategory(categories[prevCategoryIndex]);
// //       setCurrentIndex(0); // התחל את המוצר הראשון
// //     }
// //   };

// //   return (
// //     <div className="App">
// //       <button className="open-modal-btn" onClick={() => setIsAlertOpen(true)}>
// //         הצג את הקטלוג
// //       </button>

// //       {isAlertOpen && (
// //         <div className={`modal ${isAlertOpen ? 'open' : ''}`}>
// //           <div className="modal-content">
// //             <span className="close" onClick={() => setIsAlertOpen(false)}>
// //               ×
// //             </span>
      
// //             <div className="products-container">
// //               <h2>{currentCategory}</h2>
// //               {displayProducts()}
// //             </div>

// //             <div className="nav-buttons">
// //               <button
// //                 className={currentCategory === 'חולצות' ? 'disabled' : ''}
// //                 onClick={() => navigateCategory('prev')}
// //                 disabled={currentCategory === 'חולצות'}
// //               >
// //                 ←
// //               </button>
// //               <button
// //                 className={currentCategory === 'פיז\'מות' ? 'disabled' : ''}
// //                 onClick={() => navigateCategory('next')}
// //                 disabled={currentCategory === 'פיז\'מות'}
// //               >
// //                 →
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// import { useState } from 'react';

// interface Product {
//   name: string;
//   imgSrc: string;
 
// }

// const productsData: Record<string, Product[]> = {
//   חולצות: [
//     { name: 'חולצה 1', imgSrc: '👕' },
//     { name: 'חולצה 2', imgSrc: '👕'},
//     { name: 'חולצה 3', imgSrc: '👕' },
//   ],
//   חצאיות: [
//     { name: 'חצאית 1', imgSrc: '👕', },
//     { name: 'חצאית 2', imgSrc: '👖' },
//   ],
//   נעלים: [
//     { name: 'נעל 1', imgSrc: '👖' },
//     { name: 'נעל 2', imgSrc: '👖' },
//   ],
//   שמלות: [
//     { name: 'שמלה 1', imgSrc: '👗' },
//     { name: 'שמלה 2', imgSrc: '👗' },
//   ],
// };

// const AddItem_Alert = ({
//   setIsAlertOpen,
//   isAlertOpen,
// }: {
//   setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   isAlertOpen: boolean;
// }) => {
//   const [currentCategory, setCurrentCategory] = useState<string>('חולצות');

//   const handleAddToCart = (product: Product) => {
//     alert(`${product.name} נבחר!`);
//   };

//   const navigateCategory = (direction: 'next' | 'prev') => {
//     const categories = Object.keys(productsData);
//     const currentIndex = categories.indexOf(currentCategory);

//     if (direction === 'next') {
//       const nextIndex = (currentIndex + 1) % categories.length;
//       setCurrentCategory(categories[nextIndex]);
//     } else {
//       const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
//       setCurrentCategory(categories[prevIndex]);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .modal-backdrop {
//           position: fixed;
//           inset: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
//         .modal-content {
//           background: white;
//           border-radius: 20px;
//           padding: 20px;
//           max-width: 800px;
//           width: 90%;
//           max-height: 80vh;
//           overflow-y: auto;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.15);
//           position: relative;
//           font-family: Arial, sans-serif;
//         }
//         .close-btn {
//           position: absolute;
//           top: 10px;
//           left: 10px;
//           font-size: 28px;
//           cursor: pointer;
//           user-select: none;
//         }
//         .products-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//           gap: 15px;
//           margin-top: 15px;
//         }
//         .product-card {
//           border: 1px solid #ddd;
//           border-radius: 12px;
//           padding: 12px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           transition: box-shadow 0.3s ease;
//           background: #fafafa;
//         }
//         .product-card:hover {
//           box-shadow: 0 6px 16px rgba(0,0,0,0.15);
//         }
//         .product-image {
//           width: 100%;
//           height: 120px;
//           background-color: #f0f0f0;
//           border-radius: 10px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-size: 48px;
//           margin-bottom: 8px;
//           overflow: hidden;
//         }
//         .product-image img {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//         }
//         .product-name {
//           font-weight: 600;
//           margin-bottom: 4px;
//           text-align: center;
//           color: #333;
//         }
//         .product-price {
//           font-size: 14px;
//           color: #666;
//           margin-bottom: 8px;
//         }
//         .select-button {
//           background-color: #3b82f6;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           padding: 8px 12px;
//           width: 100%;
//           cursor: pointer;
//           transition: background-color 0.3s ease;
//           font-weight: 600;
//         }
//         .select-button:hover {
//           background-color: #2563eb;
//         }
//         .nav-buttons {
//           margin-top: 20px;
//           display: flex;
//           justify-content: space-between;
//         }
//         .nav-button {
//           background: #ddd;
//           border-radius: 12px;
//           border: none;
//           padding: 10px 20px;
//           cursor: pointer;
//           font-weight: 600;
//           transition: background-color 0.3s ease;
//         }
//         .nav-button:hover {
//           background: #bbb;
//         }
//       `}</style>

//       <div>
//         <button
//           className="open-modal-btn"
//           onClick={() => setIsAlertOpen(true)}
//           style={{ padding: '10px 20px', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
//         >
//           הצג את הקטלוג
//         </button>

//         {isAlertOpen && (
//           <div className="modal-backdrop">
//             <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
//               <span className="close-btn" onClick={() => setIsAlertOpen(false)}>
//                 &times;
//               </span>

//               <h2 id="modalTitle" style={{ textAlign: 'center', fontSize: '2rem', color: '#444' }}>
//                 {currentCategory}
//               </h2>

//               <div className="products-grid">
//                 {productsData[currentCategory].map((product, index) => (
//                   <div key={index} className="product-card">
//                     <div className="product-image">
//                       {product.imgSrc.endsWith('.jpg') ? (
//                         <img src={product.imgSrc} alt={product.name} />
//                       ) : (
//                         <span>{product.imgSrc}</span>
//                       )}
//                     </div>
//                     <div className="product-name">{product.name}</div>
//                     <button
//                       className="select-button"
//                       onClick={() => handleAddToCart(product)}
//                       aria-label={`בחר את ${product.name}`}
//                     >
//                       בחר
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="nav-buttons">
//                 <button className="nav-button" onClick={() => navigateCategory('prev')}>
//                   ← הקודם
//                 </button>
//                 <button className="nav-button" onClick={() => navigateCategory('next')}>
//                   הבא →
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AddItem_Alert;
// import React, { useState } from 'react';
// import '../css/AlertAddItem.css'; // ייבוא של קובץ CSS לעיצוב

// interface Product {
//   name: string;
//   imgSrc: string;
// }

// const productsData: Record<string, Product[]> = {
//   חולצות: [
//     { name: 'חולצה 1', imgSrc: '👕' },
//     { name: 'חולצה 2', imgSrc: '👕'},
//     { name: 'חולצה 3', imgSrc: '👕' },
//   ],
//   חצאיות: [
//     { name: 'חצאית 1', imgSrc: '👕', },
//     { name: 'חצאית 2', imgSrc: '👖' },
//   ],
//   נעלים: [
//     { name: 'נעל 1', imgSrc: '👖' },
//     { name: 'נעל 2', imgSrc: '👖' },
//   ],
//   שמלות: [
//     { name: 'שמלה 1', imgSrc: '👗' },
//     { name: 'שמלה 2', imgSrc: '👗' },
//   ],
// };

// const AddItem_Alert = ({ setIsAlertOpen, isAlertOpen }: { setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>, isAlertOpen: boolean }) => {
//   const [currentCategory, setCurrentCategory] = useState<string>('חולצות');

//   const handleAddToCart = (product: Product) => {
//     console.log(`${product.name} הוספה לסל`);
//     alert(`${product.name} הוספה לסל`);
//   };

//   const navigateCategory = (direction: 'next' | 'prev') => {
//     const categories = Object.keys(productsData);
//     const currentCategoryIndex = categories.indexOf(currentCategory);

//     let newCategoryIndex = currentCategoryIndex;
//     if (direction === 'next') {
//       newCategoryIndex = (currentCategoryIndex + 1) % categories.length;
//     } else if (direction === 'prev') {
//       newCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
//     }
//     setCurrentCategory(categories[newCategoryIndex]);
//   };

//   return (
//     <div className="app">
//       <button className="open-modal-btn" onClick={() => setIsAlertOpen(true)}>
//         הצג את הקטלוג
//       </button>

//       {isAlertOpen && (
//         <div className={`modal ${isAlertOpen ? 'open' : ''}`}>
//           <div className="modal-content">
//             <span className="close" onClick={() => setIsAlertOpen(false)}>
//               ×
//             </span>

//             <div className="category-navigation">
//               <button
//                 className={`nav-button ${currentCategory === 'חולצות' ? 'disabled' : ''}`}
//                 onClick={() => navigateCategory('prev')}
//                 disabled={currentCategory === 'חולצות'}
//               >
//                 ← הקודם
//               </button>
//               <h2>{currentCategory}</h2>
//               <button
//                 className={`nav-button ${currentCategory === Object.keys(productsData).pop() ? 'disabled' : ''}`}
//                 onClick={() => navigateCategory('next')}
//                 disabled={currentCategory === Object.keys(productsData).pop()}
//               >
//                 הבא →
//               </button>
//             </div>

//             <div className="products-grid">
//               {productsData[currentCategory].map((product, index) => (
//                 <div key={index} className="product-item">
//                   <img src={product.imgSrc} alt={product.name} />
//                   <h3>{product.name}</h3>
//                   <button onClick={() => handleAddToCart(product)}>הוסף לסל</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddItem_Alert;



import React, { useState } from 'react';
import '../css/AlertAddItem.css'; // ייבוא של קובץ CSS לעיצוב

interface Product {
  name: string;
  imgSrc: string;
}

const productsData: Record<string, Product[]> = {
  חולצות: [
    { name: 'חולצה 1', imgSrc: '👕' },
    { name: 'חולצה 2', imgSrc: '👕'},
    { name: 'חולצה 3', imgSrc: '👕' },
  ],
  חצאיות: [
    { name: 'חצאית 1', imgSrc: '👕', },
    { name: 'חצאית 2', imgSrc: '👖' },
  ],
  נעלים: [
    { name: 'נעל 1', imgSrc: '👖' },
    { name: 'נעל 2', imgSrc: '👖' },
  ],
  שמלות: [
    { name: 'שמלה 1', imgSrc: '👗' },
    { name: 'שמלה 2', imgSrc: '👗' },
  ],
};
const AddItem_Alert = ({ setIsAlertOpen, isAlertOpen }: { setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>, isAlertOpen: boolean }) => {
  const [currentCategory, setCurrentCategory] = useState<string>('חולצות');

  const handleAddToCart = (product: Product) => {
    console.log(`${product.name} הוספה לסל`);
    alert(`${product.name} הוספה לסל`);
  };

  const navigateCategory = (direction: 'next' | 'prev') => {
    const categories = Object.keys(productsData);
    const currentCategoryIndex = categories.indexOf(currentCategory);

    let newCategoryIndex = currentCategoryIndex;
    if (direction === 'next') {
      newCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    } else if (direction === 'prev') {
      newCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
    }
    setCurrentCategory(categories[newCategoryIndex]);
  };

  return (
    <div className="app">
      <button className="open-modal-btn" onClick={() => setIsAlertOpen(true)}>
        הצג את הקטלוג
      </button>

      {isAlertOpen && (
        <div className={`modal ${isAlertOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsAlertOpen(false)}>
              ×
            </span>

            <div className="category-navigation">
             <button
                className={`nav-button ${currentCategory === Object.keys(productsData).pop() ? 'disabled' : ''}`}
                onClick={() => navigateCategory('next')}
                disabled={currentCategory === Object.keys(productsData).pop()}
              >
                הבא
              </button>
              <h2>{currentCategory}</h2>
            
                 <button
                className={`nav-button ${currentCategory === 'חולצות' ? 'disabled' : ''}`}
                onClick={() => navigateCategory('prev')}
                disabled={currentCategory === 'חולצות'}
              >
               הקודם  
              </button>
            </div>

            <div className="products-grid">
              {productsData[currentCategory].map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-image-container">
                    <img src={product.imgSrc} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>הוסף לסל</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem_Alert;

