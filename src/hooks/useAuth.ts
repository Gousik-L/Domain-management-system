import { useState } from 'react';
import { User, BillingRecord } from '../types/user';

const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1 (555) 123-4567',
  company: 'Tech Solutions Inc.',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  },
  createdAt: new Date('2022-01-15'),
  lastLogin: new Date(),
};

const mockBilling: BillingRecord[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    description: 'Domain renewal - example.com',
    amount: 24.99,
    status: 'paid',
    invoiceNumber: 'INV-2024-001',
    domainName: 'example.com',
    period: 2,
  },
  {
    id: '2',
    date: new Date('2023-06-20'),
    description: 'Domain registration - portfolio.dev',
    amount: 12.99,
    status: 'paid',
    invoiceNumber: 'INV-2023-045',
    domainName: 'portfolio.dev',
    period: 1,
  },
];

export const useAuth = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [billing, setBilling] = useState<BillingRecord[]>(mockBilling);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    // In a real app, this would make an API call
    console.log('Password changed successfully');
    return Promise.resolve(true);
  };

  const downloadInvoice = (invoiceId: string) => {
    // In a real app, this would download the actual invoice
    const invoice = billing.find(b => b.id === invoiceId);
    if (invoice) {
      console.log(`Downloading invoice ${invoice.invoiceNumber}`);
    }
  };

  return {
    user,
    billing,
    updateUser,
    changePassword,
    downloadInvoice,
  };
};