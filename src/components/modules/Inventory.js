"use client";

import { useState } from "react";
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
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import InventoryDetail from "../details/InventoryDetail";

const mockInventoryItems = [
  {
    id: 1,
    sku: "WIRE-12G-500",
    name: "12 AWG Wire - 500ft Roll",
    category: "Electrical",
    currentStock: 2,
    minimumStock: 10,
    maximumStock: 50,
    unitCost: 125.5,
    sellingPrice: 187.75,
    vendor: "ElectriCorp Supply",
    location: "Warehouse A-2",
    lastUpdated: "2024-01-10",
    movements: [
      {
        date: "2024-01-15",
        type: "out",
        quantity: 5,
        jobId: "J-2024-002",
        notes: "Office renovation project",
      },
      {
        date: "2024-01-10",
        type: "in",
        quantity: 20,
        poNumber: "PO-2024-005",
        notes: "Regular stock replenishment",
      },
    ],
  },
  {
    id: 2,
    sku: "PIPE-PVC-4IN",
    name: "4 Inch PVC Pipe - 10ft",
    category: "Plumbing",
    currentStock: 5,
    minimumStock: 15,
    maximumStock: 100,
    unitCost: 18.25,
    sellingPrice: 29.2,
    vendor: "PlumbPro Supplies",
    location: "Warehouse B-1",
    lastUpdated: "2024-01-12",
    movements: [
      {
        date: "2024-01-12",
        type: "out",
        quantity: 8,
        jobId: "J-2024-001",
        notes: "HVAC ductwork installation",
      },
    ],
  },
  {
    id: 3,
    sku: "SCREW-DW-2IN",
    name: "2 Inch Drywall Screws (100pk)",
    category: "Hardware",
    currentStock: 1,
    minimumStock: 20,
    maximumStock: 200,
    unitCost: 8.5,
    sellingPrice: 12.75,
    vendor: "Hardware Plus",
    location: "Warehouse A-1",
    lastUpdated: "2024-01-08",
    movements: [
      {
        date: "2024-01-08",
        type: "out",
        quantity: 15,
        jobId: "J-2024-003",
        notes: "Kitchen remodel drywall work",
      },
    ],
  },
  {
    id: 4,
    sku: "HVAC-UNIT-001",
    name: "Commercial HVAC Unit 5-Ton",
    category: "HVAC",
    currentStock: 3,
    minimumStock: 2,
    maximumStock: 8,
    unitCost: 2850.0,
    sellingPrice: 4275.0,
    vendor: "HVAC Distributors Inc",
    location: "Warehouse C-1",
    lastUpdated: "2024-01-15",
    movements: [
      {
        date: "2024-01-15",
        type: "out",
        quantity: 2,
        jobId: "J-2024-001",
        notes: "Hotel HVAC upgrade",
      },
      {
        date: "2024-01-05",
        type: "in",
        quantity: 3,
        poNumber: "PO-2024-003",
        notes: "Quarterly HVAC stock order",
      },
    ],
  },
  {
    id: 5,
    sku: "OUTLET-STD",
    name: "Standard Electrical Outlet",
    category: "Electrical",
    currentStock: 45,
    minimumStock: 25,
    maximumStock: 200,
    unitCost: 3.25,
    sellingPrice: 5.95,
    vendor: "ElectriCorp Supply",
    location: "Warehouse A-3",
    lastUpdated: "2024-01-14",
    movements: [
      {
        date: "2024-01-14",
        type: "in",
        quantity: 50,
        poNumber: "PO-2024-006",
        notes: "Bulk electrical supplies order",
      },
    ],
  },
];

const categories = ["All", "Electrical", "Plumbing", "HVAC", "Hardware"];

const vendors = [
  "ElectriCorp Supply",
  "PlumbPro Supplies",
  "Hardware Plus",
  "HVAC Distributors Inc",
  "BuildCorp Materials",
];

