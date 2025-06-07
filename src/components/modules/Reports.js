"use client";

import { useState } from "react";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const mockFinancialData = {
  revenue: {
    thisMonth: 45280,
    lastMonth: 38650,
    thisYear: 425800,
    lastYear: 380450,
  },
  expenses: {
    thisMonth: 28450,
    lastMonth: 24200,
    thisYear: 268500,
    lastYear: 245800,
  },
  profit: {
    thisMonth: 16830,
    lastMonth: 14450,
    thisYear: 157300,
    lastYear: 134650,
  },
  cogs: {
    thisMonth: 18200,
    lastMonth: 15800,
    thisYear: 172400,
    lastYear: 158200,
  },
};

const mockJobReports = [
  {
    id: "J-2024-001",
    customer: "Downtown Hotel Group",
    title: "HVAC System Upgrade",
    estimatedHours: 180,
    actualHours: 195,
    estimatedCost: 32100,
    actualCost: 34668,
    profit: 12568,
    margin: 36.2,
    status: "Completed",
    startDate: "2024-01-05",
    endDate: "2024-01-20",
  },
  {
    id: "J-2024-002",
    customer: "ABC Construction LLC",
    title: "Office Renovation",
    estimatedHours: 240,
    actualHours: 185,
    estimatedCost: 15400,
    actualCost: 16632,
    profit: 5832,
    margin: 35.1,
    status: "In Progress",
    startDate: "2024-01-20",
    endDate: null,
  },
  {
    id: "J-2024-003",
    customer: "Smith Residence",
    title: "Kitchen Remodel",
    estimatedHours: 95,
    actualHours: 105,
    estimatedCost: 8200,
    actualCost: 8856,
    profit: 3456,
    margin: 39.0,
    status: "Completed",
    startDate: "2024-01-08",
    endDate: "2024-01-25",
  },
];

const mockTimeUtilization = [
  {
    employee: "Mike Johnson",
    billableHours: 165,
    totalHours: 185,
    utilization: 89.2,
  },
  {
    employee: "Sarah Wilson",
    billableHours: 152,
    totalHours: 180,
    utilization: 84.4,
  },
  {
    employee: "Tom Davis",
    billableHours: 140,
    totalHours: 175,
    utilization: 80.0,
  },
  {
    employee: "Lisa Chen",
    billableHours: 120,
    totalHours: 160,
    utilization: 75.0,
  },
];

