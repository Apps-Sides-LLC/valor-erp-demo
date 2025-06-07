'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentArrowUpIcon,
  CubeIcon,
  TruckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import InventoryDetail from '../details/InventoryDetail';

const mockInventoryItems = [
  {
    id: 1,
    sku: 'WIRE-12G-500',
    name: '12 AWG Wire - 500ft Roll',
    category: 'Electrical',
    currentStock: 2,
    minimumStock: 10,
    maximumStock: 50,
    unitCost: 125.50,
    sellingPrice: 187.75,
    vendor: 'ElectriCorp Supply',
    location: 'Warehouse A-2',
    lastUpdated: '2024-01-10',
    movements: [
      { date: '2024-01-15', type: 'out', quantity: 5, jobId: 'J-2024-002', notes: 'Office renovation project' },
      { date: '2024-01-10', type: 'in', quantity: 20, poNumber: 'PO-2024-005', notes: 'Regular stock replenishment' },
    ],
  },
  {
    id: 2,
    sku: 'PIPE-PVC-4IN',
    name: '4 Inch PVC Pipe - 10ft',
    category: 'Plumbing',
    currentStock: 5,
    minimumStock: 15,
    maximumStock: 100,
    unitCost: 18.25,
    sellingPrice: 29.20,
    vendor: 'PlumbPro Supplies',
    location: 'Warehouse B-1',
    lastUpdated: '2024-01-12',
    movements: [
      { date: '2024-01-12', type: 'out', quantity: 8, jobId: 'J-2024-001', notes: 'HVAC ductwork installation' },
    ],
  },
  {
    id: 3,
    sku: 'SCREW-DW-2IN',
    name: '2 Inch Drywall Screws (100pk)',
    category: 'Hardware',
    currentStock: 1,
    minimumStock: 20,
    maximumStock: 200,
    unitCost: 8.50,
    sellingPrice: 12.75,
    vendor: 'Hardware Plus',
    location: 'Warehouse A-1',
    lastUpdated: '2024-01-08',
    movements: [
      { date: '2024-01-08', type: 'out', quantity: 15, jobId: 'J-2024-003', notes: 'Kitchen remodel drywall work' },
    ],
  },
  {
    id: 4,
    sku: 'HVAC-UNIT-001',
    name: 'Commercial HVAC Unit 5-Ton',
    category: 'HVAC',
    currentStock: 3,
    minimumStock: 2,
    maximumStock: 8,
    unitCost: 2850.00,
    sellingPrice: 4275.00,
    vendor: 'HVAC Distributors Inc',
    location: 'Warehouse C-1',
    lastUpdated: '2024-01-15',
    movements: [
      { date: '2024-01-15', type: 'out', quantity: 2, jobId: 'J-2024-001', notes: 'Hotel HVAC upgrade' },
      { date: '2024-01-05', type: 'in', quantity: 3, poNumber: 'PO-2024-003', notes: 'Quarterly HVAC stock order' },
    ],
  },
  {
    id: 5,
    sku: 'OUTLET-STD',
    name: 'Standard Electrical Outlet',
    category: 'Electrical',
    currentStock: 45,
    minimumStock: 25,
    maximumStock: 200,
    unitCost: 3.25,
    sellingPrice: 5.95,
    vendor: 'ElectriCorp Supply',
    location: 'Warehouse A-3',
    lastUpdated: '2024-01-14',
    movements: [
      { date: '2024-01-14', type: 'in', quantity: 50, poNumber: 'PO-2024-006', notes: 'Bulk electrical supplies order' },
    ],
  },
];

const categories = ['All', 'Electrical', 'Plumbing', 'HVAC', 'Hardware'];

const vendors = [
  'ElectriCorp Supply',
  'PlumbPro Supplies',
  'Hardware Plus',
  'HVAC Distributors Inc',
  'BuildCorp Materials',
];

