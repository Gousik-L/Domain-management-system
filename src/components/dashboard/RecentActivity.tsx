import React from 'react';
import { formatDate } from '../../utils/formatters';
import { DomainHistory } from '../../types/domain';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface RecentActivityProps {
  activities: DomainHistory[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'renewed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'registered':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getActionIcon(activity.action)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(activity.date)}
                </p>
              </div>
              {activity.cost && (
                <div className="text-sm font-medium text-gray-900">
                  ${activity.cost}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};