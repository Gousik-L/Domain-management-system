import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  activeSection, 
  onSectionChange 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};