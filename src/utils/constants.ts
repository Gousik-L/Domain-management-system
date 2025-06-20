export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'search', label: 'Domain Search', icon: 'Search' },
  { id: 'domains', label: 'My Domains', icon: 'Globe' },
  { id: 'history', label: 'Domain History', icon: 'History' },
  { id: 'mx-records', label: 'MX Records', icon: 'Mail' },
  { id: 'billing', label: 'Billing', icon: 'CreditCard' },
  { id: 'profile', label: 'Profile', icon: 'User' },
] as const;

export const DOMAIN_EXTENSIONS = [
  '.com', '.net', '.org', '.io', '.co', '.app', '.dev', '.tech', '.online', '.store'
];

export const REGISTRARS = [
  'GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare', 'Porkbun'
];