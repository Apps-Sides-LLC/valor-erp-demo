"use client";

import { useState, useEffect } from "react";
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
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import EstimateDetail from "../details/EstimateDetail";
import { useUI } from "@/context/ui-context";

const mockEstimates = [
  {
    id: "EST-2024-001",
    customerId: 1,
    customerName: "ABC Construction LLC",
    title: "Office Renovation Project",
    description:
      "Complete office renovation including electrical, plumbing, and HVAC work",
    status: "Draft",
    total: 15400,
    tax: 1232,
    grandTotal: 16632,
    validUntil: "2024-02-15",
    createdDate: "2024-01-15",
    sentDate: null,
    acceptedDate: null,
    items: [
      {
        id: 1,
        description: "Electrical rewiring",
        quantity: 1,
        unit: "lot",
        unitPrice: 8500,
        total: 8500,
      },
      {
        id: 2,
        description: "HVAC system upgrade",
        quantity: 1,
        unit: "lot",
        unitPrice: 5200,
        total: 5200,
      },
      {
        id: 3,
        description: "Plumbing fixtures",
        quantity: 8,
        unit: "ea",
        unitPrice: 212.5,
        total: 1700,
      },
    ],
  },
  {
    id: "EST-2024-002",
    customerId: 2,
    customerName: "Smith Residence",
    title: "Kitchen Remodel Estimate",
    description: "Full kitchen renovation with new appliances and fixtures",
    status: "Sent",
    total: 8200,
    tax: 656,
    grandTotal: 8856,
    validUntil: "2024-02-20",
    createdDate: "2024-01-12",
    sentDate: "2024-01-13",
    acceptedDate: null,
    items: [
      {
        id: 1,
        description: "Kitchen cabinets",
        quantity: 1,
        unit: "set",
        unitPrice: 4500,
        total: 4500,
      },
      {
        id: 2,
        description: "Countertop installation",
        quantity: 25,
        unit: "sqft",
        unitPrice: 95,
        total: 2375,
      },
      {
        id: 3,
        description: "Electrical work",
        quantity: 1,
        unit: "lot",
        unitPrice: 1325,
        total: 1325,
      },
    ],
  },
  {
    id: "EST-2024-003",
    customerId: 3,
    customerName: "Downtown Hotel Group",
    title: "HVAC System Upgrade",
    description: "Commercial HVAC system replacement and ductwork",
    status: "Accepted",
    total: 32100,
    tax: 2568,
    grandTotal: 34668,
    validUntil: "2024-02-01",
    createdDate: "2024-01-05",
    sentDate: "2024-01-06",
    acceptedDate: "2024-01-08",
    items: [
      {
        id: 1,
        description: "Commercial HVAC units",
        quantity: 3,
        unit: "ea",
        unitPrice: 8500,
        total: 25500,
      },
      {
        id: 2,
        description: "Ductwork installation",
        quantity: 200,
        unit: "ft",
        unitPrice: 33,
        total: 6600,
      },
    ],
  },
];

const statusColors = {
  Draft: "bg-gray-100 text-gray-800",
  Sent: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Declined: "bg-red-100 text-red-800",
  Expired: "bg-orange-100 text-orange-800",
};

const mockCustomers = [
  { id: 1, name: "ABC Construction LLC" },
  { id: 2, name: "Smith Residence" },
  { id: 3, name: "Downtown Hotel Group" },
  { id: 4, name: "Johnson Family" },
];

