'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  CubeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/outline';
import JobDetail from '../details/JobDetail';

const mockJobs = [
  {
    id: 'J-2024-001',
    estimateId: 'EST-2024-003',
    customerId: 3,
    customerName: 'Downtown Hotel Group',
    title: 'HVAC System Upgrade',
    description: 'Commercial HVAC system replacement and ductwork',
    status: 'In Progress',
    priority: 'High',
    value: 34668,
    startDate: '2024-01-15',
    expectedEndDate: '2024-02-15',
    actualEndDate: null,
    assignedTo: 'Mike Johnson',
    progress: 65,
    hoursLogged: 127,
    estimatedHours: 180,
    inventoryReserved: [
      { sku: 'HVAC-UNIT-001', name: 'Commercial HVAC Unit', quantity: 3, reserved: 3, consumed: 2 },
      { sku: 'DUCT-6IN-100', name: '6" Ductwork - 100ft', quantity: 2, reserved: 2, consumed: 1 },
    ],
    notes: 'Customer requested additional insulation. Phase 1 complete.',
  },
  {
    id: 'J-2024-002',
    estimateId: 'EST-2024-001',
    customerId: 1,
    customerName: 'ABC Construction LLC',
    title: 'Office Renovation',
    description: 'Complete office renovation including electrical, plumbing, and HVAC work',
    status: 'Ready',
    priority: 'Medium',
    value: 16632,
    startDate: '2024-01-20',
    expectedEndDate: '2024-03-01',
    actualEndDate: null,
    assignedTo: 'Sarah Wilson',
    progress: 0,
    hoursLogged: 0,
    estimatedHours: 240,
    inventoryReserved: [
      { sku: 'WIRE-12G-500', name: '12 AWG Wire - 500ft', quantity: 5, reserved: 5, consumed: 0 },
      { sku: 'OUTLET-STD', name: 'Standard Outlet', quantity: 20, reserved: 20, consumed: 0 },
    ],
    notes: 'Waiting for permits to be approved.',
  },
  {
    id: 'J-2024-003',
    estimateId: 'EST-2024-002',
    customerId: 2,
    customerName: 'Smith Residence',
    title: 'Kitchen Remodel',
    description: 'Full kitchen renovation with new appliances and fixtures',
    status: 'Review',
    priority: 'Low',
    value: 8856,
    startDate: '2024-01-08',
    expectedEndDate: '2024-01-25',
    actualEndDate: null,
    assignedTo: 'Tom Davis',
    progress: 90,
    hoursLogged: 85,
    estimatedHours: 95,
    inventoryReserved: [
      { sku: 'CABINET-OAK', name: 'Oak Kitchen Cabinet', quantity: 8, reserved: 8, consumed: 8 },
      { sku: 'COUNTER-GRANITE', name: 'Granite Countertop', quantity: 25, reserved: 25, consumed: 25 },
    ],
    notes: 'Final inspection scheduled for tomorrow.',
  },
  {
    id: 'J-2024-004',
    estimateId: null,
    customerId: 4,
    customerName: 'Metro Shopping Center',
    title: 'Emergency Electrical Repair',
    description: 'Emergency electrical panel replacement',
    status: 'Finished',
    priority: 'Critical',
    value: 3200,
    startDate: '2024-01-10',
    expectedEndDate: '2024-01-12',
    actualEndDate: '2024-01-12',
    assignedTo: 'Mike Johnson',
    progress: 100,
    hoursLogged: 18,
    estimatedHours: 16,
    inventoryReserved: [
      { sku: 'PANEL-200A', name: '200A Electrical Panel', quantity: 1, reserved: 1, consumed: 1 },
    ],
    notes: 'Emergency repair completed successfully.',
  },
];

const statusColors = {
  'Ready': 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Review': 'bg-purple-100 text-purple-800',
  'Finished': 'bg-green-100 text-green-800',
  'On Hold': 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-orange-100 text-orange-800',
  'Critical': 'bg-red-100 text-red-800',
};

const statusFlow = ['Ready', 'In Progress', 'Review', 'Finished'];

export default function Jobs() {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openJobDetail = (job) => {
    setSelectedJob(job);
    setShowDetail(true);
  };

  const closeJobDetail = () => {
    setShowDetail(false);
    setSelectedJob(null);
  };

  const handleJobUpdate = (updatedJob) => {
    setJobs(jobs.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    ));
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        const updatedJob = { ...job, status: newStatus };
        
        // Handle inventory based on status changes
        if (newStatus === 'In Progress') {
          // Reserve inventory
          console.log(`Reserving inventory for job ${jobId}`);
        } else if (newStatus === 'Finished') {
          // Release remaining inventory and mark as consumed
          updatedJob.actualEndDate = new Date().toISOString().split('T')[0];
          updatedJob.progress = 100;
        }
        
        return updatedJob;
      }
      return job;
    }));
  };

  const updateInventoryConsumption = (jobId, sku, consumedQty) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          inventoryReserved: job.inventoryReserved.map(item => 
            item.sku === sku ? { ...item, consumed: consumedQty } : item
          )
        };
      }
      return job;
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ready': return <PlayIcon className="h-4 w-4" />;
      case 'In Progress': return <ClockIcon className="h-4 w-4" />;
      case 'Review': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'Finished': return <CheckCircleIcon className="h-4 w-4" />;
      default: return <PauseIcon className="h-4 w-4" />;
    }
  };

  const getNextStatus = (currentStatus) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
  };

  // Show detail view if a job is selected
  if (showDetail && selectedJob) {
    return (
      <JobDetail 
        job={selectedJob} 
        onBack={closeJobDetail}
        onUpdate={handleJobUpdate}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
            <p className="mt-2 text-lg text-gray-600">
              Track active jobs, schedules, and project progress
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Job
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'Review').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'Finished').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.reduce((sum, job) => sum + job.hoursLogged, 0)}
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
              placeholder="Search jobs..."
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
            <option value="Ready">Ready</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 
                  className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                  onClick={() => openJobDetail(job)}
                >
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">{job.id} • {job.customerName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[job.priority]}`}>
                  {job.priority}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                  {getStatusIcon(job.status)}
                  <span className="ml-1">{job.status}</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{job.description}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center text-gray-600">
                <UserIcon className="h-4 w-4 mr-2" />
                {job.assignedTo}
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {job.expectedEndDate}
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-4 w-4 mr-2" />
                {job.hoursLogged} / {job.estimatedHours}h
              </div>
              <div className="flex items-center text-gray-600">
                <CubeIcon className="h-4 w-4 mr-2" />
                ${job.value.toLocaleString()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => openJobDetail(job)}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  <EyeIcon className="h-4 w-4 inline mr-1" />
                  View
                </button>
                <button
                  onClick={() => openJobDetail(job)}
                  className="text-green-600 hover:text-green-900 text-sm font-medium"
                >
                  Inventory
                </button>
              </div>
              {getNextStatus(job.status) && (
                <button
                  onClick={() => updateJobStatus(job.id, getNextStatus(job.status))}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                >
                  Move to {getNextStatus(job.status)}
                  <ArrowRightIcon className="h-3 w-3 ml-1" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}