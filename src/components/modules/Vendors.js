'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  XMarkIcon,
  TruckIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import VendorDetail from '../details/VendorDetail';

const mockVendors = [
  {
    id: 1,
    name: 'ElectriCorp Supply',
    contactName: 'John Martinez',
    email: 'orders@electricorp.com',
    phone: '(555) 234-5678',
    address: '1234 Industrial Blvd, Tech City, ST 12345',
    category: 'Electrical',
    status: 'Active',
    paymentTerms: 'Net 30',
    taxId: '12-3456789',
    totalPurchases: 45680,
    lastOrder: '2024-01-10',
    items: ['Wire & Cable', 'Outlets & Switches', 'Circuit Breakers', 'Conduit'],
    notes: 'Primary electrical supplier. Good pricing and reliable delivery.',
  },
  {
    id: 2,
    name: 'PlumbPro Supplies',
    contactName: 'Sarah Johnson',
    email: 'sales@plumbpro.com',
    phone: '(555) 876-5432',
    address: '5678 Commerce St, Water Valley, ST 67890',
    category: 'Plumbing',
    status: 'Active',
    paymentTerms: 'Net 15',
    taxId: '98-7654321',
    totalPurchases: 28340,
    lastOrder: '2024-01-08',
    items: ['PVC Pipe', 'Fittings', 'Valves', 'Water Heaters'],
    notes: 'Excellent customer service. Fast shipping on emergency orders.',
  },
  {
    id: 3,
    name: 'HVAC Distributors Inc',
    contactName: 'Mike Chen',
    email: 'procurement@hvacdist.com',
    phone: '(555) 345-6789',
    address: '9876 Airport Road, Cool Springs, ST 54321',
    category: 'HVAC',
    status: 'Active',
    paymentTerms: 'Net 45',
    taxId: '55-9988776',
    totalPurchases: 125750,
    lastOrder: '2024-01-05',
    items: ['HVAC Units', 'Ductwork', 'Thermostats', 'Refrigerants'],
    notes: 'Bulk pricing available. Requires advance notice for large orders.',
  },
  {
    id: 4,
    name: 'Hardware Plus',
    contactName: 'Lisa Brown',
    email: 'info@hardwareplus.com',
    phone: '(555) 987-6543',
    address: '2468 Main Street, Builder Town, ST 98765',
    category: 'Hardware',
    status: 'Active',
    paymentTerms: 'Net 30',
    taxId: '33-4455667',
    totalPurchases: 15230,
    lastOrder: '2024-01-12',
    items: ['Screws & Fasteners', 'Hand Tools', 'Safety Equipment', 'Adhesives'],
    notes: 'Local supplier with competitive prices on small hardware items.',
  },
  {
    id: 5,
    name: 'BuildCorp Materials',
    contactName: 'Robert Wilson',
    email: 'orders@buildcorp.com',
    phone: '(555) 456-7890',
    address: '1357 Construction Ave, Material City, ST 13579',
    category: 'General',
    status: 'Inactive',
    paymentTerms: 'COD',
    taxId: '77-1122334',
    totalPurchases: 8750,
    lastOrder: '2023-11-15',
    items: ['Lumber', 'Concrete', 'Roofing Materials', 'Insulation'],
    notes: 'Previous supplier. Switched due to delivery issues.',
  },
];

const mockPurchaseOrders = [
  {
    id: 'PO-2024-001',
    vendorId: 1,
    vendorName: 'ElectriCorp Supply',
    date: '2024-01-10',
    status: 'Delivered',
    total: 2850,
    items: ['12 AWG Wire - 500ft (20 units)', 'Standard Outlets (50 units)'],
  },
  {
    id: 'PO-2024-002',
    vendorId: 3,
    vendorName: 'HVAC Distributors Inc',
    date: '2024-01-05',
    status: 'Delivered',
    total: 8550,
    items: ['Commercial HVAC Unit (3 units)'],
  },
  {
    id: 'PO-2024-003',
    vendorId: 2,
    vendorName: 'PlumbPro Supplies',
    date: '2024-01-08',
    status: 'Pending',
    total: 1280,
    items: ['4" PVC Pipe (25 units)', 'Ball Valves (10 units)'],
  },
];

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  Suspended: 'bg-red-100 text-red-800',
};

const categories = ['All', 'Electrical', 'Plumbing', 'HVAC', 'Hardware', 'General'];