export default function Estimates() {
  const {
    setActiveSection,
    shouldOpenEstimateModal,
    setShouldOpenEstimateModal,
  } = useUI();
  const [estimates, setEstimates] = useState(mockEstimates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [showNewEstimate, setShowNewEstimate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    title: "",
    description: "",
    validUntil: "",
    items: [
      {
        id: 1,
        description: "",
        quantity: 1,
        unit: "ea",
        unitPrice: 0,
        total: 0,
      },
    ],
  });

  const filteredEstimates = estimates.filter(
    (estimate) =>
      estimate.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Check if we should open the form from external trigger (e.g., Dashboard)
  useEffect(() => {
    if (shouldOpenEstimateModal) {
      setFormData({
        customerId: "",
        customerName: "",
        title: "",
        description: "",
        validUntil: "",
        items: [
          {
            id: 1,
            description: "",
            quantity: 1,
            unit: "ea",
            unitPrice: 0,
            total: 0,
          },
        ],
      });
      setIsEditing(false);
      setSelectedEstimate(null);
      setShowNewEstimate(true);
      setShouldOpenEstimateModal(false);
    }
  }, [shouldOpenEstimateModal, setShouldOpenEstimateModal]);

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.08; // 8% tax
    const grandTotal = subtotal + tax;
    return { subtotal, tax, grandTotal };
  };

  const openNewEstimate = () => {
    setFormData({
      customerId: "",
      customerName: "",
      title: "",
      description: "",
      validUntil: "",
      items: [
        {
          id: 1,
          description: "",
          quantity: 1,
          unit: "ea",
          unitPrice: 0,
          total: 0,
        },
      ],
    });
    setIsEditing(false);
    setSelectedEstimate(null);
    setShowNewEstimate(true);
  };

  const openEditEstimate = (estimate) => {
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
    setShowNewEstimate(true);
  };

  const openEstimateDetail = (estimate) => {
    setSelectedEstimate(estimate);
    setShowDetail(true);
  };

  const closeEstimateDetail = () => {
    setShowDetail(false);
    setSelectedEstimate(null);
  };

  const closeNewEstimate = () => {
    setShowNewEstimate(false);
    setSelectedEstimate(null);
    setIsEditing(false);
  };

  const handleEstimateUpdate = (updatedEstimate) => {
    setEstimates(
      estimates.map((estimate) =>
        estimate.id === updatedEstimate.id ? updatedEstimate : estimate,
      ),
    );
  };

  const handleCreateJob = (estimate) => {
    // In a real application, this would create a new job from the estimate
    console.log("Creating job from estimate:", estimate);

    // Navigate to Jobs section
    setActiveSection("Jobs");

    // Close the detail view
    closeEstimateDetail();
  };

  const addItem = () => {
    const newId = Math.max(...formData.items.map((item) => item.id)) + 1;
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: newId,
          description: "",
          quantity: 1,
          unit: "ea",
          unitPrice: 0,
          total: 0,
        },
      ],
    });
  };

  const removeItem = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== itemId),
    });
  };

  const updateItem = (itemId, field, value) => {
    const updatedItems = formData.items.map((item) => {
      if (item.id === itemId) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
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
      setEstimates(
        estimates.map((estimate) =>
          estimate.id === selectedEstimate.id
            ? {
                ...estimate,
                ...formData,
                total: subtotal,
                tax,
                grandTotal,
              }
            : estimate,
        ),
      );
    } else {
      const newEstimate = {
        ...formData,
        id: `EST-2024-${String(estimates.length + 1).padStart(3, "0")}`,
        status: "Draft",
        total: subtotal,
        tax,
        grandTotal,
        createdDate: new Date().toISOString().split("T")[0],
        sentDate: null,
        acceptedDate: null,
      };
      setEstimates([...estimates, newEstimate]);
    }
    closeNewEstimate();
  };

  const handleSendEstimate = (estimateId) => {
    setEstimates(
      estimates.map((estimate) =>
        estimate.id === estimateId
          ? {
              ...estimate,
              status: "Sent",
              sentDate: new Date().toISOString().split("T")[0],
            }
          : estimate,
      ),
    );
    alert("Estimate sent via email!");
  };

  const handleDelete = (estimateId) => {
    if (window.confirm("Are you sure you want to delete this estimate?")) {
      setEstimates(estimates.filter((estimate) => estimate.id !== estimateId));
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

  // Show new/edit estimate form
  if (showNewEstimate) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={closeNewEstimate}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditing ? "Edit Estimate" : "New Estimate"}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {isEditing
                    ? "Update estimate information and line items"
                    : "Create a new project estimate with detailed line items"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer
                  </label>
                  <select
                    required
                    value={formData.customerId}
                    onChange={(e) => {
                      const customer = mockCustomers.find(
                        (c) => c.id === parseInt(e.target.value),
                      );
                      setFormData({
                        ...formData,
                        customerId: e.target.value,
                        customerName: customer ? customer.name : "",
                      });
                    }}
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a customer</option>
                    {mockCustomers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.validUntil}
                    onChange={(e) =>
                      setFormData({ ...formData, validUntil: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimate Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter estimate title"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the work to be performed"
                />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Line Items
                </h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="lg:col-span-5">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        value={item.unit}
                        onChange={(e) =>
                          updateItem(item.id, "unit", e.target.value)
                        }
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="ea">ea</option>
                        <option value="hrs">hrs</option>
                        <option value="sqft">sqft</option>
                        <option value="lf">lf</option>
                      </select>
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Unit Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Total
                      </label>
                      <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-md">
                        ${item.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="lg:col-span-1 flex items-end">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                          title="Remove item"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      ${calculateTotals(formData.items).subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>
                      ${calculateTotals(formData.items).tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                    <span>Total:</span>
                    <span>
                      ${calculateTotals(formData.items).grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={closeNewEstimate}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isEditing ? "Update Estimate" : "Create Estimate"}
              </button>
            </div>
          </form>
        </div>
      </div>
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
            onClick={openNewEstimate}
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
                $
                {estimates
                  .reduce((sum, est) => sum + est.grandTotal, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {estimates.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Estimates Table */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Estimate
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                  Customer
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Amount
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                  Valid Until
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEstimates.map((estimate) => (
                <tr key={estimate.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {estimate.id}
                      </div>
                      <div
                        className="text-sm text-gray-500 cursor-pointer hover:text-blue-600 truncate"
                        onClick={() => openEstimateDetail(estimate)}
                      >
                        {estimate.title}
                      </div>
                      <div className="text-xs text-gray-500 sm:hidden mt-1">
                        {estimate.customerName}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900">
                      {estimate.customerName}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[estimate.status]}`}
                    >
                      {estimate.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div>${estimate.grandTotal.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 lg:hidden">
                      Due: {estimate.validUntil}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                    {estimate.validUntil}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => openEstimateDetail(estimate)}
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded touch-manipulation"
                        title="View"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openEditEstimate(estimate)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded touch-manipulation"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {estimate.status === "Draft" && (
                        <button
                          onClick={() => handleSendEstimate(estimate.id)}
                          className="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded touch-manipulation"
                          title="Send"
                        >
                          <PaperAirplaneIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          alert(
                            "Download PDF functionality would be implemented here",
                          )
                        }
                        className="p-1 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded touch-manipulation"
                        title="Download PDF"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(estimate.id)}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded touch-manipulation"
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
      </div>
    </div>
  );
}
