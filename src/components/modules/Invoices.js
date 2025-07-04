"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PaperAirplaneIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import InvoiceDetail from "../details/InvoiceDetail";

const mockInvoices = [
  {
    id: "INV-2024-001",
    jobId: "J-2024-001",
    customerId: 3,
    customerName: "Downtown Hotel Group",
    customerEmail: "billing@downtownhotels.com",
    title: "HVAC System Upgrade - Final Invoice",
    status: "Paid",
    issueDate: "2024-01-20",
    dueDate: "2024-02-19",
    paidDate: "2024-01-25",
    subtotal: 32100,
    taxRate: 8,
    taxAmount: 2568,
    total: 34668,
    amountPaid: 34668,
    amountDue: 0,
    items: [
      {
        id: 1,
        description: "Commercial HVAC units (3 units)",
        quantity: 3,
        unitPrice: 8500,
        total: 25500,
      },
      {
        id: 2,
        description: "Ductwork installation (200 ft)",
        quantity: 200,
        unitPrice: 33,
        total: 6600,
      },
    ],
    notes: "Thank you for your business. Installation completed on schedule.",
  },
  {
    id: "INV-2024-002",
    jobId: "J-2024-003",
    customerId: 2,
    customerName: "Smith Residence",
    customerEmail: "john.smith@email.com",
    title: "Kitchen Remodel - Progress Payment",
    status: "Sent",
    issueDate: "2024-01-18",
    dueDate: "2024-02-17",
    paidDate: null,
    subtotal: 4400,
    taxRate: 8,
    taxAmount: 352,
    total: 4752,
    amountPaid: 0,
    amountDue: 4752,
    items: [
      {
        id: 1,
        description: "Kitchen cabinets installation",
        quantity: 1,
        unitPrice: 2200,
        total: 2200,
      },
      {
        id: 2,
        description: "Electrical work - Phase 1",
        quantity: 16,
        unitPrice: 137.5,
        total: 2200,
      },
    ],
    notes: "Progress payment for completed work phases.",
  },
  {
    id: "INV-2024-003",
    jobId: "J-2024-002",
    customerId: 1,
    customerName: "ABC Construction LLC",
    customerEmail: "billing@abcconstruction.com",
    title: "Office Renovation - Material Costs",
    status: "Draft",
    issueDate: "2024-01-22",
    dueDate: "2024-02-21",
    paidDate: null,
    subtotal: 8750,
    taxRate: 8,
    taxAmount: 700,
    total: 9450,
    amountPaid: 0,
    amountDue: 9450,
    items: [
      {
        id: 1,
        description: "Electrical materials and supplies",
        quantity: 1,
        unitPrice: 5200,
        total: 5200,
      },
      {
        id: 2,
        description: "Labor - Electrical installation",
        quantity: 35,
        unitPrice: 85,
        total: 2975,
      },
      {
        id: 3,
        description: "Permit and inspection fees",
        quantity: 1,
        unitPrice: 575,
        total: 575,
      },
    ],
    notes: "Invoice covers materials and labor for electrical work completed.",
  },
  {
    id: "INV-2024-004",
    jobId: null,
    customerId: 4,
    customerName: "Metro Shopping Center",
    customerEmail: "facilities@metroshopping.com",
    title: "Emergency Electrical Repair",
    status: "Overdue",
    issueDate: "2024-01-10",
    dueDate: "2024-01-25",
    paidDate: null,
    subtotal: 2850,
    taxRate: 8,
    taxAmount: 228,
    total: 3078,
    amountPaid: 0,
    amountDue: 3078,
    items: [
      {
        id: 1,
        description: "Emergency electrical panel replacement",
        quantity: 1,
        unitPrice: 1200,
        total: 1200,
      },
      {
        id: 2,
        description: "Emergency labor (after hours)",
        quantity: 12,
        unitPrice: 125,
        total: 1500,
      },
      {
        id: 3,
        description: "Emergency service call fee",
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
    ],
    notes: "Emergency repair completed. Payment terms: Net 15 days.",
  },
];

const statusColors = {
  Draft: "bg-gray-100 text-gray-800",
  Sent: "bg-blue-100 text-blue-800",
  Paid: "bg-green-100 text-green-800",
  Overdue: "bg-red-100 text-red-800",
  Cancelled: "bg-orange-100 text-orange-800",
};

const mockCustomers = [
  { id: 1, name: "ABC Construction LLC", email: "billing@abcconstruction.com" },
  { id: 2, name: "Smith Residence", email: "john.smith@email.com" },
  { id: 3, name: "Downtown Hotel Group", email: "billing@downtownhotels.com" },
  {
    id: 4,
    name: "Metro Shopping Center",
    email: "facilities@metroshopping.com",
  },
];

const mockJobs = [
  { id: "J-2024-001", title: "HVAC System Upgrade", customerId: 3 },
  { id: "J-2024-002", title: "Office Renovation", customerId: 1 },
  { id: "J-2024-003", title: "Kitchen Remodel", customerId: 2 },
];

export default function Invoices() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerEmail: "",
    jobId: "",
    title: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    taxRate: 8,
    notes: "",
    items: [{ id: 1, description: "", quantity: 1, unitPrice: 0, total: 0 }],
  });

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.total, 0);
  const outstandingAmount = invoices
    .filter((inv) => inv.status !== "Paid" && inv.status !== "Cancelled")
    .reduce((sum, inv) => sum + inv.amountDue, 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amountDue, 0);

  const calculateTotals = (items, taxRate) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const openNewInvoice = () => {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    setFormData({
      customerId: "",
      customerName: "",
      customerEmail: "",
      jobId: "",
      title: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: dueDate.toISOString().split("T")[0],
      taxRate: 8,
      notes: "",
      items: [{ id: 1, description: "", quantity: 1, unitPrice: 0, total: 0 }],
    });
    setIsEditing(false);
    setSelectedInvoice(null);
    setShowNewInvoice(true);
  };

  const openEditInvoice = (invoice) => {
    setFormData({
      customerId: invoice.customerId,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      jobId: invoice.jobId || "",
      title: invoice.title,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      taxRate: invoice.taxRate,
      notes: invoice.notes,
      items: invoice.items,
    });
    setIsEditing(true);
    setSelectedInvoice(invoice);
    setShowNewInvoice(true);
  };

  const openInvoiceDetail = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetail(true);
  };

  const closeInvoiceDetail = () => {
    setShowDetail(false);
    setSelectedInvoice(null);
  };

  const closeNewInvoice = () => {
    setShowNewInvoice(false);
    setSelectedInvoice(null);
    setIsEditing(false);
  };

  const handleInvoiceUpdate = (updatedInvoice) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice,
      ),
    );
  };

  const addItem = () => {
    const newId = Math.max(...formData.items.map((item) => item.id)) + 1;
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: newId, description: "", quantity: 1, unitPrice: 0, total: 0 },
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
    const { subtotal, taxAmount, total } = calculateTotals(
      formData.items,
      formData.taxRate,
    );

    if (isEditing) {
      setInvoices(
        invoices.map((invoice) =>
          invoice.id === selectedInvoice.id
            ? {
                ...invoice,
                ...formData,
                subtotal,
                taxAmount,
                total,
                amountDue: total - invoice.amountPaid,
              }
            : invoice,
        ),
      );
    } else {
      const newInvoice = {
        ...formData,
        id: `INV-2024-${String(invoices.length + 1).padStart(3, "0")}`,
        status: "Draft",
        subtotal,
        taxAmount,
        total,
        amountPaid: 0,
        amountDue: total,
        paidDate: null,
      };
      setInvoices([...invoices, newInvoice]);
    }
    closeNewInvoice();
  };

  const handleStatusUpdate = (invoiceId, newStatus) => {
    setInvoices(
      invoices.map((invoice) => {
        if (invoice.id === invoiceId) {
          const updates = { status: newStatus };
          if (newStatus === "Paid") {
            updates.paidDate = new Date().toISOString().split("T")[0];
            updates.amountPaid = invoice.total;
            updates.amountDue = 0;
          }
          return { ...invoice, ...updates };
        }
        return invoice;
      }),
    );
  };

  const handleSendInvoice = (invoiceId) => {
    handleStatusUpdate(invoiceId, "Sent");
    alert("Invoice sent via email!");
  };

  const handleDelete = (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
    }
  };

  // Show detail view if an invoice is selected
  if (showDetail && selectedInvoice) {
    return (
      <InvoiceDetail
        invoice={selectedInvoice}
        onBack={closeInvoiceDetail}
        onUpdate={handleInvoiceUpdate}
      />
    );
  }

  // Show new/edit invoice form
  if (showNewInvoice) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={closeNewInvoice}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditing ? "Edit Invoice" : "New Invoice"}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {isEditing
                    ? "Update invoice information and line items"
                    : "Create a new invoice with detailed line items"}
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
                        customerEmail: customer ? customer.email : "",
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
                    Job (Optional)
                  </label>
                  <select
                    value={formData.jobId}
                    onChange={(e) =>
                      setFormData({ ...formData, jobId: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">No job</option>
                    {mockJobs
                      .filter(
                        (job) =>
                          job.customerId === parseInt(formData.customerId),
                      )
                      .map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.id} - {job.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter invoice title"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.issueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, issueDate: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.taxRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        taxRate: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
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
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="md:col-span-3">
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
                    <div>
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
                    <div>
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
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Total
                        </label>
                        <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-md">
                          ${item.total.toFixed(2)}
                        </div>
                      </div>
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="ml-2 p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
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
                      $
                      {calculateTotals(
                        formData.items,
                        formData.taxRate,
                      ).subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({formData.taxRate}%):</span>
                    <span>
                      $
                      {calculateTotals(
                        formData.items,
                        formData.taxRate,
                      ).taxAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                    <span>Total:</span>
                    <span>
                      $
                      {calculateTotals(
                        formData.items,
                        formData.taxRate,
                      ).total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional notes or payment terms"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={closeNewInvoice}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isEditing ? "Update Invoice" : "Create Invoice"}
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
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="mt-2 text-lg text-gray-600">
              Generate, send, and track customer invoices
            </p>
          </div>
          <button
            onClick={openNewInvoice}
            data-action="new-invoice"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">
                ${outstandingAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${overdueAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {invoices.length}
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
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                  Invoice
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                  Customer
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Amount
                </th>
                <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Due Date
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-[200px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4">
                    <div>
                      <div
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 truncate"
                        onClick={() => openInvoiceDetail(invoice)}
                      >
                        {invoice.id}
                      </div>
                      <div
                        className="text-xs sm:text-sm text-gray-500 cursor-pointer hover:text-blue-600 truncate"
                        onClick={() => openInvoiceDetail(invoice)}
                      >
                        {invoice.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="text-sm text-gray-900 truncate">
                      {invoice.customerName}
                    </div>
                    {invoice.jobId && (
                      <div className="text-xs sm:text-sm text-gray-500 truncate lg:hidden">
                        Job: {invoice.jobId}
                      </div>
                    )}
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      ${invoice.total.toLocaleString()}
                    </div>
                    {invoice.amountDue > 0 && (
                      <div className="text-xs text-red-600">
                        Due: ${invoice.amountDue.toLocaleString()}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 lg:hidden mt-1">
                      Due: {invoice.dueDate}
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-4 text-sm text-gray-900">
                    {invoice.dueDate}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm font-medium">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <button
                        onClick={() => openInvoiceDetail(invoice)}
                        className="p-1 sm:p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="View"
                      >
                        <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <button
                        onClick={() => openEditInvoice(invoice)}
                        className="p-1 sm:p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      {(invoice.status === "Draft" ||
                        invoice.status === "Sent") && (
                        <button
                          onClick={() => handleSendInvoice(invoice.id)}
                          className="p-1 sm:p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded"
                          title="Send"
                        >
                          <PaperAirplaneIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          alert(
                            "Download PDF functionality would be implemented here",
                          )
                        }
                        className="hidden sm:block p-1 sm:p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded"
                        title="Download PDF"
                      >
                        <DocumentArrowDownIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      {invoice.status === "Sent" && (
                        <button
                          onClick={() => handleStatusUpdate(invoice.id, "Paid")}
                          className="p-1 sm:p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded"
                          title="Mark as Paid"
                        >
                          <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(invoice.id)}
                        className="p-1 sm:p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />
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
