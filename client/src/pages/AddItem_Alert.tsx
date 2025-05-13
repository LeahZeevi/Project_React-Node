import  { useState } from 'react';
//  import TextField from '@mui/material/TextField';

interface Product {
  name: string;
  imgSrc: string;
  price: string;
}

const productsData: Record<string, Product[]> = {
  חולצות: [
    { name: 'חולצה 1', imgSrc: '/images/tshirt1.jpg', price: '100 ש"ח' },
    { name: 'חולצה 2', imgSrc: '/images/tshirt2.jpg', price: '120 ש"ח' },
    { name: 'חולצה 3', imgSrc: '/images/tshirt3.jpg', price: '110 ש"ח' },
  ],
  חצאיות: [
    { name: 'חצאית 1', imgSrc: '/images/skirt1.jpg', price: '80 ש"ח' },
    { name: 'חצאית 2', imgSrc: '/images/skirt2.jpg', price: '90 ש"ח' },
  ],
  נעלים: [
    { name: 'נעל 1', imgSrc: '/images/shoes1.jpg', price: '150 ש"ח' },
    { name: 'נעל 2', imgSrc: '/images/shoes2.jpg', price: '170 ש"ח' },
  ],
  שמלות: [
    { name: 'שמלה 1', imgSrc: '/images/dress1.jpg', price: '200 ש"ח' },
    { name: 'שמלה 2', imgSrc: '/images/dress2.jpg', price: '220 ש"ח' },
  ],
};

const AddItem_Alert= ({ setIsAlertOpen, isAlertOpen }: { setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>, isAlertOpen: boolean }) =>  {
  const [currentCategory, setCurrentCategory] = useState<string>('חולצות');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // פונקציה להציג את המוצרים של הקטגוריה הנוכחיתy
  const displayProducts = () => {
    const categoryProducts = productsData[currentCategory];
    const product = categoryProducts[currentIndex];

    return (
      <div className="product">
        <img src={product.imgSrc} alt={product.name} />
        <p>{product.name}</p>
        <p>{product.price}</p>
        <button onClick={() => handleAddToCart(product)}>הוסף לסל</button>
      </div>
    );
  };

  const handleAddToCart = (product: Product) => {
    console.log(`${product.name} הוספה לסל`);  // הדפסת מידע בלוג
    alert(`${product.name} הוספה לסל`);
  };

  // פונקציה לניווט בין קטגוריות
  const navigateCategory = (direction: 'next' | 'prev') => {
    const categories = Object.keys(productsData);
    const currentCategoryIndex = categories.indexOf(currentCategory);

    if (direction === 'next' && currentCategory !== 'פיז\'מות') {
      const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      setCurrentCategory(categories[nextCategoryIndex]);
      setCurrentIndex(0); // התחל את המוצר הראשון
    } else if (direction === 'prev' && currentCategory !== 'חולצות') {
      const prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
      setCurrentCategory(categories[prevCategoryIndex]);
      setCurrentIndex(0); // התחל את המוצר הראשון
    }
  };

  return (
    <div className="App">
      <button className="open-modal-btn" onClick={() => setIsAlertOpen(true)}>
        הצג את הקטלוג
      </button>

      {isAlertOpen && (
        <div className={`modal ${isAlertOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsAlertOpen(false)}>
              ×
            </span>
      
            <div className="products-container">
              <h2>{currentCategory}</h2>
              {displayProducts()}
            </div>

            <div className="nav-buttons">
              <button
                className={currentCategory === 'חולצות' ? 'disabled' : ''}
                onClick={() => navigateCategory('prev')}
                disabled={currentCategory === 'חולצות'}
              >
                ←
              </button>
              <button
                className={currentCategory === 'פיז\'מות' ? 'disabled' : ''}
                onClick={() => navigateCategory('next')}
                disabled={currentCategory === 'פיז\'מות'}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem_Alert;
