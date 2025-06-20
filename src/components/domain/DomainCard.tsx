import React from 'react';
import { Calendar, Shield, Lock, MoreVertical } from 'lucide-react';
import { Domain } from '../../types/domain';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatDate, getDaysUntilExpiry, getStatusColor } from '../../utils/formatters';

interface DomainCardProps {
  domain: Domain;
  onEdit: (domain: Domain) => void;
  onDelete: (id: string) => void;
  onRenew: (id: string) => void;
}

export const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  onEdit,
  onDelete,
  onRenew,
}) => {
  const daysUntilExpiry = getDaysUntilExpiry(domain.expirationDate);
  const isExpiringSoon = daysUntilExpiry <= 30;

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {domain.name}
            </h3>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(domain.status)}`}>
              {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
            </span>
          </div>
          <Button variant="ghost" size="sm" icon={MoreVertical}><span /></Button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Expires on {formatDate(domain.expirationDate)}</span>
            {isExpiringSoon && (
              <span className="ml-2 text-amber-600 font-medium">
                ({daysUntilExpiry} days left)
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className={`w-4 h-4 mr-1 ${domain.privacy ? 'text-emerald-500' : 'text-gray-400'}`} />
              <span>Privacy {domain.privacy ? 'On' : 'Off'}</span>
            </div>
            <div className="flex items-center">
              <Lock className={`w-4 h-4 mr-1 ${domain.locked ? 'text-emerald-500' : 'text-gray-400'}`} />
              <span>{domain.locked ? 'Locked' : 'Unlocked'}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">Registrar:</span> {domain.registrar}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(domain)}
            className="flex-1"
          >
            Edit
          </Button>
          {isExpiringSoon && (
            <Button
              size="sm"
              onClick={() => onRenew(domain.id)}
              className="flex-1"
            >
              Renew Now
            </Button>
          )}
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(domain.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};