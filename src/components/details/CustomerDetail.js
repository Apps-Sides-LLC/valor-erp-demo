'use client';

import { useState } from 'react';
import {
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  BuildingOfficeIcon,
  HomeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Inactive': 'bg-gray-100 text-gray-800',
};

const typeColors = {
  'Commercial': 'bg-blue-100 text-blue-800',
  'Residential': 'bg-purple-100 text-purple-800',
};

// Mock data for customer's jobs and invoices
const getCustomerJobs = (customerId) => {
  const jobs = [
    { id: 'J-2024-001', title: 'HVAC System Upgrade', status: 'Completed', value: 34668, startDate: '2024-01-15', endDate: '2024-01-25' },
    { id: 'J-2024-002', title: 'Office Renovation', status: 'In Progress', value: 16632, startDate: '2024-01-20', endDate: null },
    { id: 'J-2024-003', title: 'Kitchen Remodel', status: 'Ready', value: 8856, startDate: '2024-02-01', endDate: null },
  ];
  return jobs.filter(job => customerId === 3 ? true : customerId === 1 ? [0, 1].includes(jobs.indexOf(job)) : [2].includes(jobs.indexOf(job)));
};

const getCustomerInvoices = (customerId) => {
  const invoices = [
    { id: 'INV-2024-001', title: 'HVAC System Upgrade - Final Invoice', status: 'Paid', amount: 34668, dueDate: '2024-02-19', paidDate: '2024-01-25' },
    { id: 'INV-2024-002', title: 'Office Renovation - Progress Payment', status: 'Sent', amount: 9450, dueDate: '2024-02-17', paidDate: null },
    { id: 'INV-2024-003', title: 'Kitchen Remodel - Deposit', status: 'Draft', amount: 2500, dueDate: '2024-02-15', paidDate: null },
  ];
  return invoices.filter(invoice => customerId === 3 ? [0].includes(invoices.indexOf(invoice)) : customerId === 1 ? [1].includes(invoices.indexOf(invoice)) : [2].includes(invoices.indexOf(invoice)));
};

export default function CustomerDetail({ customer, onBack, onUpdate }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(customer?.notes || '');
  const [activeTab, setActiveTab] = useState('overview');

  if (!customer) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Customer not found</h2>
          <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700">
            ← Back to Customers
          </button>
        </div>
      </div>
    );
  }

  const customerJobs = getCustomerJobs(customer.id);
  const customerInvoices = getCustomerInvoices(customer.id);
  const averageJobValue = customerJobs.length > 0 ? customer.totalRevenue / customer.totalJobs : 0;

  const handleNotesUpdate = () => {
    if (onUpdate) {
      onUpdate({ ...customer, notes });
    }
    setIsEditingNotes(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircleIcon className="h-5 w-5" />;
      case 'Inactive': return <ExclamationTriangleIcon className="h-5 w-5" />;
      default: return <UserIcon className="h-5 w-5" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Commercial': return <BuildingOfficeIcon className="h-5 w-5" />;
      case 'Residential': return <HomeIcon className="h-5 w-5" />;
      default: return <UserIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Customers
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[customer.type]}`}>
                {getTypeIcon(customer.type)}
                <span className="ml-1">{customer.type}</span>
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                {getStatusIcon(customer.status)}
                <span className="ml-1">{customer.status}</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">${customer.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-sm text-gray-400 mt-1">Last Contact: {customer.lastContact}</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{customer.totalJobs}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${customer.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Job Value</p>
              <p className="text-2xl font-bold text-gray-900">${averageJobValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Contact</p>
              <p className="text-lg font-bold text-gray-900">{customer.lastContact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: UserIcon },
            { id: 'jobs', label: 'Jobs & Projects', icon: BriefcaseIcon },
            { id: 'invoices', label: 'Invoices', icon: DocumentTextIcon },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Customer Information */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Contact Information</dt>
                    <dd className="space-y-2">
                      <div className="flex items-center text-sm text-gray-900">
                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.address}
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Business Details</dt>
                    <dd className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Customer Type</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[customer.type]}`}>
                          {customer.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                          {customer.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Contact</span>
                        <span className="text-sm font-medium text-gray-900">{customer.lastContact}</span>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Revenue Analytics */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${customer.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">${averageJobValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Average Job Value</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{customer.totalJobs}</div>
                    <div className="text-sm text-gray-600">Completed Jobs</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'jobs' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Jobs & Projects</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Job ID</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Title</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">Value</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Start Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {customerJobs.map((job, index) => (
                      <tr key={index}>
                        <td className="py-3 text-sm font-medium text-blue-600">{job.id}</td>
                        <td className="py-3 text-sm text-gray-900">{job.title}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="text-right py-3 text-sm font-medium text-gray-900">${job.value.toLocaleString()}</td>
                        <td className="py-3 text-sm text-gray-600">{job.startDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {customerJobs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No jobs found for this customer.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoices</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Invoice ID</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Title</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {customerInvoices.map((invoice, index) => (
                      <tr key={index}>
                        <td className="py-3 text-sm font-medium text-blue-600">{invoice.id}</td>
                        <td className="py-3 text-sm text-gray-900">{invoice.title}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="text-right py-3 text-sm font-medium text-gray-900">${invoice.amount.toLocaleString()}</td>
                        <td className="py-3 text-sm text-gray-600">{invoice.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {customerInvoices.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No invoices found for this customer.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Customer Notes</h2>
              {!isEditingNotes && (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {isEditingNotes ? (
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this customer..."
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={handleNotesUpdate}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNotes(customer.notes || '');
                      setIsEditingNotes(false);
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                {customer.notes || 'No notes added yet.'}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Summary */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {customer.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {customer.phone}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="break-words">{customer.address}</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Contact</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {customer.lastContact}
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                Create New Job
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Create Estimate
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                Send Email
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <PhoneIcon className="h-4 w-4 mr-2" />
                Schedule Call
              </button>
            </div>
          </div>

          {/* Customer Health */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Health</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                  {customer.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Jobs</span>
                <span className="text-sm font-medium text-gray-900">{customer.totalJobs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-sm font-medium text-green-600">${customer.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-900">Avg Job Value</span>
                <span className="text-sm font-bold text-gray-900">${averageJobValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}