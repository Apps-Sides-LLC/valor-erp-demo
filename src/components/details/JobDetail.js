'use client';

import { useState } from 'react';
import {
  ArrowLeftIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  CubeIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const statusColors = {
  'Ready': 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Review': 'bg-purple-100 text-purple-800',
  'Finished': 'bg-green-100 text-green-800',
};

const priorityColors = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-orange-100 text-orange-800',
  'Critical': 'bg-red-100 text-red-800',
};

const statusFlow = ['Ready', 'In Progress', 'Review', 'Finished'];

export default function JobDetail({ job, onBack, onUpdate }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(job?.notes || '');

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Job not found</h2>
          <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700">
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const getNextStatus = (currentStatus) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
  };

  const handleStatusUpdate = (newStatus) => {
    if (onUpdate) {
      onUpdate({ ...job, status: newStatus });
    }
  };

  const handleNotesUpdate = () => {
    if (onUpdate) {
      onUpdate({ ...job, notes });
    }
    setIsEditingNotes(false);
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
          Back to Jobs
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-600 mt-1">{job.id} • {job.customerName}</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${priorityColors[job.priority]}`}>
              {job.priority} Priority
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
              {job.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h2>
            <div className="prose prose-sm text-gray-600">
              <p>{job.description}</p>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
              <span className="text-sm font-medium text-gray-600">{job.progress}% Complete</span>
            </div>
            
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Status Flow */}
            <div className="flex items-center justify-between">
              {statusFlow.map((status, index) => {
                const isActive = status === job.status;
                const isCompleted = statusFlow.indexOf(job.status) > index;
                
                return (
                  <div key={status} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      isActive ? 'bg-blue-600 text-white' :
                      isCompleted ? 'bg-green-600 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : isActive ? (
                        <span className="text-sm font-bold">{index + 1}</span>
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      isActive ? 'text-blue-600' :
                      isCompleted ? 'text-green-600' :
                      'text-gray-500'
                    }`}>
                      {status}
                    </span>
                    {index < statusFlow.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {getNextStatus(job.status) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleStatusUpdate(getNextStatus(job.status))}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Move to {getNextStatus(job.status)}
                </button>
              </div>
            )}
          </div>

          {/* Inventory Tracking */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Usage</h2>
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Item</th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">Reserved</th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">Consumed</th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {job.inventoryReserved?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.sku}</div>
                        </div>
                      </td>
                      <td className="text-right py-3 text-sm text-gray-900">{item.reserved}</td>
                      <td className="text-right py-3 text-sm text-gray-900">{item.consumed}</td>
                      <td className="text-right py-3 text-sm text-gray-900">{item.reserved - item.consumed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
            
            {isEditingNotes ? (
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
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
                      setNotes(job.notes || '');
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
                {job.notes || 'No notes added yet.'}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Details */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {job.assignedTo}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {job.startDate}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Expected End</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {job.expectedEndDate}
                </dd>
              </div>
              {job.actualEndDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Actual End</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {job.actualEndDate}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Value</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  ${job.value.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Time Tracking */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Tracking</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Hours Logged</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {job.hoursLogged}h
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Estimated Hours</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {job.estimatedHours}h
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Remaining</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {Math.max(0, job.estimatedHours - job.hoursLogged)}h
                </dd>
              </div>
            </dl>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">
                  {((job.hoursLogged / job.estimatedHours) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (job.hoursLogged / job.estimatedHours) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}