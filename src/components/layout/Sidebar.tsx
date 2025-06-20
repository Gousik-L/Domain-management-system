import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Globe, 
  History, 
  Mail, 
  CreditCard, 
  User 
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../utils/constants';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const iconMap = {
  LayoutDashboard,
  Search,
  Globe,
  History,
  Mail,
  CreditCard,
  User,
};

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg
                transition-all duration-200 group
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`
                w-5 h-5 mr-3 transition-colors duration-200
                ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
              `} />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h4>
          <p className="text-xs text-gray-600 mb-3">
            Get support or check our documentation for more information.
          </p>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Contact Support →
          </button>
        </div>
      </div>
    </aside>
  );
};