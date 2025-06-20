import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({ children, className = '' }) => {
  return (
    <tr className={`hover:bg-gray-50 transition-colors duration-150 ${className}`}>
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  header?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({ 
  children, 
  className = '',
  header = false 
}) => {
  const baseClasses = "px-6 py-4 text-sm";
  const headerClasses = "font-semibold text-gray-900 uppercase tracking-wider";
  const cellClasses = "text-gray-900";

  return (
    <td className={`${baseClasses} ${header ? headerClasses : cellClasses} ${className}`}>
      {children}
    </td>
  );
};

export const TableHeaderCell: React.FC<Omit<TableCellProps, 'header'>> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <th className={`px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
};