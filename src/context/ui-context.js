'use client';

import { createContext, useContext, useState, useMemo } from 'react';

const UIContext = createContext(undefined);

export function UIProvider({ children }) {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      sidebarCollapsed,
      setSidebarCollapsed,
      mobileMenuOpen,
      setMobileMenuOpen,
    }),
    [activeSection, sidebarCollapsed, mobileMenuOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}