const mockInventoryAging = [
  {
    category: "Electrical",
    current: 12500,
    over30: 3200,
    over60: 1800,
    over90: 500,
  },
  {
    category: "Plumbing",
    current: 8400,
    over30: 2100,
    over60: 900,
    over90: 200,
  },
  { category: "HVAC", current: 25600, over30: 4800, over60: 2200, over90: 800 },
  {
    category: "Hardware",
    current: 3200,
    over30: 800,
    over60: 400,
    over90: 150,
  },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 38500, expenses: 24200, profit: 14300 },
  { month: "Feb", revenue: 42100, expenses: 26800, profit: 15300 },
  { month: "Mar", revenue: 39800, expenses: 25100, profit: 14700 },
  { month: "Apr", revenue: 45200, expenses: 28900, profit: 16300 },
  { month: "May", revenue: 41600, expenses: 26200, profit: 15400 },
  { month: "Jun", revenue: 48900, expenses: 31200, profit: 17700 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [activeTab, setActiveTab] = useState("financial");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const calculatePercentageChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 };
  };

  const revenueChange = calculatePercentageChange(
    mockFinancialData.revenue.thisMonth,
    mockFinancialData.revenue.lastMonth,
  );

  const profitChange = calculatePercentageChange(
    mockFinancialData.profit.thisMonth,
    mockFinancialData.profit.lastMonth,
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Financial reports, business insights, and performance analytics
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <ArrowDownIcon className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("financial")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "financial"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Financial
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "jobs"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Job Performance
          </button>
          <button
            onClick={() => setActiveTab("time")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "time"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Time Utilization
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "inventory"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Inventory
          </button>
        </nav>
      </div>

      {/* Financial Tab */}
      {activeTab === "financial" && (
        <div>
          {/* Financial KPIs */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${mockFinancialData.revenue.thisMonth.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {revenueChange.isPositive ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      revenueChange.isPositive
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {revenueChange.value}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Gross Profit
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${mockFinancialData.profit.thisMonth.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {profitChange.isPositive ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      profitChange.isPositive
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {profitChange.value}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${mockFinancialData.expenses.thisMonth.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(
                      (mockFinancialData.expenses.thisMonth /
                        mockFinancialData.revenue.thisMonth) *
                      100
                    ).toFixed(1)}
                    % of revenue
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Profit Margin
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(
                      (mockFinancialData.profit.thisMonth /
                        mockFinancialData.revenue.thisMonth) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-sm text-gray-500">
                    {profitChange.isPositive ? "Up" : "Down"} from last month
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric("revenue")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedMetric === "revenue"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setSelectedMetric("profit")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedMetric === "profit"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  Profit
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyRevenue.map((data, index) => {
                const value =
                  selectedMetric === "revenue" ? data.revenue : data.profit;
                const maxValue = Math.max(
                  ...monthlyRevenue.map((d) =>
                    selectedMetric === "revenue" ? d.revenue : d.profit,
                  ),
                );
                const height = (value / maxValue) * 200;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-full rounded-t-lg ${
                        selectedMetric === "revenue"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      style={{ height: `${height}px` }}
                    ></div>
                    <div className="mt-2 text-xs text-gray-600">
                      {data.month}
                    </div>
                    <div className="text-xs font-medium text-gray-900">
                      ${value.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Year-to-Date Summary
              </h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Total Revenue</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${mockFinancialData.revenue.thisYear.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Total Expenses</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${mockFinancialData.expenses.thisYear.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Cost of Goods Sold</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${mockFinancialData.cogs.thisYear.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Net Profit
                  </dt>
                  <dd className="text-base font-bold text-green-600">
                    ${mockFinancialData.profit.thisYear.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Ratios
              </h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Gross Margin</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {(
                      (mockFinancialData.profit.thisYear /
                        mockFinancialData.revenue.thisYear) *
                      100
                    ).toFixed(1)}
                    %
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Operating Margin</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {(
                      ((mockFinancialData.revenue.thisYear -
                        mockFinancialData.expenses.thisYear) /
                        mockFinancialData.revenue.thisYear) *
                      100
                    ).toFixed(1)}
                    %
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">COGS Ratio</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {(
                      (mockFinancialData.cogs.thisYear /
                        mockFinancialData.revenue.thisYear) *
                      100
                    ).toFixed(1)}
                    %
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">YoY Growth</dt>
                  <dd className="text-sm font-medium text-green-600">
                    +
                    {(
                      ((mockFinancialData.revenue.thisYear -
                        mockFinancialData.revenue.lastYear) /
                        mockFinancialData.revenue.lastYear) *
                      100
                    ).toFixed(1)}
                    %
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      {/* Job Performance Tab */}
      {activeTab === "jobs" && (
        <div>
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Job Profitability Analysis
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Margin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockJobReports.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {job.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.customer}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>Est: {job.estimatedHours}h</div>
                          <div>Act: {job.actualHours}h</div>
                          <div
                            className={`text-xs ${
                              job.actualHours > job.estimatedHours
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {job.actualHours > job.estimatedHours ? "+" : ""}
                            {job.actualHours - job.estimatedHours}h
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>Est: ${job.estimatedCost.toLocaleString()}</div>
                          <div>Act: ${job.actualCost.toLocaleString()}</div>
                          <div
                            className={`text-xs ${
                              job.actualCost > job.estimatedCost
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {job.actualCost > job.estimatedCost ? "+" : ""}$
                            {(
                              job.actualCost - job.estimatedCost
                            ).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          ${job.profit.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.margin.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Job Performance Summary */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">
                Average Metrics
              </h4>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Profit Margin</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {(
                      mockJobReports.reduce((sum, job) => sum + job.margin, 0) /
                      mockJobReports.length
                    ).toFixed(1)}
                    %
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Hour Variance</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {(
                      mockJobReports.reduce(
                        (sum, job) =>
                          sum + (job.actualHours - job.estimatedHours),
                        0,
                      ) / mockJobReports.length
                    ).toFixed(1)}
                    h
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Cost Variance</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    $
                    {(
                      mockJobReports.reduce(
                        (sum, job) =>
                          sum + (job.actualCost - job.estimatedCost),
                        0,
                      ) / mockJobReports.length
                    ).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">
                Performance Indicators
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">On-Time Delivery</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Budget Adherence</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Quality Score</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">
                Total Profitability
              </h4>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Total Revenue</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    $
                    {mockJobReports
                      .reduce((sum, job) => sum + job.actualCost, 0)
                      .toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Total Profit</dt>
                  <dd className="text-sm font-medium text-green-600">
                    $
                    {mockJobReports
                      .reduce((sum, job) => sum + job.profit, 0)
                      .toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <dt className="text-base font-medium text-gray-900">
                    Overall Margin
                  </dt>
                  <dd className="text-base font-bold text-gray-900">
                    {(
                      (mockJobReports.reduce(
                        (sum, job) => sum + job.profit,
                        0,
                      ) /
                        mockJobReports.reduce(
                          (sum, job) => sum + job.actualCost,
                          0,
                        )) *
                      100
                    ).toFixed(1)}
                    %
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      {/* Time Utilization Tab */}
      {activeTab === "time" && (
        <div>
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Employee Time Utilization
              </h3>
              <div className="text-sm text-gray-500">
                Average Utilization:{" "}
                {(
                  mockTimeUtilization.reduce(
                    (sum, emp) => sum + emp.utilization,
                    0,
                  ) / mockTimeUtilization.length
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="space-y-6">
              {mockTimeUtilization.map((employee, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {employee.employee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {employee.employee}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.billableHours}h billable /{" "}
                          {employee.totalHours}h total
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {employee.utilization.toFixed(1)}%
                      </div>
                      <div
                        className={`text-sm ${
                          employee.utilization >= 85
                            ? "text-green-600"
                            : employee.utilization >= 75
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {employee.utilization >= 85
                          ? "Excellent"
                          : employee.utilization >= 75
                            ? "Good"
                            : "Needs Improvement"}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        employee.utilization >= 85
                          ? "bg-green-500"
                          : employee.utilization >= 75
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${employee.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Analysis */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">
                Time Distribution
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Billable Hours</span>
                  <span className="text-sm font-medium text-gray-900">
                    {mockTimeUtilization.reduce(
                      (sum, emp) => sum + emp.billableHours,
                      0,
                    )}
                    h
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Non-Billable Hours
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {mockTimeUtilization.reduce(
                      (sum, emp) => sum + (emp.totalHours - emp.billableHours),
                      0,
                    )}
                    h
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <span className="font-medium text-gray-900">Total Hours</span>
                  <span className="font-bold text-gray-900">
                    {mockTimeUtilization.reduce(
                      (sum, emp) => sum + emp.totalHours,
                      0,
                    )}
                    h
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">
                Productivity Insights
              </h4>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800">
                    High Performers
                  </div>
                  <div className="text-sm text-green-600">
                    {
                      mockTimeUtilization.filter((emp) => emp.utilization >= 85)
                        .length
                    }{" "}
                    employees (85%+ utilization)
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">
                    Average Performers
                  </div>
                  <div className="text-sm text-yellow-600">
                    {
                      mockTimeUtilization.filter(
                        (emp) => emp.utilization >= 75 && emp.utilization < 85,
                      ).length
                    }{" "}
                    employees (75-84% utilization)
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-sm font-medium text-red-800">
                    Needs Attention
                  </div>
                  <div className="text-sm text-red-600">
                    {
                      mockTimeUtilization.filter((emp) => emp.utilization < 75)
                        .length
                    }{" "}
                    employees (75% or more utilization)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === "inventory" && (
        <div>
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Inventory Aging Analysis
              </h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-gray-600">Current (0-30 days)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-gray-600">31-60 days</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                  <span className="text-gray-600">61-90 days</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span className="text-gray-600">90+ days</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                      Category
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      Current
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      31-60 Days
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      61-90 Days
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      90+ Days
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockInventoryAging.map((category, index) => {
                    const total =
                      category.current +
                      category.over30 +
                      category.over60 +
                      category.over90;
                    return (
                      <tr key={index}>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          {category.category}
                        </td>
                        <td className="text-right py-4 text-sm text-gray-900">
                          ${category.current.toLocaleString()}
                        </td>
                        <td className="text-right py-4 text-sm text-gray-900">
                          ${category.over30.toLocaleString()}
                        </td>
                        <td className="text-right py-4 text-sm text-gray-900">
                          ${category.over60.toLocaleString()}
                        </td>
                        <td className="text-right py-4 text-sm text-gray-900">
                          ${category.over90.toLocaleString()}
                        </td>
                        <td className="text-right py-4 text-sm font-medium text-gray-900">
                          ${total.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Insights */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">Aging Summary</h4>
              <div className="space-y-3">
                {["current", "over30", "over60", "over90"].map(
                  (period, index) => {
                    const total = mockInventoryAging.reduce(
                      (sum, cat) => sum + cat[period],
                      0,
                    );
                    const percentage =
                      (total /
                        mockInventoryAging.reduce(
                          (sum, cat) =>
                            sum +
                            cat.current +
                            cat.over30 +
                            cat.over60 +
                            cat.over90,
                          0,
                        )) *
                      100;
                    const colors = [
                      "bg-green-500",
                      "bg-yellow-500",
                      "bg-orange-500",
                      "bg-red-500",
                    ];
                    const labels = [
                      "Current",
                      "31-60 Days",
                      "61-90 Days",
                      "90+ Days",
                    ];

                    return (
                      <div key={period}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{labels[index]}</span>
                          <span className="font-medium">
                            ${total.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${colors[index]} h-2 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {percentage.toFixed(1)}% of total
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">
                Slow-Moving Inventory
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm font-medium text-orange-800">
                    Items 60+ Days Old
                  </div>
                  <div className="text-sm text-orange-600">
                    $
                    {mockInventoryAging
                      .reduce((sum, cat) => sum + cat.over60 + cat.over90, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-xs text-orange-500 mt-1">
                    {(
                      (mockInventoryAging.reduce(
                        (sum, cat) => sum + cat.over60 + cat.over90,
                        0,
                      ) /
                        mockInventoryAging.reduce(
                          (sum, cat) =>
                            sum +
                            cat.current +
                            cat.over30 +
                            cat.over60 +
                            cat.over90,
                          0,
                        )) *
                      100
                    ).toFixed(1)}
                    % of total inventory
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-sm font-medium text-red-800">
                    Dead Stock (90+ Days)
                  </div>
                  <div className="text-sm text-red-600">
                    $
                    {mockInventoryAging
                      .reduce((sum, cat) => sum + cat.over90, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-xs text-red-500 mt-1">
                    Requires immediate attention
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h4 className="font-medium text-gray-900 mb-4">
                Recommendations
              </h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800">
                    Action Required
                  </div>
                  <div className="text-blue-600">
                    Review HVAC category items over 60 days old
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800">
                    Good Performance
                  </div>
                  <div className="text-green-600">
                    Hardware category shows healthy turnover
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800">Monitor</div>
                  <div className="text-yellow-600">
                    Electrical inventory levels increasing
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