export default function Inventory() {
  const [inventory, setInventory] = useState(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Electrical',
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    unitCost: 0,
    sellingPrice: 0,
    vendor: '',
    location: '',
  });
  const [movementData, setMovementData] = useState({
    type: 'in',
    quantity: 0,
    notes: '',
    jobId: '',
    poNumber: '',
  });

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStock = stockFilter === 'All' ||
                        (stockFilter === 'Low' && item.currentStock <= item.minimumStock) ||
                        (stockFilter === 'Normal' && item.currentStock > item.minimumStock);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minimumStock);
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);
  const totalItems = inventory.reduce((sum, item) => sum + item.currentStock, 0);

  const openModal = (item = null) => {
    if (item) {
      setFormData({
        sku: item.sku,
        name: item.name,
        category: item.category,
        currentStock: item.currentStock,
        minimumStock: item.minimumStock,
        maximumStock: item.maximumStock,
        unitCost: item.unitCost,
        sellingPrice: item.sellingPrice,
        vendor: item.vendor,
        location: item.location,
      });
      setIsEditing(true);
      setSelectedItem(item);
    } else {
      setFormData({
        sku: '',
        name: '',
        category: 'Electrical',
        currentStock: 0,
        minimumStock: 0,
        maximumStock: 0,
        unitCost: 0,
        sellingPrice: 0,
        vendor: '',
        location: '',
      });
      setIsEditing(false);
      setSelectedItem(null);
    }
    setIsModalOpen(true);
  };

  const openMovementModal = (item) => {
    setSelectedItem(item);
    setMovementData({
      type: 'in',
      quantity: 0,
      notes: '',
      jobId: '',
      poNumber: '',
    });
    setIsMovementModalOpen(true);
  };

  const openInventoryDetail = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  const closeInventoryDetail = () => {
    setShowDetail(false);
    setSelectedItem(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsMovementModalOpen(false);
    setIsBulkImportOpen(false);
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleInventoryUpdate = (updatedItem) => {
    setInventory(inventory.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setInventory(inventory.map(item =>
        item.id === selectedItem.id
          ? { ...item, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      ));
    } else {
      const newItem = {
        ...formData,
        id: Math.max(...inventory.map(i => i.id)) + 1,
        lastUpdated: new Date().toISOString().split('T')[0],
        movements: [],
      };
      setInventory([...inventory, newItem]);
    }
    closeModal();
  };

  const handleMovement = (e) => {
    e.preventDefault();
    const newMovement = {
      date: new Date().toISOString().split('T')[0],
      type: movementData.type,
      quantity: parseInt(movementData.quantity),
      jobId: movementData.jobId || null,
      poNumber: movementData.poNumber || null,
      notes: movementData.notes,
    };

    setInventory(inventory.map(item => {
      if (item.id === selectedItem.id) {
        const stockChange = movementData.type === 'in' ? 
          parseInt(movementData.quantity) : 
          -parseInt(movementData.quantity);
        
        return {
          ...item,
          currentStock: Math.max(0, item.currentStock + stockChange),
          movements: [newMovement, ...item.movements],
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return item;
    }));

    closeModal();
  };

  const handleDelete = (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== itemId));
    }
  };

  const getStockStatus = (item) => {
    if (item.currentStock <= item.minimumStock) {
      return { label: 'Low Stock', color: 'bg-red-100 text-red-800' };
    } else if (item.currentStock >= item.maximumStock * 0.8) {
      return { label: 'High Stock', color: 'bg-blue-100 text-blue-800' };
    }
    return { label: 'Normal', color: 'bg-green-100 text-green-800' };
  };

  // Show detail view if an item is selected
  if (showDetail && selectedItem) {
    return (
      <InventoryDetail 
        item={selectedItem} 
        onBack={closeInventoryDetail}
        onUpdate={handleInventoryUpdate}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="mt-2 text-lg text-gray-600">
              Track stock levels, products, and inventory movements
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsBulkImportOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <DocumentArrowUpIcon className="h-4 w-4 mr-2" />
              Bulk Import
            </button>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CubeIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TruckIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">SKUs</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CubeIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
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
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Stock</option>
            <option value="Low">Low Stock</option>
            <option value="Normal">Normal Stock</option>
          </select>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
            <h3 className="text-sm font-medium text-red-800">
              {lowStockItems.length} item(s) are running low on stock
            </h3>
          </div>
          <div className="mt-2 text-sm text-red-700">
            {lowStockItems.slice(0, 3).map(item => item.name).join(', ')}
            {lowStockItems.length > 3 && ` and ${lowStockItems.length - 3} more...`}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => {
              const status = getStockStatus(item);
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div 
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => openInventoryDetail(item)}
                      >
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.sku} • {item.category}</div>
                      <div className="text-xs text-gray-400">{item.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">{item.currentStock}</span> on hand
                    </div>
                    <div className="text-xs text-gray-500">
                      Min: {item.minimumStock} • Max: {item.maximumStock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Cost: ${item.unitCost.toFixed(2)}
                    </div>
                    <div className="text-sm text-green-600">
                      Sell: ${item.sellingPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Margin: {(((item.sellingPrice - item.unitCost) / item.sellingPrice) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openMovementModal(item)}
                        className="text-green-600 hover:text-green-900"
                        title="Stock Movement"
                      >
                        <ArrowUpIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal(item)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <div className="relative bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
                <div className="px-8 pt-8 pb-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Item' : 'Add New Item'}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {isEditing ? 'Update inventory item details' : 'Add a new item to your inventory'}
                      </p>
                    </div>
                    <button 
                      type="button" 
                      onClick={closeModal} 
                      className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Basic Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">SKU *</label>
                          <input
                            type="text"
                            required
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter SKU code"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Category</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select category</option>
                            {categories.slice(1).map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Item Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter item name"
                      />
                    </div>

                    {/* Stock Information */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Stock Management
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Current Stock *</label>
                          <input
                            type="number"
                            min="0"
                            required
                            value={formData.currentStock}
                            onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Minimum Stock *</label>
                          <input
                            type="number"
                            min="0"
                            required
                            value={formData.minimumStock}
                            onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Maximum Stock *</label>
                          <input
                            type="number"
                            min="0"
                            required
                            value={formData.maximumStock}
                            onChange={(e) => setFormData({ ...formData, maximumStock: parseInt(e.target.value) || 0 })}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pricing Information */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Pricing & Costs
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Unit Cost *</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              required
                              value={formData.unitCost}
                              onChange={(e) => setFormData({ ...formData, unitCost: parseFloat(e.target.value) || 0 })}
                              className="block w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Selling Price *</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              required
                              value={formData.sellingPrice}
                              onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
                              className="block w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="0.00"
                            />
                          </div>
                          {formData.unitCost > 0 && formData.sellingPrice > 0 && (
                            <p className="text-xs text-gray-600">
                              Margin: ${(formData.sellingPrice - formData.unitCost).toFixed(2)} 
                              ({(((formData.sellingPrice - formData.unitCost) / formData.sellingPrice) * 100).toFixed(1)}%)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Additional Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Vendor</label>
                          <select
                            value={formData.vendor}
                            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select vendor</option>
                            {vendors.map(vendor => (
                              <option key={vendor} value={vendor}>{vendor}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Storage Location</label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Warehouse A, Shelf 1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                  >
                    {isEditing ? 'Update Item' : 'Create Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Stock Movement Modal */}
      {isMovementModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleMovement}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Stock Movement</h3>
                    <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Item: <span className="font-medium">{selectedItem.name}</span></p>
                    <p className="text-sm text-gray-600">Current Stock: <span className="font-medium">{selectedItem.currentStock}</span></p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Movement Type</label>
                      <select
                        value={movementData.type}
                        onChange={(e) => setMovementData({ ...movementData, type: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="in">Stock In</option>
                        <option value="out">Stock Out</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={movementData.quantity}
                        onChange={(e) => setMovementData({ ...movementData, quantity: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {movementData.type === 'out' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job ID (Optional)</label>
                        <input
                          type="text"
                          value={movementData.jobId}
                          onChange={(e) => setMovementData({ ...movementData, jobId: e.target.value })}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PO Number (Optional)</label>
                        <input
                          type="text"
                          value={movementData.poNumber}
                          onChange={(e) => setMovementData({ ...movementData, poNumber: e.target.value })}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={movementData.notes}
                        onChange={(e) => setMovementData({ ...movementData, notes: e.target.value })}
                        rows={3}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Record Movement
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

      {/* Bulk Import Modal */}
      {isBulkImportOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Bulk Import Inventory</h3>
                  <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-center py-12">
                  <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Upload CSV File</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a CSV file with columns: SKU, Name, Category, Stock, Min Stock, Max Stock, Unit Cost, Selling Price, Vendor, Location
                  </p>
                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <DocumentArrowUpIcon className="h-4 w-4 mr-2" />
                      Choose File
                    </button>
                  </div>
                  <div className="mt-4">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                      Download CSV Template
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}