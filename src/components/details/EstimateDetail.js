'use client';

import { useState } from 'react';
import {
  ArrowLeftIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const statusColors = {
  'Draft': 'bg-gray-100 text-gray-800',
  'Sent': 'bg-blue-100 text-blue-800',
  'Accepted': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Expired': 'bg-yellow-100 text-yellow-800',
};

export default function EstimateDetail({ estimate, onBack, onUpdate, onCreateJob }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(estimate?.notes || '');

  if (!estimate) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Estimate not found</h2>
          <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700">
            ← Back to Estimates
          </button>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (newStatus) => {
    if (onUpdate) {
      const updatedEstimate = { ...estimate, status: newStatus };
      if (newStatus === 'Sent' && !estimate.sentDate) {
        updatedEstimate.sentDate = new Date().toISOString().split('T')[0];
      } else if (newStatus === 'Accepted' && !estimate.acceptedDate) {
        updatedEstimate.acceptedDate = new Date().toISOString().split('T')[0];
      }
      onUpdate(updatedEstimate);
    }
  };

  const handleNotesUpdate = () => {
    if (onUpdate) {
      onUpdate({ ...estimate, notes });
    }
    setIsEditingNotes(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Draft': return <PencilIcon className="h-5 w-5" />;
      case 'Sent': return <PaperAirplaneIcon className="h-5 w-5" />;
      case 'Accepted': return <CheckCircleIcon className="h-5 w-5" />;
      case 'Rejected': return <XMarkIcon className="h-5 w-5" />;
      case 'Expired': return <ExclamationTriangleIcon className="h-5 w-5" />;
      default: return <DocumentTextIcon className="h-5 w-5" />;
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
          Back to Estimates
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{estimate.title}</h1>
            <p className="text-lg text-gray-600 mt-1">{estimate.id} • {estimate.customerName}</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[estimate.status]}`}>
              {getStatusIcon(estimate.status)}
              <span className="ml-1">{estimate.status}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Estimate Overview */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estimate Overview</h2>
            <div className="prose prose-sm text-gray-600">
              <p>{estimate.description}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Line Items</h2>
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Description</th>
                    <th className="text-center py-3 text-sm font-medium text-gray-500">Qty</th>
                    <th className="text-center py-3 text-sm font-medium text-gray-500">Unit</th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">Unit Price</th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {estimate.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3">
                        <div className="text-sm font-medium text-gray-900">{item.description}</div>
                      </td>
                      <td className="text-center py-3 text-sm text-gray-900">{item.quantity}</td>
                      <td className="text-center py-3 text-sm text-gray-900">{item.unit}</td>
                      <td className="text-right py-3 text-sm text-gray-900">${item.unitPrice.toLocaleString()}</td>
                      <td className="text-right py-3 text-sm text-gray-900">${item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-gray-200">
                  <tr>
                    <td colSpan="4" className="py-3 text-right text-sm font-medium text-gray-900">Subtotal:</td>
                    <td className="py-3 text-right text-sm font-medium text-gray-900">${estimate.total.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="py-3 text-right text-sm font-medium text-gray-900">Tax:</td>
                    <td className="py-3 text-right text-sm font-medium text-gray-900">${estimate.tax.toLocaleString()}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td colSpan="4" className="py-3 text-right text-lg font-bold text-gray-900">Grand Total:</td>
                    <td className="py-3 text-right text-lg font-bold text-gray-900">${estimate.grandTotal.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Status Actions */}
          {estimate.status === 'Draft' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleStatusUpdate('Sent')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                  Send to Customer
                </button>
              </div>
            </div>
          )}

          {estimate.status === 'Sent' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Response</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleStatusUpdate('Accepted')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Mark as Accepted
                </button>
                <button
                  onClick={() => handleStatusUpdate('Rejected')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Mark as Rejected
                </button>
              </div>
            </div>
          )}

          {estimate.status === 'Accepted' && onCreateJob && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h2>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">Estimate Accepted</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  This estimate has been accepted by the customer. You can now create a job to begin work.
                </p>
              </div>
              <button
                onClick={() => onCreateJob(estimate)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                Create Job from Estimate
              </button>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
            
            {isEditingNotes ? (
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
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
                      setNotes(estimate.notes || '');
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
                {estimate.notes || 'No notes added yet.'}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Estimate Details */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Customer</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {estimate.customerName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Created Date</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {estimate.createdDate}
                </dd>
              </div>
              {estimate.sentDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Sent Date</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {estimate.sentDate}
                  </dd>
                </div>
              )}
              {estimate.acceptedDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Accepted Date</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {estimate.acceptedDate}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Valid Until</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {estimate.validUntil}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Value</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  ${estimate.grandTotal.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Estimate Summary */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Line Items</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {estimate.items?.length || 0} items
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ${estimate.total.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Tax</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ${estimate.tax.toLocaleString()}
                </dd>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Grand Total</dt>
                <dd className="mt-1 text-lg font-bold text-gray-900">
                  ${estimate.grandTotal.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Created</p>
                  <p className="text-xs text-gray-500">{estimate.createdDate}</p>
                </div>
              </div>
              {estimate.sentDate && (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Sent</p>
                    <p className="text-xs text-gray-500">{estimate.sentDate}</p>
                  </div>
                </div>
              )}
              {estimate.acceptedDate && (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Accepted</p>
                    <p className="text-xs text-gray-500">{estimate.acceptedDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}