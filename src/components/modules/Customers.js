"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import CustomerDetail from "../details/CustomerDetail";

const mockCustomers = [
  {
    id: 1,
    name: "ABC Construction LLC",
    email: "contact@abcconstruction.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, ST 12345",
    type: "Commercial",
    status: "Active",
    totalJobs: 15,
    totalRevenue: 125400,
    lastContact: "2024-01-15",
  },
  {
    id: 2,
    name: "Smith Residence",
    email: "john.smith@email.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, ST 67890",
    type: "Residential",
    status: "Active",
    totalJobs: 3,
    totalRevenue: 18600,
    lastContact: "2024-01-12",
  },
  {
    id: 3,
    name: "Downtown Hotel Group",
    email: "maintenance@downtownhotels.com",
    phone: "(555) 456-7890",
    address: "789 Business Blvd, Metro City, ST 11111",
    type: "Commercial",
    status: "Active",
    totalJobs: 8,
    totalRevenue: 67800,
    lastContact: "2024-01-10",
  },
  {
    id: 4,
    name: "Johnson Family",
    email: "mjohnson@email.com",
    phone: "(555) 234-5678",
    address: "321 Pine St, Hometown, ST 22222",
    type: "Residential",
    status: "Inactive",
    totalJobs: 1,
    totalRevenue: 4200,
    lastContact: "2023-12-08",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
};

const typeColors = {
  Commercial: "bg-blue-100 text-blue-800",
  Residential: "bg-purple-100 text-purple-800",
};

export default function Customers() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "Residential",
    status: "Active",
  });

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  );

  const openNewCustomer = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "Residential",
      status: "Active",
    });
    setIsEditing(false);
    setSelectedCustomer(null);
    setShowNewCustomer(true);
  };

  const openEditCustomer = (customer) => {
    setFormData(customer);
    setIsEditing(true);
    setSelectedCustomer(customer);
    setShowNewCustomer(true);
  };

  const openCustomerDetail = (customer) => {
    setSelectedCustomer(customer);
    setShowDetail(true);
  };

  const closeCustomerDetail = () => {
    setShowDetail(false);
    setSelectedCustomer(null);
  };

  const closeNewCustomer = () => {
    setShowNewCustomer(false);
    setSelectedCustomer(null);
    setIsEditing(false);
  };

  const handleCustomerUpdate = (updatedCustomer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer,
      ),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCustomers(
        customers.map((customer) =>
          customer.id === selectedCustomer.id
            ? { ...customer, ...formData }
            : customer,
        ),
      );
    } else {
      const newCustomer = {
        ...formData,
        id: Math.max(...customers.map((c) => c.id)) + 1,
        totalJobs: 0,
        totalRevenue: 0,
        lastContact: new Date().toISOString().split("T")[0],
      };
      setCustomers([...customers, newCustomer]);
    }
    closeNewCustomer();
  };

  const handleDelete = (customerId) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((customer) => customer.id !== customerId));
    }
  };

  // Show detail view if a customer is selected
  if (showDetail && selectedCustomer) {
    return (
      <CustomerDetail
        customer={selectedCustomer}
        onBack={closeCustomerDetail}
        onUpdate={handleCustomerUpdate}
      />
    );
  }

  // Show new/edit customer form
  if (showNewCustomer) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={closeNewCustomer}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditing ? "Edit Customer" : "New Customer"}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {isEditing
                    ? "Update customer information"
                    : "Add a new customer to your database"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="customer@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full address including street, city, state, and zip code"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={closeNewCustomer}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isEditing ? "Update Customer" : "Create Customer"}
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
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your customer database and relationships
            </p>
          </div>
          <button
            onClick={openNewCustomer}
            data-action="add-customer"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>All Types</option>
            <option>Commercial</option>
            <option>Residential</option>
          </select>
          <select className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Customer
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                  Contact
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                  Jobs
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Revenue
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => openCustomerDetail(customer)}
                      >
                        {customer.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1 sm:hidden">
                        <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span className="truncate">{customer.address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[customer.type]}`}
                    >
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[customer.status]}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                    {customer.totalJobs}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div>${customer.totalRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 lg:hidden">
                      {customer.totalJobs} jobs
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => openEditCustomer(customer)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded touch-manipulation"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
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
