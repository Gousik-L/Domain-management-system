export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  company?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  lastLogin: Date;
}

export interface BillingRecord {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceNumber: string;
  domainName: string;
  period: number;
}