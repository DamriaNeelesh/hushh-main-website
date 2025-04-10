'use client';

import React from 'react';

/**
 * StructuredData Component - Injects JSON-LD structured data into pages
 * 
 * @param {Object} props
 * @param {Object|Array} props.data - The structured data object or array of objects
 * @returns {React.ReactElement} Script element with JSON-LD data
 */
const StructuredData = ({ data }) => {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData; 