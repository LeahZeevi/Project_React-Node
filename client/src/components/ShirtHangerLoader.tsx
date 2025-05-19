
import React from "react";
 import '../css/ShirtHangerLoader.css';


const ShirtHangerLoader: React.FC = () => {
  return (
    <div className="hanger-loader">
      <svg
        viewBox="0 0 160 160"
        className="hanger-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* קולב */}
        <path
          d="M80 15 C70 15, 70 30, 80 30 C90 30, 90 15, 80 15"
          stroke="#444"
          strokeWidth="4"
          fill="none"
        />
        <line x1="80" y1="30" x2="50" y2="55" stroke="#444" strokeWidth="4" />
        <line x1="80" y1="30" x2="110" y2="55" stroke="#444" strokeWidth="4" />

        {/* צווארון V */}
        <path
          d="M65 55 L80 70 L95 55"
          fill="#3A74D8"
        />

        {/* גוף החולצה */}
        <path
          d="
            M50 55
            Q55 45, 65 40
            L65 55
            L80 70
            L95 55
            L95 40
            Q105 45, 110 55
            L115 120
            Q90 130, 80 130
            Q70 130, 45 120
            Z
          "
          fill="#4A90E2"
          stroke="#1c3f75"
          strokeWidth="2"
        />

        {/* שרוול שמאל */}
        <path
          d="M50 55 Q35 75, 45 95 L50 90"
          fill="#4A90E2"
          stroke="#1c3f75"
          strokeWidth="2"
        />

        {/* שרוול ימין */}
        <path
          d="M110 55 Q125 75, 115 95 L110 90"
          fill="#4A90E2"
          stroke="#1c3f75"
          strokeWidth="2"
        />

        {/* קווים עיצוביים – תפרים */}
        <line x1="65" y1="55" x2="65" y2="120" stroke="#3f6ccf" strokeWidth="1" />
        <line x1="95" y1="55" x2="95" y2="120" stroke="#3f6ccf" strokeWidth="1" />
        <line x1="80" y1="70" x2="80" y2="130" stroke="#2f4eb2" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
    </div>
  );
};

export default ShirtHangerLoader;

