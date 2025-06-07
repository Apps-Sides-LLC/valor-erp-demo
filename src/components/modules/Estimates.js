'use client';

import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PaperAirplaneIcon,
  DocumentDuplicateIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import EstimateDetail from '../details/EstimateDetail';
import { useUI } from '@/context/ui-context';

const mockEstimates = [
  {
    id: 'EST-2024-001',
    customerId: 1,
    customerName: 'ABC Construction LLC',
    title: 'Office Renovation Project',
    description: 'Complete office renovation including electrical, plumbing, and HVAC work',
    status: 'Draft',
    total: 15400,
    tax: 1232,
    grandTotal: 16632,
    validUntil: '2024-02-15',
    createdDate: '2024-01-15',
    sentDate: null,
    acceptedDate: null,
    items: [
      { id: 1, description: 'Electrical rewiring', quantity: 1, unit: 'lot', unitPrice: 8500, total: 8500 },
      { id: 2, description: 'HVAC system upgrade', quantity: 1, unit: 'lot', unitPrice: 5200, total: 5200 },
      { id: 3, description: 'Plumbing fixtures', quantity: 8, unit: 'ea', unitPrice: 212.5, total: 1700 },
    ],
  },
  {
    id: 'EST-2024-002',
    customerId: 2,
    customerName: 'Smith Residence',
    title: 'Kitchen Remodel Estimate',
    description: 'Full kitchen renovation with new appliances and fixtures',
    status: 'Sent',
    total: 8200,
    tax: 656,
    grandTotal: 8856,
    validUntil: '2024-02-20',
    createdDate: '2024-01-12',
    sentDate: '2024-01-13',
    acceptedDate: null,
    items: [
      { id: 1, description: 'Kitchen cabinets', quantity: 1, unit: 'set', unitPrice: 4500, total: 4500 },
      { id: 2, description: 'Countertop installation', quantity: 25, unit: 'sqft', unitPrice: 95, total: 2375 },
      { id: 3, description: 'Electrical work', quantity: 1, unit: 'lot', unitPrice: 1325, total: 1325 },
    ],
  },
  {
    id: 'EST-2024-003',
    customerId: 3,
    customerName: 'Downtown Hotel Group',
    title: 'HVAC System Upgrade',
    description: 'Commercial HVAC system replacement and ductwork',
    status: 'Accepted',
    total: 32100,
    tax: 2568,
    grandTotal: 34668,
    validUntil: '2024-02-01',
    createdDate: '2024-01-05',
    sentDate: '2024-01-06',
    acceptedDate: '2024-01-08',
    items: [
      { id: 1, description: 'Commercial HVAC units', quantity: 3, unit: 'ea', unitPrice: 8500, total: 25500 },
      { id: 2, description: 'Ductwork installation', quantity: 200, unit: 'ft', unitPrice: 33, total: 6600 },
    ],
  },
];

const statusColors = {
  Draft: 'bg-gray-100 text-gray-800',
  Sent: 'bg-blue-100 text-blue-800',
  Accepted: 'bg-green-100 text-green-800',
  Declined: 'bg-red-100 text-red-800',
  Expired: 'bg-orange-100 text-orange-800',
};

const mockCustomers = [
  { id: 1, name: 'ABC Construction LLC' },
  { id: 2, name: 'Smith Residence' },
  { id: 3, name: 'Downtown Hotel Group' },
  { id: 4, name: 'Johnson Family' },
];

