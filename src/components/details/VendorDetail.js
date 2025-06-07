'use client';

import { useState } from 'react';
import {
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TruckIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  BanknotesIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Inactive': 'bg-gray-100 text-gray-800',
};

const categoryColors = {
  'Electrical': 'bg-blue-100 text-blue-800',
  'Plumbing': 'bg-green-100 text-green-800',
  'HVAC': 'bg-purple-100 text-purple-800',
  'Hardware': 'bg-orange-100 text-orange-800',
  'General': 'bg-gray-100 text-gray-800',
};

// Mock data for vendor's purchase orders and payments
const getVendorOrders = (vendorId) => {
  const orders = [
    { id: 'PO-2024-001', description: 'HVAC Units and Ductwork', status: 'Delivered', amount: 28500, orderDate: '2024-01-05', deliveryDate: '2024-01-15' },
    { id: 'PO-2024-002', description: 'Electrical Supplies - Wire & Cable', status: 'Pending', amount: 4250, orderDate: '2024-01-18', deliveryDate: null },
    { id: 'PO-2024-003', description: 'Emergency Electrical Parts', status: 'Delivered', amount: 850, orderDate: '2024-01-20', deliveryDate: '2024-01-21' },
  ];
  return orders.filter(order => vendorId === 1 ? [1, 2].includes(orders.indexOf(order)) : vendorId === 3 ? [0].includes(orders.indexOf(order)) : []);
};

const getVendorPayments = (vendorId) => {
  const payments = [
    { id: 'PAY-2024-001', description: 'Invoice #INV-2024-015', status: 'Paid', amount: 28500, dueDate: '2024-02-05', paidDate: '2024-01-30' },
    { id: 'PAY-2024-002', description: 'Invoice #INV-2024-018', status: 'Due', amount: 4250, dueDate: '2024-02-18', paidDate: null },
    { id: 'PAY-2024-003', description: 'Invoice #INV-2024-020', status: 'Overdue', amount: 850, dueDate: '2024-02-10', paidDate: null },
  ];
  return payments.filter(payment => vendorId === 1 ? [1, 2].includes(payments.indexOf(payment)) : vendorId === 3 ? [0].includes(payments.indexOf(payment)) : []);
};

export default function VendorDetail({ vendor, onBack, onUpdate }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(vendor?.notes || '');
  const [activeTab, setActiveTab] = useState('overview');

  if (!vendor) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Vendor not found</h2>
          <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700">
            ← Back to Vendors
          </button>
        </div>
      </div>
    );
  }

  const vendorOrders = getVendorOrders(vendor.id);
  const vendorPayments = getVendorPayments(vendor.id);
  const averageOrderValue = vendorOrders.length > 0 ? vendor.totalPurchases / vendorOrders.length : 0;

  const handleNotesUpdate = () => {
    if (onUpdate) {
      onUpdate({ ...vendor, notes });
    }
    setIsEditingNotes(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircleIcon className="h-5 w-5" />;
      case 'Inactive': return <ExclamationTriangleIcon className="h-5 w-5" />;
      default: return <TruckIcon className="h-5 w-5" />;
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
          Back to Vendors
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
            <p className="text-lg text-gray-600 mt-1">Contact: {vendor.contactName}</p>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[vendor.category] || 'bg-gray-100 text-gray-800'}`}>
                {vendor.category}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[vendor.status]}`}>
                {getStatusIcon(vendor.status)}
                <span className="ml-1">{vendor.status}</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">${vendor.totalPurchases.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Purchases</div>
            <div className="text-sm text-gray-400 mt-1">Last Order: {vendor.lastOrder}</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">${vendor.totalPurchases.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">${averageOrderValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BanknotesIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Payment Terms</p>
              <p className="text-lg font-bold text-gray-900">{vendor.paymentTerms}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Order</p>
              <p className="text-lg font-bold text-gray-900">{vendor.lastOrder}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TruckIcon },
            { id: 'orders', label: 'Purchase Orders', icon: DocumentTextIcon },
            { id: 'payments', label: 'Payments', icon: BanknotesIcon },
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
              {/* Vendor Information */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Contact Information</dt>
                    <dd className="space-y-2">
                      <div className="flex items-center text-sm text-gray-900">
                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {vendor.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {vendor.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {vendor.address}
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Business Details</dt>
                    <dd className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[vendor.category] || 'bg-gray-100 text-gray-800'}`}>
                          {vendor.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[vendor.status]}`}>
                          {vendor.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Payment Terms</span>
                        <span className="text-sm font-medium text-gray-900">{vendor.paymentTerms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Tax ID</span>
                        <span className="text-sm font-medium text-gray-900">{vendor.taxId}</span>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Products & Services */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Products & Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vendor.items.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Analytics */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Purchase Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">${vendor.totalPurchases.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Purchases</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${averageOrderValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Average Order</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{vendorOrders.length}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Purchase Orders</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">PO Number</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Description</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Order Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vendorOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="py-3 text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="py-3 text-sm text-gray-900">{order.description}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="text-right py-3 text-sm font-medium text-gray-900">${order.amount.toLocaleString()}</td>
                        <td className="py-3 text-sm text-gray-600">{order.orderDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {vendorOrders.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No purchase orders found for this vendor.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Payment ID</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Description</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vendorPayments.map((payment, index) => (
                      <tr key={index}>
                        <td className="py-3 text-sm font-medium text-blue-600">{payment.id}</td>
                        <td className="py-3 text-sm text-gray-900">{payment.description}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            payment.status === 'Due' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="text-right py-3 text-sm font-medium text-gray-900">${payment.amount.toLocaleString()}</td>
                        <td className="py-3 text-sm text-gray-600">{payment.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {vendorPayments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No payment records found for this vendor.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Vendor Notes</h2>
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
                  placeholder="Add notes about this vendor..."
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
                      setNotes(vendor.notes || '');
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
                {vendor.notes || 'No notes added yet.'}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Vendor Summary */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <IdentificationIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {vendor.contactName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {vendor.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {vendor.phone}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="break-words">{vendor.address}</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Order</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {vendor.lastOrder}
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Create Purchase Order
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <BanknotesIcon className="h-4 w-4 mr-2" />
                Record Payment
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

          {/* Vendor Performance */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[vendor.status]}`}>
                  {vendor.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="text-sm font-medium text-gray-900">{vendorOrders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Purchases</span>
                <span className="text-sm font-medium text-blue-600">${vendor.totalPurchases.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Terms</span>
                <span className="text-sm font-medium text-gray-900">{vendor.paymentTerms}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-900">Avg Order Value</span>
                <span className="text-sm font-bold text-gray-900">${averageOrderValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Information</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Tax ID</dt>
                <dd className="text-sm font-medium text-gray-900">{vendor.taxId}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Category</dt>
                <dd>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[vendor.category] || 'bg-gray-100 text-gray-800'}`}>
                    {vendor.category}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}