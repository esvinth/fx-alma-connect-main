
import React from 'react';
import { Users, Briefcase, Calendar, Award } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ icon, value, label }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-3 rounded-full bg-fx-purple/10 text-fx-purple mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16">
      <div className="fx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat 
            icon={<Users className="h-6 w-6" />} 
            value="10,000+" 
            label="Alumni Network" 
          />
          <Stat 
            icon={<Briefcase className="h-6 w-6" />} 
            value="500+" 
            label="Job Opportunities" 
          />
          <Stat 
            icon={<Calendar className="h-6 w-6" />} 
            value="50+" 
            label="Annual Events" 
          />
          <Stat 
            icon={<Award className="h-6 w-6" />} 
            value="25+" 
            label="Years of Excellence" 
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
