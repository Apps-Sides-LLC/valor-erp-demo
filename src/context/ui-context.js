"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

const UIContext = createContext(undefined);

export function UIProvider({ children }) {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [hasNavigated, setHasNavigated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldOpenEstimateModal, setShouldOpenEstimateModal] = useState(false);

  const handleSetActiveSection = useCallback(
    (section) => {
      setActiveSection(section);
      if (!hasNavigated) {
        setHasNavigated(true);
      }
    },
    [hasNavigated],
  );

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection: handleSetActiveSection,
      hasNavigated,
      sidebarCollapsed,
      setSidebarCollapsed,
      mobileMenuOpen,
      setMobileMenuOpen,
      shouldOpenEstimateModal,
      setShouldOpenEstimateModal,
    }),
    [
      activeSection,
      hasNavigated,
      handleSetActiveSection,
      sidebarCollapsed,
      mobileMenuOpen,
      shouldOpenEstimateModal,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
