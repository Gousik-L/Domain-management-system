import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getDaysUntilExpiry = (expirationDate: Date): number => {
  const today = new Date();
  const diffTime = expirationDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'expiring':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'expired':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'pending':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};