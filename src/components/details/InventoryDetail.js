'use client';

import { useState } from 'react';
import {
  ArrowLeftIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CubeIcon,
  MapPinIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PencilIcon,
  PlusIcon,
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const categoryColors = {
  'Electrical': 'bg-blue-100 text-blue-800',
  'Plumbing': 'bg-green-100 text-green-800',
  'HVAC': 'bg-purple-100 text-purple-800',
  'Hardware': 'bg-orange-100 text-orange-800',
  'Tools': 'bg-red-100 text-red-800',
  'Safety': 'bg-yellow-100 text-yellow-800',
};

export default function InventoryDetail({ item, onBack, onUpdate }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(item?.notes || '');
  const [activeTab, setActiveTab] = useState('overview');
  const [adjustmentQuantity, setAdjustmentQuantity] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState('');

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Item not found</h2>
          <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700">
            ← Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  const getStockStatus = () => {
    if (item.currentStock <= item.minimumStock) {
      return { status: 'Low Stock', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' };
    } else if (item.currentStock >= item.maximumStock * 0.8) {
      return { status: 'Well Stocked', color: 'text-green-600', bgColor: 'bg-green-50 border-green-200' };
    } else {
      return { status: 'Normal', color: 'text-yellow-600', bgColor: 'bg-yellow-50 border-yellow-200' };
    }
  };

  const stockStatus = getStockStatus();
  const stockPercentage = Math.min(100, (item.currentStock / item.maximumStock) * 100);
  const profitMargin = ((item.sellingPrice - item.unitCost) / item.sellingPrice * 100).toFixed(1);

  const handleStockAdjustment = (type) => {
    if (adjustmentQuantity > 0 && adjustmentReason.trim()) {
      const newStock = type === 'add' 
        ? item.currentStock + adjustmentQuantity 
        : Math.max(0, item.currentStock - adjustmentQuantity);
      
      const updatedItem = {
        ...item,
        currentStock: newStock,
        lastUpdated: new Date().toISOString().split('T')[0],
        movements: [
          {
            date: new Date().toISOString().split('T')[0],
            type: type === 'add' ? 'in' : 'out',
            quantity: adjustmentQuantity,
            notes: adjustmentReason
          },
          ...(item.movements || [])
        ]
      };
      
      if (onUpdate) {
        onUpdate(updatedItem);
      }
      
      setAdjustmentQuantity(0);
      setAdjustmentReason('');
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
          Back to Inventory
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
            <p className="text-lg text-gray-600 mt-1">{item.sku}</p>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-800'}`}>
                {item.category}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${stockStatus.bgColor} ${stockStatus.color}`}>
                {stockStatus.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{item.currentStock}</div>
            <div className="text-sm text-gray-500">units in stock</div>
            <div className="text-sm text-gray-400 mt-1">Last updated: {item.lastUpdated}</div>
          </div>
        </div>
      </div>

      {/* Stock Level Alert */}
      {item.currentStock <= item.minimumStock && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Low Stock Alert</h3>
              <p className="text-sm text-red-700 mt-1">
                Current stock ({item.currentStock}) is at or below minimum level ({item.minimumStock}). Consider reordering soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: CubeIcon },
            { id: 'movements', label: 'Stock Movements', icon: ArrowUpIcon },
            { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
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
              {/* Stock Information */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h2>
                
                {/* Stock Level Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Current Stock Level</span>
                    <span className="font-medium">{item.currentStock} / {item.maximumStock} units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        stockPercentage <= 20 ? 'bg-red-500' :
                        stockPercentage <= 50 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${stockPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Min: {item.minimumStock}</span>
                    <span>Max: {item.maximumStock}</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{item.currentStock}</div>
                    <div className="text-sm text-gray-600">Current Stock</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{item.minimumStock}</div>
                    <div className="text-sm text-gray-600">Minimum Level</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{item.maximumStock}</div>
                    <div className="text-sm text-gray-600">Maximum Level</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{profitMargin}%</div>
                    <div className="text-sm text-gray-600">Profit Margin</div>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Cost</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Unit Cost</dt>
                    <dd className="text-2xl font-bold text-gray-900">${item.unitCost.toFixed(2)}</dd>
                    <div className="text-sm text-gray-500 mt-1">Cost per unit</div>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Selling Price</dt>
                    <dd className="text-2xl font-bold text-green-600">${item.sellingPrice.toFixed(2)}</dd>
                    <div className="text-sm text-gray-500 mt-1">Price per unit</div>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Total Value</dt>
                    <dd className="text-2xl font-bold text-blue-600">${(item.currentStock * item.unitCost).toFixed(2)}</dd>
                    <div className="text-sm text-gray-500 mt-1">Current inventory value</div>
                  </div>
                </div>
              </div>

              {/* Quick Stock Adjustment */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Stock Adjustment</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={adjustmentQuantity}
                        onChange={(e) => setAdjustmentQuantity(parseInt(e.target.value) || 0)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter quantity"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                      <input
                        type="text"
                        value={adjustmentReason}
                        onChange={(e) => setAdjustmentReason(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Reason for adjustment"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStockAdjustment('add')}
                      disabled={!adjustmentQuantity || !adjustmentReason.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Stock
                    </button>
                    <button
                      onClick={() => handleStockAdjustment('remove')}
                      disabled={!adjustmentQuantity || !adjustmentReason.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <MinusIcon className="h-4 w-4 mr-2" />
                      Remove Stock
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'movements' && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Stock Movements</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Type</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">Quantity</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Reference</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {item.movements?.map((movement, index) => (
                      <tr key={index}>
                        <td className="py-3 text-sm text-gray-900">{movement.date}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            movement.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {movement.type === 'in' ? (
                              <ArrowUpIcon className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownIcon className="h-3 w-3 mr-1" />
                            )}
                            {movement.type === 'in' ? 'Stock In' : 'Stock Out'}
                          </span>
                        </td>
                        <td className="text-right py-3 text-sm font-medium text-gray-900">{movement.quantity}</td>
                        <td className="py-3 text-sm text-gray-600">
                          {movement.jobId || movement.poNumber || '-'}
                        </td>
                        <td className="py-3 text-sm text-gray-600">{movement.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!item.movements || item.movements.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No stock movements recorded yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Usage Analytics */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BanknotesIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">${(item.currentStock * item.sellingPrice).toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Potential Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{item.movements?.length || 0}</div>
                    <div className="text-sm text-gray-600">Total Movements</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircleIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {Math.floor((item.currentStock / item.minimumStock) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Stock Health</div>
                  </div>
                </div>
              </div>

              {/* Reorder Recommendations */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Reorder Recommendations</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Recommended Order Quantity</div>
                      <div className="text-sm text-gray-600">Based on current usage patterns</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {item.maximumStock - item.currentStock} units
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Estimated Cost</div>
                      <div className="text-sm text-gray-600">Total cost to reach maximum stock</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${((item.maximumStock - item.currentStock) * item.unitCost).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Item Details */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">SKU</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <DocumentTextIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {item.sku}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CubeIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {item.category}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {item.location}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Vendor</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <TruckIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {item.vendor}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {item.lastUpdated}
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <TruckIcon className="h-4 w-4 mr-2" />
                Create Purchase Order
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                View Vendor Details
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Usage Report
              </button>
              <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <CubeIcon className="h-4 w-4 mr-2" />
                Transfer Location
              </button>
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Alerts</h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg border ${stockStatus.bgColor}`}>
                <div className="flex items-center">
                  {item.currentStock <= item.minimumStock ? (
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                  ) : (
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                  )}
                  <span className={`text-sm font-medium ${stockStatus.color}`}>
                    {stockStatus.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {item.currentStock <= item.minimumStock 
                    ? 'Stock level is below minimum threshold'
                    : 'Stock levels are within normal range'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Unit Cost</dt>
                <dd className="text-sm font-medium text-gray-900">${item.unitCost.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Selling Price</dt>
                <dd className="text-sm font-medium text-gray-900">${item.sellingPrice.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Profit per Unit</dt>
                <dd className="text-sm font-medium text-green-600">${(item.sellingPrice - item.unitCost).toFixed(2)}</dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <dt className="text-sm font-medium text-gray-900">Total Value</dt>
                <dd className="text-sm font-bold text-gray-900">${(item.currentStock * item.unitCost).toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}