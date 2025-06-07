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
import { useUI } from '@/context/ui-context';

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
    setActiveSection('Estimates');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Overview of your business operations and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="flex-shrink-0">
                <div
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    stat.changeType === "increase"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button 
            onClick={handleNewEstimate}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              New Estimate
            </span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <UsersIcon className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Add Customer
            </span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <BriefcaseIcon className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Create Job
            </span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              New Invoice
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">
                        {job.id} - {job.title}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[job.status]
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{job.customer}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {job.value}
                      </span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {job.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700">
                View All Jobs →
              </button>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Low Stock Alerts
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">
                      {item.current} / {item.minimum}
                    </p>
                    <p className="text-xs text-gray-500">Current / Minimum</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full text-center text-sm font-medium text-orange-600 hover:text-orange-700">
                Manage Inventory →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
