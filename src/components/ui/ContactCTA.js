"use client";

import { useState } from "react";
import { useUI } from "@/context/ui-context";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ContactCTA() {
  const { hasNavigated } = useUI();
  const [isExpanded, setIsExpanded] = useState(false);

  // If user hasn't navigated yet, always show the full CTA
  // If user has navigated, show circle unless manually expanded
  const showFullCTA = !hasNavigated || isExpanded;

  const handleCircleClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showFullCTA ? (
        // Full CTA Box
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm transform transition-all duration-500 ease-out scale-100 opacity-100 animate-pulse-once">
          {/* Close button - only show if user has navigated (meaning this is expanded state) */}
          {hasNavigated && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-full p-1"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}

          <div className="space-y-4">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              Ready to get started?
            </h3>

            {/* Lead text */}
            <p className="text-gray-600 text-sm leading-relaxed">
              See how our ERP solution can transform your business operations.
              Get in touch with our team for a personalized demo.
            </p>

            {/* CTA Button */}
            <a
              href="https://appsandsides.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Contact Us
            </a>

            {/* Subtle branding */}
            <p className="text-xs text-gray-400 text-center">
              Powered by Apps & Sides
            </p>
          </div>
        </div>
      ) : (
        // Collapsed Circle
        <button
          onClick={handleCircleClick}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50 group"
        >
          <QuestionMarkCircleIcon className="h-7 w-7 transition-transform duration-200 group-hover:rotate-12" />
        </button>
      )}
    </div>
  );
}
