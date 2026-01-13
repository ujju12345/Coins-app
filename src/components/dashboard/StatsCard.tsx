import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    title: string;
    value: number;
    bgColor?: string;
    iconColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    icon: Icon,
    title,
    value,
    bgColor = 'bg-white',
    iconColor = 'text-gray-700'
}) => {
    return (
        <div className={`${bgColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${iconColor}`}>
                    <Icon size={24} />
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-sm text-gray-600">{title}</div>
        </div>
    );
};

export default StatsCard;
