import React, { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { DOMAIN_EXTENSIONS } from '../../utils/constants';
import { DomainSearch as DomainSearchType } from '../../types/domain';

export const DomainSearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<DomainSearchType[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: DomainSearchType[] = DOMAIN_EXTENSIONS.map((ext, index) => ({
        domain: `${searchTerm}${ext}`,
        available: Math.random() > 0.5,
        price: Math.floor(Math.random() * 50) + 10,
        premium: Math.random() > 0.8,
      }));
      
      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Your Perfect Domain
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search for available domains and register them instantly. Start building your online presence today.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Enter domain name..."
                icon={Search}
                className="text-lg"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchTerm.trim()}
              size="lg"
              className="px-8"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Search Results for "{searchTerm}"
          </h2>
          <div className="grid gap-3">
            {results.map((result) => (
              <Card key={result.domain} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {result.available ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="font-semibold text-gray-900">
                          {result.domain}
                        </span>
                      </div>
                      {result.premium && (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-900">
                        ${result.price}/year
                      </span>
                      {result.available ? (
                        <Button size="sm">
                          Add to Cart
                        </Button>
                      ) : (
                        <Button size="sm" variant="secondary" disabled>
                          Unavailable
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};