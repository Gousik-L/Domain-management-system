import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { DomainSearchComponent } from './components/domain/DomainSearch';
import { DomainList } from './components/domain/DomainList';
import { DomainHistoryPage } from './pages/DomainHistory';
import { MXRecordEditor } from './components/domain/MXRecordEditor';
import { BillingHistory } from './components/billing/BillingHistory';
import { ProfileForm } from './components/profile/ProfileForm';
import { useDomains } from './hooks/useDomains';
import { useAuth } from './hooks/useAuth';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { 
    domains, 
    history, 
    mxRecords,
    updateDomain,
    deleteDomain,
    renewDomain,
    updateMXRecord,
    addMXRecord,
    deleteMXRecord
  } = useDomains();
  const { user, billing, updateUser, changePassword, downloadInvoice } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard domains={domains} history={history} />;
      case 'search':
        return <DomainSearchComponent />;
      case 'domains':
        return (
          <DomainList
            domains={domains}
            onEdit={updateDomain}
            onDelete={deleteDomain}
            onRenew={(id) => renewDomain(id, 1)}
          />
        );
      case 'history':
        return <DomainHistoryPage history={history} />;
      case 'mx-records':
        return (
          <MXRecordEditor
            records={mxRecords}
            onUpdate={updateMXRecord}
            onAdd={addMXRecord}
            onDelete={deleteMXRecord}
          />
        );
      case 'billing':
        return (
          <BillingHistory
            records={billing}
            onDownloadInvoice={downloadInvoice}
          />
        );
      case 'profile':
        return (
          <ProfileForm
            user={user}
            onUpdate={updateUser}
            onChangePassword={changePassword}
          />
        );
      default:
        return <Dashboard domains={domains} history={history} />;
    }
  };

  return (
    <Layout
      user={user}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;