export default function Estimates() {
  const { setActiveSection, shouldOpenEstimateModal, setShouldOpenEstimateModal } = useUI();
  const [estimates, setEstimates] = useState(mockEstimates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    title: '',
    description: '',
    validUntil: '',
    items: [{ id: 1, description: '', quantity: 1, unit: 'ea', unitPrice: 0, total: 0 }],
  });

  const filteredEstimates = estimates.filter(estimate =>
    estimate.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if we should open the modal from external trigger (e.g., Dashboard)
  useEffect(() => {
    if (shouldOpenEstimateModal) {
      setFormData({
        customerId: '',
        customerName: '',
        title: '',
        description: '',
        validUntil: '',
        items: [{ id: 1, description: '', quantity: 1, unit: 'ea', unitPrice: 0, total: 0 }],
      });
      setIsEditing(false);
      setSelectedEstimate(null);
      setIsModalOpen(true);
      setShouldOpenEstimateModal(false);
    }
  }, [shouldOpenEstimateModal, setShouldOpenEstimateModal]);

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.08; // 8% tax
    const grandTotal = subtotal + tax;
    return { subtotal, tax, grandTotal };
  };

  const openModal = (estimate = null) => {
    if (estimate) {
      setFormData({
        customerId: estimate.customerId,
        customerName: estimate.customerName,
        title: estimate.title,
        description: estimate.description,
        validUntil: estimate.validUntil,
        items: estimate.items,
      });
      setIsEditing(true);
      setSelectedEstimate(estimate);
    } else {
      setFormData({
        customerId: '',
        customerName: '',
        title: '',
        description: '',
        validUntil: '',
        items: [{ id: 1, description: '', quantity: 1, unit: 'ea', unitPrice: 0, total: 0 }],
      });
      setIsEditing(false);
      setSelectedEstimate(null);
    }
    setIsModalOpen(true);
  };

  const openEstimateDetail = (estimate) => {
    setSelectedEstimate(estimate);
    setShowDetail(true);
  };

  const closeEstimateDetail = () => {
    setShowDetail(false);
    setSelectedEstimate(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEstimate(null);
    setIsEditing(false);
  };

  const handleEstimateUpdate = (updatedEstimate) => {
    setEstimates(estimates.map(estimate => 
      estimate.id === updatedEstimate.id ? updatedEstimate : estimate
    ));
  };

  const handleCreateJob = (estimate) => {
    // In a real application, this would create a new job from the estimate
    console.log('Creating job from estimate:', estimate);
    
    // Navigate to Jobs section
    setActiveSection('Jobs');
    
    // Close the detail view
    closeEstimateDetail();
  };

  const addItem = () => {
    const newId = Math.max(...formData.items.map(item => item.id)) + 1;
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, description: '', quantity: 1, unit: 'ea', unitPrice: 0, total: 0 }],
    });
  };

  const removeItem = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId),
    });
  };

  const updateItem = (itemId, field, value) => {
    const updatedItems = formData.items.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    });
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subtotal, tax, grandTotal } = calculateTotals(formData.items);
    
    if (isEditing) {
      setEstimates(estimates.map(estimate =>
        estimate.id === selectedEstimate.id
          ? { 
              ...estimate, 
              ...formData,
              total: subtotal,
              tax,
              grandTotal,
            }
          : estimate
      ));
    } else {
      const newEstimate = {
        ...formData,
        id: `EST-2024-${String(estimates.length + 1).padStart(3, '0')}`,
        status: 'Draft',
        total: subtotal,
        tax,
        grandTotal,
        createdDate: new Date().toISOString().split('T')[0],
        sentDate: null,
        acceptedDate: null,
      };
      setEstimates([...estimates, newEstimate]);
    }
    closeModal();
  };

  const handleSendEstimate = (estimateId) => {
    setEstimates(estimates.map(estimate =>
      estimate.id === estimateId
        ? { ...estimate, status: 'Sent', sentDate: new Date().toISOString().split('T')[0] }
        : estimate
    ));
    alert('Estimate sent via email!');
  };

  const handleDelete = (estimateId) => {
    if (window.confirm('Are you sure you want to delete this estimate?')) {
      setEstimates(estimates.filter(estimate => estimate.id !== estimateId));
    }
  };

  // Show detail view if an estimate is selected
  if (showDetail && selectedEstimate) {
    return (
      <EstimateDetail 
        estimate={selectedEstimate} 
        onBack={closeEstimateDetail}
        onUpdate={handleEstimateUpdate}
        onCreateJob={handleCreateJob}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Estimates</h1>
            <p className="mt-2 text-lg text-gray-600">
              Create and manage project estimates and quotes
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Estimate
          </button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search estimates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${estimates.reduce((sum, est) => sum + est.grandTotal, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{estimates.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estimates Table */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estimate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valid Until
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEstimates.map((estimate) => (
              <tr key={estimate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {estimate.id}
                    </div>
                    <div 
                      className="text-sm text-gray-500 cursor-pointer hover:text-blue-600"
                      onClick={() => openEstimateDetail(estimate)}
                    >
                      {estimate.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{estimate.customerName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[estimate.status]}`}>
                    {estimate.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${estimate.grandTotal.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {estimate.validUntil}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEstimateDetail(estimate)}
                      className="text-gray-600 hover:text-gray-900"
                      title="View"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openModal(estimate)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    {estimate.status === 'Draft' && (
                      <button
                        onClick={() => handleSendEstimate(estimate.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Send"
                      >
                        <PaperAirplaneIcon className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => alert('Download PDF functionality would be implemented here')}
                      className="text-purple-600 hover:text-purple-900"
                      title="Download PDF"
                    >
                      <DocumentArrowDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(estimate.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {isEditing ? 'Edit Estimate' : 'Create New Estimate'}
                    </h3>
                    <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                      <select
                        required
                        value={formData.customerId}
                        onChange={(e) => {
                          const customer = mockCustomers.find(c => c.id === parseInt(e.target.value));
                          setFormData({ 
                            ...formData, 
                            customerId: e.target.value,
                            customerName: customer ? customer.name : ''
                          });
                        }}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a customer</option>
                        {mockCustomers.map(customer => (
                          <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                      <input
                        type="date"
                        required
                        value={formData.validUntil}
                        onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-medium text-gray-900">Line Items</h4>
                      <button
                        type="button"
                        onClick={addItem}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Item
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg">
                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Description"
                              value={item.description}
                              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder="Qty"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <select
                              value={item.unit}
                              onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="ea">Each</option>
                              <option value="hr">Hour</option>
                              <option value="sqft">Sq Ft</option>
                              <option value="ft">Feet</option>
                              <option value="lot">Lot</option>
                            </select>
                          </div>
                          <div>
                            <input
                              type="number"
                              step="0.01"
                              placeholder="Price"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">${item.total.toFixed(2)}</span>
                            {formData.items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${calculateTotals(formData.items).subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (8%):</span>
                        <span>${calculateTotals(formData.items).tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                        <span>Total:</span>
                        <span>${calculateTotals(formData.items).grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isEditing ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}