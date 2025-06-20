import React from 'react';
import { Globe, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Domain, DomainHistory } from '../types/domain';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { formatDate, getDaysUntilExpiry } from '../utils/formatters';

interface DashboardProps {
  domains: Domain[];
  history: DomainHistory[];
}

export const Dashboard: React.FC<DashboardProps> = ({ domains, history }) => {
  const activeDomains = domains.filter(d => d.status === 'active').length;
  const expiringDomains = domains.filter(d => {
    const days = getDaysUntilExpiry(d.expirationDate);
    return days <= 30 && days > 0;
  }).length;
  const expiredDomains = domains.filter(d => d.status === 'expired').length;
  const totalDomains = domains.length;

  const expiringDomainsList = domains
    .filter(d => {
      const days = getDaysUntilExpiry(d.expirationDate);
      return days <= 30 && days > 0;
    })
    .sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your domain portfolio and recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Domains"
          value={totalDomains}
          icon={Globe}
          color="blue"
          change="+2 this month"
          changeType="positive"
        />
        <StatsCard
          title="Active Domains"
          value={activeDomains}
          icon={TrendingUp}
          color="green"
          change="All running smoothly"
          changeType="positive"
        />
        <StatsCard
          title="Expiring Soon"
          value={expiringDomains}
          icon={Clock}
          color="yellow"
          change="Next 30 days"
          changeType="neutral"
        />
        <StatsCard
          title="Expired"
          value={expiredDomains}
          icon={AlertTriangle}
          color="red"
          change={expiredDomains > 0 ? "Needs attention" : "All good"}
          changeType={expiredDomains > 0 ? "negative" : "positive"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={history} />
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-900">Expiring Soon</h3>
            </div>
          </CardHeader>
          <CardContent>
            {expiringDomainsList.length > 0 ? (
              <div className="space-y-3">
                {expiringDomainsList.map((domain) => {
                  const daysLeft = getDaysUntilExpiry(domain.expirationDate);
                  return (
                    <div key={domain.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <div>
                        <p className="font-medium text-gray-900">{domain.name}</p>
                        <p className="text-sm text-gray-600">
                          Expires {formatDate(domain.expirationDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-amber-600">
                          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600">No domains expiring in the next 30 days</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {totalDomains === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Globe className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Domain Manager</h3>
            <p className="text-gray-600 mb-6">
              Get started by searching for and registering your first domain.
            </p>
            <div className="space-x-4">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Search Domains
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};