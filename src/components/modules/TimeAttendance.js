'use client';

import { useState } from 'react';
import {
  ClockIcon,
  UserIcon,
  CalendarIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const mockEmployees = [
  {
    id: 1,
    name: 'Mike Johnson',
    role: 'Senior Technician',
    status: 'Clocked In',
    clockInTime: '2024-01-15T08:00:00',
    currentJob: 'J-2024-001',
    todayHours: 6.5,
    weekHours: 32.5,
    hourlyRate: 35,
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    role: 'Project Manager',
    status: 'Clocked Out',
    clockInTime: null,
    currentJob: null,
    todayHours: 8,
    weekHours: 40,
    hourlyRate: 45,
  },
  {
    id: 3,
    name: 'Tom Davis',
    role: 'Electrician',
    status: 'On Break',
    clockInTime: '2024-01-15T07:30:00',
    currentJob: 'J-2024-003',
    todayHours: 7,
    weekHours: 35,
    hourlyRate: 32,
  },
  {
    id: 4,
    name: 'Lisa Chen',
    role: 'Assistant',
    status: 'Clocked In',
    clockInTime: '2024-01-15T09:00:00',
    currentJob: null,
    todayHours: 5.5,
    weekHours: 28,
    hourlyRate: 22,
  },
];

const mockTimeEntries = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Mike Johnson',
    date: '2024-01-15',
    clockIn: '08:00',
    clockOut: '16:30',
    breakTime: 0.5,
    totalHours: 8,
    jobId: 'J-2024-001',
    jobTitle: 'HVAC System Upgrade',
    notes: 'Completed ductwork installation',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Wilson',
    date: '2024-01-15',
    clockIn: '08:30',
    clockOut: '17:00',
    breakTime: 0.5,
    totalHours: 8,
    jobId: null,
    jobTitle: 'Administrative',
    notes: 'Project planning and client meetings',
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Tom Davis',
    date: '2024-01-14',
    clockIn: '07:30',
    clockOut: '16:00',
    breakTime: 0.5,
    totalHours: 8,
    jobId: 'J-2024-003',
    jobTitle: 'Kitchen Remodel',
    notes: 'Final electrical connections',
  },
];

const statusColors = {
  'Clocked In': 'bg-green-100 text-green-800',
  'Clocked Out': 'bg-gray-100 text-gray-800',
  'On Break': 'bg-yellow-100 text-yellow-800',
};

const mockJobs = [
  { id: 'J-2024-001', title: 'HVAC System Upgrade' },
  { id: 'J-2024-002', title: 'Office Renovation' },
  { id: 'J-2024-003', title: 'Kitchen Remodel' },
];

