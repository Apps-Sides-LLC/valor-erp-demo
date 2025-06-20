"use client";

import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  UsersIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  DocumentDuplicateIcon,
  CubeIcon,
  TruckIcon,
  ChartBarIcon,
  ClockIcon,
  CreditCardIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useUI } from "@/context/ui-context";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
  { name: "Customers", icon: UsersIcon, href: "/customers" },
  { name: "Estimates", icon: DocumentTextIcon, href: "/estimates" },
  { name: "Jobs", icon: BriefcaseIcon, href: "/jobs" },
  { name: "Time & Attendance", icon: ClockIcon, href: "/time" },
  { name: "Inventory", icon: CubeIcon, href: "/inventory" },
  { name: "Invoices", icon: CreditCardIcon, href: "/invoices" },
  { name: "Vendors", icon: TruckIcon, href: "/vendors" },
  { name: "Reports", icon: ChartBarIcon, href: "/reports" },
];

const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SidebarContent() {
  const { activeSection, setActiveSection } = useUI();
  const pathname = usePathname();

  // Extract the first segment of the path, e.g., "/test" => "test"
  const pathSegment = pathname.split("/")[1] || "";
  // Capitalize and append "ERP" if path segment exists, else default
  // I want plus signs in the path to become spaces.
  const sidebarTitle = pathSegment
    ? `${pathSegment.replace(/\+/g, " ").charAt(0).toUpperCase() + pathSegment.replace(/\+/g, " ").slice(1)} ERP`
    : "ERP";
  const firstLetter = sidebarTitle.charAt(0).toUpperCase();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex mt-6 h-16 shrink-0 items-center px-6">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{firstLetter}</span>
          </div>
          <span className="ml-3 text-xl font-bold text-white">
            {sidebarTitle}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <ul className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveSection(item.name)}
                className={classNames(
                  activeSection === item.name
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-300 hover:text-white hover:bg-gray-700",
                  "group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 transition-all duration-200 sidebar-item w-full text-left",
                )}
              >
                <item.icon
                  className={classNames(
                    activeSection === item.name
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white",
                    "h-5 w-5 shrink-0",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom section */}
        <div className="mt-auto">
          <div className="mb-4 px-3">
            <div className="rounded-lg bg-gray-800 p-3">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="ml-2 text-xs text-gray-300">
                  System Online
                </span>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                All services operational
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function Shell({ children }) {
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col bg-gray-800 px-4 pb-4">
              <SidebarContent />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 scrollbar-thin">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Search */}
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-transparent"
                placeholder="Search customers, jobs, invoices..."
                type="search"
                name="search"
              />
            </form>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-2 text-sm font-semibold leading-6 text-gray-900">
                      John Doe
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
