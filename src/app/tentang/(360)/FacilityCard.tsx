import React from "react";

interface FacilityCardProps {
  title: string;
  description: string;
  icon: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    // UPDATED: Removed background, shadow, and border for a transparent look
    <div className="group p-6 rounded-xl transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 dark:text-white text-gray-900">
        {title}
      </h3>
      <p className="dark:text-gray-300 text-gray-600 leading-relaxed">
        {description}
      </p>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-blue-500 dark:text-blue-400 font-medium group-hover:underline">
          Lihat Detail →
        </span>
      </div>
    </div>
  );
};

export default FacilityCard;