export default function Inventory() {
  const [inventory, setInventory] = useState(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNewItem, setShowNewItem] = useState(false);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "Electrical",
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    unitCost: 0,
    sellingPrice: 0,
    vendor: "",
    location: "",
  });
  const [movementData, setMovementData] = useState({
    type: "in",
    quantity: 0,
    notes: "",
    jobId: "",
    poNumber: "",
  });

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "Low" && item.currentStock <= item.minimumStock) ||
      (stockFilter === "Normal" && item.currentStock > item.minimumStock);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const lowStockItems = inventory.filter(
    (item) => item.currentStock <= item.minimumStock,
  );
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.currentStock * item.unitCost,
    0,
  );
  const totalItems = inventory.reduce(
    (sum, item) => sum + item.currentStock,
    0,
  );

  const openNewItem = () => {
    setFormData({
      sku: "",
      name: "",
      category: "Electrical",
      currentStock: 0,
      minimumStock: 0,
      maximumStock: 0,
      unitCost: 0,
      sellingPrice: 0,
      vendor: "",
      location: "",
    });
    setIsEditing(false);
    setSelectedItem(null);
    setShowNewItem(true);
  };

  const openEditItem = (item) => {
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
    setShowNewItem(true);
  };

  const openMovementModal = (item) => {
    setSelectedItem(item);
    setMovementData({
      type: "in",
      quantity: 0,
      notes: "",
      jobId: "",
      poNumber: "",
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

  const closeNewItem = () => {
    setShowNewItem(false);
    setSelectedItem(null);
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsMovementModalOpen(false);
    setIsBulkImportOpen(false);
    setSelectedItem(null);
  };

  const handleInventoryUpdate = (updatedItem) => {
    setInventory(
      inventory.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setInventory(
        inventory.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : item,
        ),
      );
    } else {
      const newItem = {
        ...formData,
        id: Math.max(...inventory.map((i) => i.id)) + 1,
        lastUpdated: new Date().toISOString().split("T")[0],
        movements: [],
      };
      setInventory([...inventory, newItem]);
    }
    closeNewItem();
  };

  const handleMovement = (e) => {
    e.preventDefault();
    const newMovement = {
      date: new Date().toISOString().split("T")[0],
      type: movementData.type,
      quantity: parseInt(movementData.quantity),
      jobId: movementData.jobId || null,
      poNumber: movementData.poNumber || null,
      notes: movementData.notes,
    };

    setInventory(
      inventory.map((item) => {
        if (item.id === selectedItem.id) {
          const stockChange =
            movementData.type === "in"
              ? parseInt(movementData.quantity)
              : -parseInt(movementData.quantity);

          return {
            ...item,
            currentStock: Math.max(0, item.currentStock + stockChange),
            movements: [newMovement, ...item.movements],
            lastUpdated: new Date().toISOString().split("T")[0],
          };
        }
        return item;
      }),
    );

    closeModal();
  };

  const handleDelete = (itemId) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setInventory(inventory.filter((item) => item.id !== itemId));
    }
  };

  const getStockStatus = (item) => {
    if (item.currentStock <= item.minimumStock) {
      return { label: "Low Stock", color: "bg-red-100 text-red-800" };
    } else if (item.currentStock >= item.maximumStock * 0.8) {
      return { label: "High Stock", color: "bg-blue-100 text-blue-800" };
    }
    return { label: "Normal", color: "bg-green-100 text-green-800" };
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

  // Show new/edit item form
  if (showNewItem) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={closeNewItem}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditing ? "Edit Item" : "New Inventory Item"}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {isEditing
                    ? "Update inventory item information"
                    : "Add a new item to your inventory"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter item name"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor
                  </label>
                  <select
                    value={formData.vendor}
                    onChange={(e) =>
                      setFormData({ ...formData, vendor: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor} value={vendor}>
                        {vendor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter storage location"
                />
              </div>
            </div>

            {/* Stock Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Stock Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.currentStock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentStock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Stock
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.minimumStock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minimumStock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Stock
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.maximumStock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maximumStock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pricing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Cost ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.unitCost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unitCost: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sellingPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={closeNewItem}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isEditing ? "Update Item" : "Create Item"}
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
            <h1 className="text-3xl font-bold text-gray-900">
              Inventory Management
            </h1>
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
              onClick={openNewItem}
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
              <p className="text-sm font-medium text-gray-600">
                Low Stock Items
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {lowStockItems.length}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                {inventory.length}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                ${totalValue.toLocaleString()}
              </p>
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
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
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
            {lowStockItems
              .slice(0, 3)
              .map((item) => item.name)
              .join(", ")}
            {lowStockItems.length > 3 &&
              ` and ${lowStockItems.length - 3} more...`}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Item
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Stock
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                  Pricing
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                  Vendor
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const status = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div
                          className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() => openInventoryDetail(item)}
                        >
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.sku} • {item.category}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.location}
                        </div>
                        <div className="text-xs text-gray-500 sm:hidden mt-1">
                          Cost: ${item.unitCost.toFixed(2)} • Sell: $
                          {item.sellingPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400 lg:hidden mt-1">
                          {item.vendor}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">{item.currentStock}</span>{" "}
                        on hand
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {item.minimumStock} • Max: {item.maximumStock}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        Cost: ${item.unitCost.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600">
                        Sell: ${item.sellingPrice.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Margin:{" "}
                        {(
                          ((item.sellingPrice - item.unitCost) /
                            item.sellingPrice) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                      {item.vendor}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openMovementModal(item)}
                          className="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded touch-manipulation"
                          title="Stock Movement"
                        >
                          <ArrowUpIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openEditItem(item)}
                          className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded touch-manipulation"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded touch-manipulation"
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
      </div>

      {/* Stock Movement Modal */}
      {isMovementModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleMovement}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Stock Movement
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Item:{" "}
                      <span className="font-medium">{selectedItem.name}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Current Stock:{" "}
                      <span className="font-medium">
                        {selectedItem.currentStock}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Movement Type
                      </label>
                      <select
                        value={movementData.type}
                        onChange={(e) =>
                          setMovementData({
                            ...movementData,
                            type: e.target.value,
                          })
                        }
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="in">Stock In</option>
                        <option value="out">Stock Out</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={movementData.quantity}
                        onChange={(e) =>
                          setMovementData({
                            ...movementData,
                            quantity: e.target.value,
                          })
                        }
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {movementData.type === "out" ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={movementData.jobId}
                          onChange={(e) =>
                            setMovementData({
                              ...movementData,
                              jobId: e.target.value,
                            })
                          }
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PO Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={movementData.poNumber}
                          onChange={(e) =>
                            setMovementData({
                              ...movementData,
                              poNumber: e.target.value,
                            })
                          }
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={movementData.notes}
                        onChange={(e) =>
                          setMovementData({
                            ...movementData,
                            notes: e.target.value,
                          })
                        }
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
                  <h3 className="text-lg font-medium text-gray-900">
                    Bulk Import Inventory
                  </h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-center py-12">
                  <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Upload CSV File
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a CSV file with columns: SKU, Name, Category, Stock,
                    Min Stock, Max Stock, Unit Cost, Selling Price, Vendor,
                    Location
                  </p>
                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <DocumentArrowUpIcon className="h-4 w-4 mr-2" />
                      Choose File
                    </button>
                  </div>
                  <div className="mt-4">
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
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
