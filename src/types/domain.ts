export interface Domain {
  id: string;
  name: string;
  status: 'active' | 'expired' | 'expiring' | 'pending';
  registrationDate: Date;
  expirationDate: Date;
  autoRenew: boolean;
  registrar: string;
  nameservers: string[];
  locked: boolean;
  privacy: boolean;
}

export interface DomainHistory {
  id: string;
  domainId: string;
  action: 'registered' | 'renewed' | 'transferred' | 'updated' | 'expired';
  date: Date;
  details: string;
  cost?: number;
}

export interface MXRecord {
  id: string;
  domainId: string;
  hostname: string;
  priority: number;
  target: string;
}

export interface DomainSearch {
  domain: string;
  available: boolean;
  price: number;
  premium: boolean;
}