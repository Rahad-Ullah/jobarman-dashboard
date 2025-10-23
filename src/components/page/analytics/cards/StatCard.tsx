import React from "react";

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="grid justify-items-center items-center gap-4 bg-white p-5 px-8 rounded-lg border hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-medium text-gray-950">{title}</h3>
      <p className="text-4xl font-bold text-primary-foreground">{value}</p>
    </div>
  );
};

export default StatCard;
