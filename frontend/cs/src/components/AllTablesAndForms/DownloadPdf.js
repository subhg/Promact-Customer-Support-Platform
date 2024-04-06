import React, { useState } from 'react';

const DownloadPdf= () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);

      // Make a GET request to the backend endpoint
      const response = await fetch('http://localhost:3000/generate-pdf');

      // Get the response as blob
      const pdfBlob = await response.blob();

      // Create a URL for the blob
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'Customer_Success.pdf');
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      setDownloading(false);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setDownloading(false);
    }
  };

  return (
    <div>
      <button className='button' onClick={handleDownloadPdf} disabled={downloading}>
        {downloading ? 'Downloading...' : 'Download PDF'}
      </button>
    </div>
  );
};

export default DownloadPdf;
