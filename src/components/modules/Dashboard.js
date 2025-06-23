"use client";

import {
  ChartBarIcon,
  UsersIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { useUI } from "@/context/ui-context";
import { usePathname } from "next/navigation";

const stats = [
  {
    name: "Total Revenue",
    value: "$145,280",
    change: "+12.5%",
    changeType: "increase",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Active Jobs",
    value: "23",
    change: "+3",
    changeType: "increase",
    icon: BriefcaseIcon,
  },
  {
    name: "Total Customers",
    value: "156",
    change: "+8",
    changeType: "increase",
    icon: UsersIcon,
  },
  {
    name: "Hours Logged",
    value: "1,247",
    change: "-2.1%",
    changeType: "decrease",
    icon: ClockIcon,
  },
];

const recentJobs = [
  {
    id: "J-2024-001",
    customer: "ABC Construction",
    title: "Office Renovation",
    status: "In Progress",
    value: "$15,400",
    progress: 65,
  },
  {
    id: "J-2024-002",
    customer: "Smith Residence",
    title: "Kitchen Remodel",
    status: "Review",
    value: "$8,200",
    progress: 90,
  },
  {
    id: "J-2024-003",
    customer: "Downtown Hotel",
    title: "HVAC System Upgrade",
    status: "Ready",
    value: "$32,100",
    progress: 0,
  },
  {
    id: "J-2024-004",
    customer: "Metro Shopping Center",
    title: "Electrical Maintenance",
    status: "In Progress",
    value: "$5,600",
    progress: 40,
  },
];

const lowStockItems = [
  { sku: "WIRE-12G-500", name: "12 AWG Wire - 500ft", current: 2, minimum: 10 },
  { sku: "PIPE-PVC-4IN", name: '4" PVC Pipe', current: 5, minimum: 15 },
  { sku: "SCREW-DW-2IN", name: '2" Drywall Screws', current: 1, minimum: 20 },
];

const statusColors = {
  Ready: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Review: "bg-purple-100 text-purple-800",
  Finished: "bg-green-100 text-green-800",
};

export default function Dashboard() {
  const { setActiveSection, setShouldOpenEstimateModal } = useUI();

  const handleNewEstimate = () => {
    setShouldOpenEstimateModal(true);
    setActiveSection("Estimates");
  };

  const handleAddCustomer = () => {
    setActiveSection("Customers");
    // The Customers component will detect this and open the new customer form
    setTimeout(() => {
      const addCustomerBtn = document.querySelector(
        '[data-action="add-customer"]',
      );
      if (addCustomerBtn) addCustomerBtn.click();
    }, 100);
  };

  const handleCreateJob = () => {
    setActiveSection("Jobs");
    // The Jobs component will detect this and open the new job form
    setTimeout(() => {
      const createJobBtn = document.querySelector('[data-action="create-job"]');
      if (createJobBtn) createJobBtn.click();
    }, 100);
  };

  const handleNewInvoice = () => {
    setActiveSection("Invoices");
    // The Invoices component will detect this and open the new invoice form
    setTimeout(() => {
      const newInvoiceBtn = document.querySelector(
        '[data-action="new-invoice"]',
      );
      if (newInvoiceBtn) newInvoiceBtn.click();
    }, 100);
  };

  const pathname = usePathname();
  const decodedPathname = decodeURIComponent(pathname.replace("/", ""));
  const pageTitle = decodedPathname
    ? `Dashboard for ${decodedPathname}`
    : "Dashboard";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="mt-2 text-lg text-gray-600">
          Overview of your business operations and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                  {stat.name}
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="flex-shrink-0 ml-2">
                <div
                  className={`inline-flex items-center rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium ${
                    stat.changeType === "increase"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <ArrowTrendingUpIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                  )}
                  <span className="hidden sm:inline">{stat.change}</span>
                  <span className="sm:hidden">
                    {stat.change.replace("+", "").replace("%", "")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={handleNewEstimate}
            className="flex flex-col items-center p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors touch-manipulation active:scale-95"
          >
            <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900 text-center leading-tight">
              New Estimate
            </span>
          </button>
          <button
            onClick={handleAddCustomer}
            className="flex flex-col items-center p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors touch-manipulation active:scale-95"
          >
            <UsersIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900 text-center leading-tight">
              Add Customer
            </span>
          </button>
          <button
            onClick={handleCreateJob}
            className="flex flex-col items-center p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors touch-manipulation active:scale-95"
          >
            <BriefcaseIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900 text-center leading-tight">
              Create Job
            </span>
          </button>
          <button
            onClick={handleNewInvoice}
            className="flex flex-col items-center p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors touch-manipulation active:scale-95"
          >
            <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900 text-center leading-tight">
              New Invoice
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="space-y-3 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900 truncate pr-2">
                          <span className="sm:hidden">{job.id}</span>
                          <span className="hidden sm:inline">
                            {job.id} - {job.title}
                          </span>
                        </p>
                        <span
                          className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-medium mt-1 sm:mt-0 w-fit ${
                            statusColors[job.status]
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 sm:hidden mb-1">
                        {job.title}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {job.customer}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <span className="text-sm font-medium text-gray-900">
                          {job.value}
                        </span>
                        <div className="flex items-center">
                          <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2 mr-2 flex-shrink-0">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {job.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors touch-manipulation">
                View All Jobs →
              </button>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-900">
                Low Stock Alerts
              </h3>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div
                  key={item.sku}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-sm font-medium text-red-600">
                      {item.current} / {item.minimum}
                    </p>
                    <p className="text-xs text-gray-500">Current / Minimum</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full text-center text-sm font-medium text-orange-600 hover:text-orange-700 py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors touch-manipulation">
                Manage Inventory →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
