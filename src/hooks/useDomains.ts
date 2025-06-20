import { useState } from 'react';
import { Domain, DomainHistory, MXRecord } from '../types/domain';

// Mock data
const mockDomains: Domain[] = [
  {
    id: '1',
    name: 'example.com',
    status: 'active',
    registrationDate: new Date('2023-01-15'),
    expirationDate: new Date('2025-01-15'),
    autoRenew: true,
    registrar: 'GoDaddy',
    nameservers: ['ns1.godaddy.com', 'ns2.godaddy.com'],
    locked: true,
    privacy: true,
  },
  {
    id: '2',
    name: 'mystore.io',
    status: 'expiring',
    registrationDate: new Date('2022-03-10'),
    expirationDate: new Date('2024-03-10'),
    autoRenew: false,
    registrar: 'Namecheap',
    nameservers: ['dns1.namecheap.com', 'dns2.namecheap.com'],
    locked: false,
    privacy: true,
  },
  {
    id: '3',
    name: 'portfolio.dev',
    status: 'active',
    registrationDate: new Date('2023-06-20'),
    expirationDate: new Date('2024-06-20'),
    autoRenew: true,
    registrar: 'Cloudflare',
    nameservers: ['clark.ns.cloudflare.com', 'mina.ns.cloudflare.com'],
    locked: true,
    privacy: false,
  },
];

const mockHistory: DomainHistory[] = [
  {
    id: '1',
    domainId: '1',
    action: 'renewed',
    date: new Date('2024-01-15'),
    details: 'Domain renewed for 2 years',
    cost: 24.99,
  },
  {
    id: '2',
    domainId: '2',
    action: 'registered',
    date: new Date('2022-03-10'),
    details: 'Domain registered',
    cost: 12.99,
  },
];

const mockMXRecords: MXRecord[] = [
  {
    id: '1',
    domainId: '1',
    hostname: '@',
    priority: 10,
    target: 'mail.example.com',
  },
  {
    id: '2',
    domainId: '1',
    hostname: '@',
    priority: 20,
    target: 'mail2.example.com',
  },
];

export const useDomains = () => {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [history, setHistory] = useState<DomainHistory[]>(mockHistory);
  const [mxRecords, setMXRecords] = useState<MXRecord[]>(mockMXRecords);

  const updateDomain = (id: string, updates: Partial<Domain>) => {
    setDomains(prev => prev.map(domain => 
      domain.id === id ? { ...domain, ...updates } : domain
    ));
  };

  const deleteDomain = (id: string) => {
    setDomains(prev => prev.filter(domain => domain.id !== id));
  };

  const renewDomain = (id: string, years: number) => {
    const domain = domains.find(d => d.id === id);
    if (domain) {
      const newExpirationDate = new Date(domain.expirationDate);
      newExpirationDate.setFullYear(newExpirationDate.getFullYear() + years);
      
      updateDomain(id, { 
        expirationDate: newExpirationDate,
        status: 'active'
      });

      const historyEntry: DomainHistory = {
        id: Date.now().toString(),
        domainId: id,
        action: 'renewed',
        date: new Date(),
        details: `Domain renewed for ${years} year${years > 1 ? 's' : ''}`,
        cost: years * 12.99,
      };

      setHistory(prev => [historyEntry, ...prev]);
    }
  };

  const updateMXRecord = (id: string, updates: Partial<MXRecord>) => {
    setMXRecords(prev => prev.map(record => 
      record.id === id ? { ...record, ...updates } : record
    ));
  };

  const addMXRecord = (record: Omit<MXRecord, 'id'>) => {
    const newRecord: MXRecord = {
      ...record,
      id: Date.now().toString(),
    };
    setMXRecords(prev => [...prev, newRecord]);
  };

  const deleteMXRecord = (id: string) => {
    setMXRecords(prev => prev.filter(record => record.id !== id));
  };

  return {
    domains,
    history,
    mxRecords,
    updateDomain,
    deleteDomain,
    renewDomain,
    updateMXRecord,
    addMXRecord,
    deleteMXRecord,
  };
};