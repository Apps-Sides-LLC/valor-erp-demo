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
  PrinterIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const statusColors = {
  'Draft': 'bg-gray-100 text-gray-800',
  'Sent': 'bg-blue-100 text-blue-800',
  'Paid': 'bg-green-100 text-green-800',
  'Overdue': 'bg-red-100 text-red-800',
  'Cancelled': 'bg-orange-100 text-orange-800',
};

export default function InvoiceDetail({ invoice, onBack, onUpdate }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(invoice?.notes || '');

  if (!invoice) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Invoice not found</h2>
          <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700">
            ← Back to Invoices
          </button>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (newStatus) => {
    if (onUpdate) {
      const updatedInvoice = { ...invoice, status: newStatus };
      if (newStatus === 'Sent' && !invoice.sentDate) {
        updatedInvoice.sentDate = new Date().toISOString().split('T')[0];
      } else if (newStatus === 'Paid' && !invoice.paidDate) {
        updatedInvoice.paidDate = new Date().toISOString().split('T')[0];
        updatedInvoice.amountPaid = invoice.total;
        updatedInvoice.amountDue = 0;
      }
      onUpdate(updatedInvoice);
    }
  };

  const handleNotesUpdate = () => {
    if (onUpdate) {
      onUpdate({ ...invoice, notes });
    }
    setIsEditingNotes(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Draft': return <PencilIcon className="h-5 w-5" />;
      case 'Sent': return <PaperAirplaneIcon className="h-5 w-5" />;
      case 'Paid': return <CheckCircleIcon className="h-5 w-5" />;
      case 'Overdue': return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'Cancelled': return <XMarkIcon className="h-5 w-5" />;
      default: return <DocumentTextIcon className="h-5 w-5" />;
    }
  };

  const isOverdue = () => {
    if (invoice.status === 'Paid' || invoice.status === 'Cancelled') return false;
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    return today > dueDate;
  };

  const getDaysOverdue = () => {
    if (!isOverdue()) return 0;
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    return Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
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
          Back to Invoices
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{invoice.id}</h1>
            <p className="text-lg text-gray-600 mt-1">{invoice.title}</p>
            <p className="text-sm text-gray-500 mt-1">{invoice.customerName}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <PrinterIcon className="h-4 w-4 mr-1" />
                Print
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Download
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <EnvelopeIcon className="h-4 w-4 mr-1" />
                Email
              </button>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[invoice.status]}`}>
              {getStatusIcon(invoice.status)}
              <span className="ml-1">{invoice.status}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Document */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <div className="p-8">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h2>
                  <p className="text-lg font-semibold text-blue-600">{invoice.id}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">ERP Pro</div>
                  <div className="text-sm text-gray-600 mt-1">
                    123 Business Street<br />
                    City, State 12345<br />
                    (555) 123-4567
                  </div>
                </div>
              </div>

              {/* Bill To & Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">BILL TO</h3>
                  <div className="text-sm text-gray-700">
                    <div className="font-medium">{invoice.customerName}</div>
                    <div>{invoice.customerEmail}</div>
                  </div>
                </div>
                <div className="text-right">
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Issue Date:</dt>
                      <dd className="font-medium">{invoice.issueDate}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Due Date:</dt>
                      <dd className={`font-medium ${isOverdue() ? 'text-red-600' : ''}`}>
                        {invoice.dueDate}
                        {isOverdue() && (
                          <span className="text-xs text-red-600 ml-1">
                            ({getDaysOverdue()} days overdue)
                          </span>
                        )}
                      </dd>
                    </div>
                    {invoice.jobId && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Job Reference:</dt>
                        <dd className="font-medium">{invoice.jobId}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {/* Line Items */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 text-sm font-semibold text-gray-900">Description</th>
                      <th className="text-center py-3 text-sm font-semibold text-gray-900">Qty</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-900">Rate</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items?.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 pr-4">
                          <div className="text-sm font-medium text-gray-900">{item.description}</div>
                        </td>
                        <td className="text-center py-4 text-sm text-gray-900">{item.quantity}</td>
                        <td className="text-right py-4 text-sm text-gray-900">${item.unitPrice.toLocaleString()}</td>
                        <td className="text-right py-4 text-sm font-medium text-gray-900">${item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-80">
                  <dl className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Subtotal:</dt>
                      <dd className="font-medium text-gray-900">${invoice.subtotal.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Tax ({invoice.taxRate}%):</dt>
                      <dd className="font-medium text-gray-900">${invoice.taxAmount.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                      <dt className="text-gray-900">Total:</dt>
                      <dd className="text-gray-900">${invoice.total.toLocaleString()}</dd>
                    </div>
                    {invoice.amountPaid > 0 && (
                      <>
                        <div className="flex justify-between text-sm text-green-600">
                          <dt>Amount Paid:</dt>
                          <dd className="font-medium">${invoice.amountPaid.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-red-600">
                          <dt>Amount Due:</dt>
                          <dd>${invoice.amountDue.toLocaleString()}</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>

              {/* Notes */}
              {(invoice.notes || isEditingNotes) && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
                  {isEditingNotes ? (
                    <div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={handleNotesUpdate}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNotes(invoice.notes || '');
                            setIsEditingNotes(false);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      {invoice.notes || 'No notes added.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Payment Actions */}
          {invoice.status !== 'Paid' && invoice.status !== 'Cancelled' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Actions</h2>
              
              {invoice.status === 'Draft' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleStatusUpdate('Sent')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                    Send Invoice
                  </button>
                </div>
              )}

              {(invoice.status === 'Sent' || invoice.status === 'Overdue') && (
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStatusUpdate('Paid')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      <BanknotesIcon className="h-4 w-4 mr-2" />
                      Mark as Paid
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      Send Reminder
                    </button>
                  </div>
                  
                  {invoice.status === 'Overdue' && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-red-800">Payment Overdue</span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">
                        This invoice is {getDaysOverdue()} days past due. Consider following up with the customer.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Notes Section */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Internal Notes</h2>
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
                  placeholder="Add internal notes about this invoice..."
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
                      setNotes(invoice.notes || '');
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
                {invoice.notes || 'No internal notes added yet.'}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Invoice Summary */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Customer</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {invoice.customerName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {invoice.issueDate}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                <dd className={`mt-1 flex items-center text-sm ${isOverdue() ? 'text-red-600' : 'text-gray-900'}`}>
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {invoice.dueDate}
                </dd>
              </div>
              {invoice.paidDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Paid Date</dt>
                  <dd className="mt-1 flex items-center text-sm text-green-600">
                    <CheckCircleIcon className="h-4 w-4 mr-2 text-green-400" />
                    {invoice.paidDate}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  ${invoice.total.toLocaleString()}
                </dd>
              </div>
              {invoice.jobId && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Related Job</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <DocumentTextIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {invoice.jobId}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                  {invoice.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-sm font-medium text-gray-900">${invoice.total.toLocaleString()}</span>
              </div>
              {invoice.amountPaid > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Paid</span>
                  <span className="text-sm font-medium text-green-600">${invoice.amountPaid.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-900">Amount Due</span>
                <span className={`text-sm font-bold ${invoice.amountDue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${invoice.amountDue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Duplicate Invoice
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <UserIcon className="h-4 w-4 mr-2" />
                View Customer
              </button>
              {invoice.jobId && (
                <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  View Related Job
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}