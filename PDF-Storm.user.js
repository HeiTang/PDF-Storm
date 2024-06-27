// ==UserScript==
// @name         PDF Storm
// @version      1.7
// @description  Download all PDFs from a page with a single click
// @license      MIT
// @Source       https://github.com/HeiTang/PDF-Storm/raw/main/PDF-Storm.user.js
// @namespace    https://github.com/HeiTang/PDF-Storm/raw/main/PDF-Storm.user.js
// @author       HeiTang
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('Userscript is running');

    // Function to download a file using Fetch API and Blob
    async function downloadFile(url, successList, errorList) {
        console.log('Downloading file:', url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = url.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

            // Add to success list
            const successItem = document.createElement('li');
            successItem.textContent = url;
            successList.appendChild(successItem);
        } catch (error) {
            console.error('Failed to download file:', error);

            // Add to error list with error details
            const errorItem = document.createElement('li');
            const errorSummary = document.createElement('summary');
            errorSummary.textContent = url;
            const errorDetails = document.createElement('details');
            errorDetails.textContent = error.toString();
            errorDetails.appendChild(errorSummary);
            errorList.appendChild(errorDetails);
        }
    }

    // Function to find and download PDF links
    function findAndDownloadPDFs() {
        const successList = document.getElementById('download-success-list');
        const errorList = document.getElementById('download-error-list');
        successList.innerHTML = '';
        errorList.innerHTML = '';

        const pdfLinks = Array.from(document.querySelectorAll('a[href$=".pdf"], a[href*=".pdf?"]'));
        console.log('Found PDF links:', pdfLinks);
        pdfLinks.forEach(link => downloadFile(link.href, successList, errorList));
    }

    // Create a button to trigger the download and lists to show status
    function createDownloadInterface() {
        // Create the main button
        const button = document.createElement('button');
        button.textContent = 'Download All PDFs';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '60px'; // Adjusted position to avoid overlap
        button.style.zIndex = 1000;
        button.style.padding = '10px';
        button.style.backgroundColor = '#007bff';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '12px';
        button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        button.style.fontSize = '14px';
        button.style.cursor = 'pointer';
        button.onclick = findAndDownloadPDFs;
        document.body.appendChild(button);

        // Create status container
        const statusContainer = document.createElement('div');
        statusContainer.style.position = 'fixed';
        statusContainer.style.top = '60px';
        statusContainer.style.right = '10px';
        statusContainer.style.zIndex = 1000;
        statusContainer.style.padding = '10px';
        statusContainer.style.backgroundColor = 'white';
        statusContainer.style.border = '1px solid #ccc';
        statusContainer.style.borderRadius = '12px';
        statusContainer.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        statusContainer.style.maxHeight = '400px';
        statusContainer.style.overflowY = 'auto';
        statusContainer.style.width = '300px';
        statusContainer.style.display = 'none'; // Initially hidden

        // Toggle visibility button
        const toggleButton = document.createElement('button');
        toggleButton.style.position = 'fixed';
        toggleButton.style.top = '10px';
        toggleButton.style.right = '10px';
        toggleButton.style.zIndex = 1000;
        toggleButton.style.width = '40px';
        toggleButton.style.height = '40px';
        toggleButton.style.backgroundColor = '#28a745';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '50%';
        toggleButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        toggleButton.style.cursor = 'pointer';
        toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18h14v2H5z"/></svg>';
        toggleButton.onclick = () => {
            statusContainer.style.display = (statusContainer.style.display === 'none') ? 'block' : 'none';
        };
        document.body.appendChild(toggleButton);

        // Create lists for download status
        const successTitle = document.createElement('h3');
        successTitle.textContent = 'Success Downloads';
        successTitle.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        successTitle.style.color = '#333';
        statusContainer.appendChild(successTitle);

        const successList = document.createElement('ul');
        successList.id = 'download-success-list';
        successList.style.listStyle = 'none';
        successList.style.padding = '0';
        statusContainer.appendChild(successList);

        const errorTitle = document.createElement('h3');
        errorTitle.textContent = 'Failed Downloads';
        errorTitle.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        errorTitle.style.color = '#333';
        statusContainer.appendChild(errorTitle);

        const errorList = document.createElement('ul');
        errorList.id = 'download-error-list';
        errorList.style.listStyle = 'none';
        errorList.style.padding = '0';
        statusContainer.appendChild(errorList);

        document.body.appendChild(statusContainer);
    }

    // Add the button and status lists to the page
    createDownloadInterface();
})();