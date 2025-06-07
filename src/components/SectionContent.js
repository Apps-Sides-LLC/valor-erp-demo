'use client';

import { useUI } from '@/context/ui-context';
import Dashboard from './modules/Dashboard';
import Customers from './modules/Customers';
import Estimates from './modules/Estimates';
import Jobs from './modules/Jobs';
import TimeAttendance from './modules/TimeAttendance';
import Inventory from './modules/Inventory';
import Invoices from './modules/Invoices';
import Vendors from './modules/Vendors';
import Reports from './modules/Reports';

const moduleComponents = {
  Dashboard,
  Customers,
  Estimates,
  Jobs,
  'Time & Attendance': TimeAttendance,
  Inventory,
  Invoices,
  Vendors,
  Reports,
};

export default function SectionContent() {
  const { activeSection } = useUI();
  const Component = moduleComponents[activeSection];

  if (!Component) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Module Not Found</h2>
          <p className="mt-2 text-gray-600">The requested module is not available.</p>
        </div>
      </div>
    );
  }

  return <Component />;
}