import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Domain } from '../../types/domain';
import { DomainCard } from './DomainCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface DomainListProps {
  domains: Domain[];
  onEdit: (domain: Domain) => void;
  onDelete: (id: string) => void;
  onRenew: (id: string) => void;
}

interface EditDomainModalProps {
  domain: Domain | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (domain: Domain) => void;
}

const EditDomainModal: React.FC<EditDomainModalProps> = ({
  domain,
  isOpen,
  onClose,
  onSave,
}) => {
  const [autoRenew, setAutoRenew] = useState(domain?.autoRenew || false);
  const [privacy, setPrivacy] = useState(domain?.privacy || false);
  const [locked, setLocked] = useState(domain?.locked || false);

  const handleSave = () => {
    if (domain) {
      onSave({
        ...domain,
        autoRenew,
        privacy,
        locked,
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Domain Settings">
      {domain && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{domain.name}</h4>
            <p className="text-sm text-gray-600">Configure your domain settings</p>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Auto-renewal</span>
                <p className="text-sm text-gray-600">Automatically renew before expiration</p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Privacy protection</span>
                <p className="text-sm text-gray-600">Hide your personal information from WHOIS</p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={locked}
                onChange={(e) => setLocked(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Domain lock</span>
                <p className="text-sm text-gray-600">Prevent unauthorized transfers</p>
              </div>
            </label>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export const DomainList: React.FC<DomainListProps> = ({
  domains,
  onEdit,
  onDelete,
  onRenew,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);

  const filteredDomains = domains.filter((domain) => {
    const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || domain.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (domain: Domain) => {
    setEditingDomain(domain);
  };

  const handleSaveEdit = (domain: Domain) => {
    onEdit(domain);
    setEditingDomain(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Domains</h1>
          <p className="text-gray-600">Manage your domain portfolio</p>
        </div>
        <Button icon={Plus}>Add Domain</Button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search domains..."
            icon={Search}
          />
        </div>
        <div className="w-48">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.map((domain) => (
          <DomainCard
            key={domain.id}
            domain={domain}
            onEdit={handleEdit}
            onDelete={onDelete}
            onRenew={onRenew}
          />
        ))}
      </div>

      {filteredDomains.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No domains found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first domain.'}
          </p>
        </div>
      )}

      <EditDomainModal
        domain={editingDomain}
        isOpen={!!editingDomain}
        onClose={() => setEditingDomain(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};