export default function TimeAttendance() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [timeFormData, setTimeFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    clockIn: '',
    clockOut: '',
    breakTime: 0,
    jobId: '',
    notes: '',
  });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClockAction = (employeeId, action) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    setEmployees(employees.map(emp => {
      if (emp.id === employeeId) {
        switch (action) {
          case 'clockIn':
            return { ...emp, status: 'Clocked In', clockInTime: new Date().toISOString() };
          case 'clockOut':
            return { ...emp, status: 'Clocked Out', clockInTime: null, currentJob: null };
          case 'break':
            return { ...emp, status: emp.status === 'On Break' ? 'Clocked In' : 'On Break' };
          default:
            return emp;
        }
      }
      return emp;
    }));
    
    // In a real app, this would create a time entry
    console.log(`${action} for employee ${employeeId} at ${currentTime}`);
  };

  const assignJobToEmployee = (employeeId, jobId) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId ? { ...emp, currentJob: jobId } : emp
    ));
  };

  const openTimeModal = (employee = null) => {
    if (employee) {
      setTimeFormData({
        employeeId: employee.id,
        date: new Date().toISOString().split('T')[0],
        clockIn: '',
        clockOut: '',
        breakTime: 0,
        jobId: '',
        notes: '',
      });
    }
    setIsTimeModalOpen(true);
  };

  const handleTimeSubmit = (e) => {
    e.preventDefault();
    const employee = employees.find(emp => emp.id === parseInt(timeFormData.employeeId));
    const job = mockJobs.find(job => job.id === timeFormData.jobId);
    
    const clockInTime = new Date(`2024-01-01T${timeFormData.clockIn}`);
    const clockOutTime = new Date(`2024-01-01T${timeFormData.clockOut}`);
    const totalHours = (clockOutTime - clockInTime) / (1000 * 60 * 60) - timeFormData.breakTime;

    const newEntry = {
      id: timeEntries.length + 1,
      employeeId: parseInt(timeFormData.employeeId),
      employeeName: employee.name,
      date: timeFormData.date,
      clockIn: timeFormData.clockIn,
      clockOut: timeFormData.clockOut,
      breakTime: timeFormData.breakTime,
      totalHours: totalHours,
      jobId: timeFormData.jobId || null,
      jobTitle: job ? job.title : 'Administrative',
      notes: timeFormData.notes,
    };

    setTimeEntries([...timeEntries, newEntry]);
    setIsTimeModalOpen(false);
    setTimeFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      clockIn: '',
      clockOut: '',
      breakTime: 0,
      jobId: '',
      notes: '',
    });
  };

  const totalEmployees = employees.length;
  const clockedInEmployees = employees.filter(emp => emp.status === 'Clocked In').length;
  const totalHoursToday = employees.reduce((sum, emp) => sum + emp.todayHours, 0);
  const totalWeeklyHours = employees.reduce((sum, emp) => sum + emp.weekHours, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Time & Attendance</h1>
        <p className="mt-2 text-lg text-gray-600">
          Track employee hours and job time allocation
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'employees'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Employees
          </button>
          <button
            onClick={() => setActiveTab('timesheet')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'timesheet'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Timesheet
          </button>
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Clocked In</p>
                  <p className="text-2xl font-bold text-gray-900">{clockedInEmployees}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today&apos;s Hours</p>
                  <p className="text-2xl font-bold text-gray-900">{totalHoursToday}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Weekly Hours</p>
                  <p className="text-2xl font-bold text-gray-900">{totalWeeklyHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Employee Status</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {employees.map((employee) => (
                  <div key={employee.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{employee.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[employee.status]}`}>
                        {employee.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{employee.role}</p>
                    {employee.currentJob && (
                      <p className="text-sm text-blue-600 mb-3">
                        <BriefcaseIcon className="h-4 w-4 inline mr-1" />
                        {employee.currentJob}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>Today: {employee.todayHours}h</span>
                      <span>Week: {employee.weekHours}h</span>
                    </div>
                    <div className="flex space-x-2">
                      {employee.status === 'Clocked Out' ? (
                        <button
                          onClick={() => handleClockAction(employee.id, 'clockIn')}
                          className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <PlayIcon className="h-3 w-3 mr-1" />
                          Clock In
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleClockAction(employee.id, 'break')}
                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <PauseIcon className="h-3 w-3 mr-1" />
                            {employee.status === 'On Break' ? 'Return' : 'Break'}
                          </button>
                          <button
                            onClick={() => handleClockAction(employee.id, 'clockOut')}
                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                          >
                            <StopIcon className="h-3 w-3 mr-1" />
                            Clock Out
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div>
          <div className="mb-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Employee
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Today
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.role}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[employee.status]}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.currentJob ? (
                        <select
                          value={employee.currentJob}
                          onChange={(e) => assignJobToEmployee(employee.id, e.target.value)}
                          className="block text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">No Job</option>
                          {mockJobs.map(job => (
                            <option key={job.id} value={job.id}>{job.id}</option>
                          ))}
                        </select>
                      ) : (
                        <select
                          onChange={(e) => e.target.value && assignJobToEmployee(employee.id, e.target.value)}
                          className="block text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Assign Job</option>
                          {mockJobs.map(job => (
                            <option key={job.id} value={job.id}>{job.id}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.todayHours}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.weekHours}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${employee.hourlyRate}/hr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openTimeModal(employee)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Log Time
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timesheet Tab */}
      {activeTab === 'timesheet' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <input
                type="date"
                className="block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <select className="block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setIsTimeModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Manual Entry
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Break
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{entry.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.clockIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.clockOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.breakTime}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.totalHours}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{entry.jobTitle}</div>
                      {entry.jobId && (
                        <div className="text-sm text-gray-500">{entry.jobId}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Time Entry Modal */}
      {isTimeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleTimeSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Manual Time Entry</h3>
                    <button
                      type="button"
                      onClick={() => setIsTimeModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                      <select
                        required
                        value={timeFormData.employeeId}
                        onChange={(e) => setTimeFormData({ ...timeFormData, employeeId: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select employee</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={timeFormData.date}
                        onChange={(e) => setTimeFormData({ ...timeFormData, date: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Clock In</label>
                        <input
                          type="time"
                          required
                          value={timeFormData.clockIn}
                          onChange={(e) => setTimeFormData({ ...timeFormData, clockIn: e.target.value })}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Clock Out</label>
                        <input
                          type="time"
                          required
                          value={timeFormData.clockOut}
                          onChange={(e) => setTimeFormData({ ...timeFormData, clockOut: e.target.value })}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Break Time (hours)</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={timeFormData.breakTime}
                        onChange={(e) => setTimeFormData({ ...timeFormData, breakTime: parseFloat(e.target.value) || 0 })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job (Optional)</label>
                      <select
                        value={timeFormData.jobId}
                        onChange={(e) => setTimeFormData({ ...timeFormData, jobId: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Administrative</option>
                        {mockJobs.map(job => (
                          <option key={job.id} value={job.id}>{job.id} - {job.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={timeFormData.notes}
                        onChange={(e) => setTimeFormData({ ...timeFormData, notes: e.target.value })}
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
                    Save Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTimeModalOpen(false)}
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