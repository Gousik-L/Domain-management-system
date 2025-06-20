import React, { useState } from 'react';
import { History, Filter, Download } from 'lucide-react';
import { DomainHistory } from '../types/domain';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatDate, formatCurrency } from '../utils/formatters';

interface DomainHistoryPageProps {
  history: DomainHistory[];
}

export const DomainHistoryPage: React.FC<DomainHistoryPageProps> = ({ history }) => {
  const [filterAction, setFilterAction] = useState('all');

  const filteredHistory = history.filter(item => 
    filterAction === 'all' || item.action === filterAction
  );

  const getActionColor = (action: string) => {
    switch (action) {
      case 'registered':
        return 'bg-blue-100 text-blue-800';
      case 'renewed':
        return 'bg-emerald-100 text-emerald-800';
      case 'transferred':
        return 'bg-purple-100 text-purple-800';
      case 'updated':
        return 'bg-amber-100 text-amber-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Domain History</h1>
          <p className="text-gray-600">Track all activities and changes across your domains.</p>
        </div>
        <Button icon={Download} variant="secondary">
          Export History
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by action:</span>
        </div>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Actions</option>
          <option value="registered">Registered</option>
          <option value="renewed">Renewed</option>
          <option value="transferred">Transferred</option>
          <option value="updated">Updated</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
          </div>
        </CardHeader>
        <CardContent>
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((item, index) => (
                <div key={item.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActionColor(item.action)}`}>
                          {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                      </div>
                      {item.cost && (
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.cost)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900">{item.details}</p>
                  </div>
                  {index < filteredHistory.length - 1 && (
                    <div className="absolute left-2 mt-4 w-px h-8 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <History className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No history found</h3>
              <p className="text-gray-600">
                {filterAction === 'all' 
                  ? 'Your domain activity will appear here as you manage your domains.'
                  : `No ${filterAction} activities found. Try changing the filter.`
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};