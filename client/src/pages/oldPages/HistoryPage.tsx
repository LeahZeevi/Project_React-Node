// import React from 'react';
// import Item from '../interfaces/Items';

// interface HistoryPageProps {
//   wearHistory: { date: string; items: number[] }[];
//   myWardrobe: Item[];
// }

// const HistoryPage: React.FC<HistoryPageProps> = ({ wearHistory, myWardrobe }) => {
//   return (
//     <div className="page-content">
//       <h2>היסטוריית לבוש</h2>
//       {wearHistory.map((entry, index) => (
//         <div key={index} className="history-card">
//           <h3>{entry.date}</h3>
//           <div className="history-items">
//             {entry.items.map(itemId => {
//               const item = myWardrobe.find(i => String(i._id) === String(itemId));
//               return item ? (
//                 <span key={itemId} className="history-chip">{item.itemName}</span>
//               ) : null;
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HistoryPage;