export default function Vendors() {
  const [vendors, setVendors] = useState(mockVendors);
  const [purchaseOrders, setPurchaseOrders] = useState(mockPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('vendors');
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    category: 'General',
    status: 'Active',
    paymentTerms: 'Net 30',
    taxId: '',
    items: '',
    notes: '',
  });

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || vendor.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || vendor.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeVendors = vendors.filter(v => v.status === 'Active').length;
  const totalSpend = vendors.reduce((sum, vendor) => sum + vendor.totalPurchases, 0);
  const recentOrders = purchaseOrders.length;

  const openModal = (vendor = null) => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        contactName: vendor.contactName,
        email: vendor.email,
        phone: vendor.phone,
        address: vendor.address,
        category: vendor.category,
        status: vendor.status,
        paymentTerms: vendor.paymentTerms,
        taxId: vendor.taxId,
        items: vendor.items.join(', '),
        notes: vendor.notes,
      });
      setIsEditing(true);
      setSelectedVendor(vendor);
    } else {
      setFormData({
        name: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        category: 'General',
        status: 'Active',
        paymentTerms: 'Net 30',
        taxId: '',
        items: '',
        notes: '',
      });
      setIsEditing(false);
      setSelectedVendor(null);
    }
    setIsModalOpen(true);
  };

  const openViewModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsViewModalOpen(true);
  };

  const openVendorDetail = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetail(true);
  };

  const closeVendorDetail = () => {
    setShowDetail(false);
    setSelectedVendor(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedVendor(null);
    setIsEditing(false);
  };

  const handleVendorUpdate = (updatedVendor) => {
    setVendors(vendors.map(vendor => 
      vendor.id === updatedVendor.id ? updatedVendor : vendor
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setVendors(vendors.map(vendor =>
        vendor.id === selectedVendor.id
          ? { 
              ...vendor, 
              ...formData,
              items: formData.items.split(',').map(item => item.trim()),
            }
          : vendor
      ));
    } else {
      const newVendor = {
        ...formData,
        id: Math.max(...vendors.map(v => v.id)) + 1,
        totalPurchases: 0,
        lastOrder: null,
        items: formData.items.split(',').map(item => item.trim()),
      };
      setVendors([...vendors, newVendor]);
    }
    closeModal();
  };

  const handleDelete = (vendorId) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(vendor => vendor.id !== vendorId));
    }
  };

  // Show detail view if a vendor is selected
  if (showDetail && selectedVendor) {
    return (
      <VendorDetail 
        vendor={selectedVendor} 
        onBack={closeVendorDetail}
        onUpdate={handleVendorUpdate}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vendors</h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage supplier relationships and purchase orders
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'vendors'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Vendors
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Purchase Orders
          </button>
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TruckIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TruckIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{activeVendors}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900">${totalSpend.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recent Orders</p>
              <p className="text-2xl font-bold text-gray-900">{recentOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'vendors' && (
        <>
          {/* Search and Filters */}
          <div className="mb-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Purchases
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div 
                          className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() => openVendorDetail(vendor)}
                        >
                          {vendor.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {vendor.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{vendor.contactName}</div>
                        <div className="flex items-center mt-1">
                          <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-gray-500">{vendor.email}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-gray-500">{vendor.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {vendor.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[vendor.status]}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${vendor.totalPurchases.toLocaleString()}
                      </div>
                      {vendor.lastOrder && (
                        <div className="text-sm text-gray-500">
                          Last: {vendor.lastOrder}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openViewModal(vendor)}
                          className="text-gray-600 hover:text-gray-900"
                          title="View"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openModal(vendor)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vendor.id)}
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
        </>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PO Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchaseOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.vendorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.total.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.map((item, index) => (
                        <div key={index}>{item}</div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {isEditing ? 'Edit Vendor' : 'Add New Vendor'}
                    </h3>
                    <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                      <select
                        value={formData.paymentTerms}
                        onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="COD">COD</option>
                        <option value="Net 15">Net 15</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Net 45">Net 45</option>
                        <option value="Net 60">Net 60</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                    <input
                      type="text"
                      value={formData.taxId}
                      onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Items/Services (comma separated)</label>
                    <textarea
                      value={formData.items}
                      onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                      rows={3}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Wire & Cable, Outlets & Switches, Circuit Breakers"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
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

      {/* View Modal */}
      {isViewModalOpen && selectedVendor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Vendor Details</h3>
                  <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Company Information</h4>
                      <dl className="space-y-2 text-sm">
                        <div>
                          <dt className="text-gray-600">Name:</dt>
                          <dd className="font-medium">{selectedVendor.name}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-600">Category:</dt>
                          <dd className="font-medium">{selectedVendor.category}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-600">Status:</dt>
                          <dd className="font-medium">{selectedVendor.status}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-600">Tax ID:</dt>
                          <dd className="font-medium">{selectedVendor.taxId}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <dl className="space-y-2 text-sm">
                        <div>
                          <dt className="text-gray-600">Contact:</dt>
                          <dd className="font-medium">{selectedVendor.contactName}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-600">Email:</dt>
                          <dd className="font-medium">{selectedVendor.email}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-600">Phone:</dt>
                          <dd className="font-medium">{selectedVendor.phone}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-600">Payment Terms:</dt>
                          <dd className="font-medium">{selectedVendor.paymentTerms}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-sm text-gray-700">{selectedVendor.address}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Items/Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVendor.items.map((item, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Purchase History</h4>
                    <dl className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="text-gray-600">Total Purchases:</dt>
                        <dd className="font-medium">${selectedVendor.totalPurchases.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600">Last Order:</dt>
                        <dd className="font-medium">{selectedVendor.lastOrder || 'No orders yet'}</dd>
                      </div>
                    </dl>
                  </div>

                  {selectedVendor.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-700">{selectedVendor.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}