// ==UserScript==
// @name         PDF Storm
// @version      1.8
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
        console.debug('Downloading file from URL:', url); // DEBUG
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
            console.debug('Successfully downloaded file:', url); // DEBUG

            // Add to success list
            const successItem = document.createElement('li');
            const successLink = document.createElement('a');
            successLink.href = url;
            successLink.textContent = url.length > 30 ? url.substring(0, 15) + '...' + url.substring(url.length - 10) : url;
            successLink.title = url;
            successLink.style.color = '#1E90FF';
            successLink.style.textDecoration = 'none';
            successLink.style.overflowWrap = 'break-word';
            successItem.appendChild(successLink);
            successList.appendChild(successItem);
        } catch (error) {
            console.error('Failed to download file:', error);

            // Add to error list with error details
            const errorItem = document.createElement('li');
            const errorLink = document.createElement('a');
            errorLink.href = url;
            errorLink.textContent = url.length > 30 ? url.substring(0, 15) + '...' + url.substring(url.length - 10) : url;
            errorLink.title = url;
            errorLink.style.color = '#FF4500';
            errorLink.style.textDecoration = 'none';
            errorLink.style.overflowWrap = 'break-word';
            const errorDetails = document.createElement('details');
            errorDetails.textContent = error.toString();
            errorItem.appendChild(errorLink);
            errorItem.appendChild(errorDetails);
            errorList.appendChild(errorItem);
        }
    }

    // Function to find and download PDF links
    function findAndDownloadPDFs() {
        console.debug('Finding PDF links on the page'); // DEBUG
        const successList = document.getElementById('download-success-list');
        const errorList = document.getElementById('download-error-list');
        successList.innerHTML = '';
        errorList.innerHTML = '';

        const pdfLinks = Array.from(document.querySelectorAll('a[href$=".pdf"], a[href*=".pdf?"]'));
        console.debug('Found PDF links:', pdfLinks); // DEBUG
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
        button.style.padding = '12px';
        button.style.backgroundColor = '#1E90FF';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '24px';
        button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
        button.style.fontSize = '16px';
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
        statusContainer.style.backgroundColor = '#333';
        statusContainer.style.border = '1px solid #555';
        statusContainer.style.borderRadius = '12px';
        statusContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
        statusContainer.style.maxHeight = '400px';
        statusContainer.style.overflowY = 'auto';
        statusContainer.style.width = '320px';
        statusContainer.style.display = 'none';

        // Toggle visibility button
        const toggleButton = document.createElement('button');
        toggleButton.style.position = 'fixed';
        toggleButton.style.top = '10px';
        toggleButton.style.right = '10px';
        toggleButton.style.zIndex = 1000;
        toggleButton.style.width = '48px';
        toggleButton.style.height = '48px';
        toggleButton.style.backgroundColor = '#28a745';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '50%';
        toggleButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
        toggleButton.style.cursor = 'pointer';
        toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18h14v2H5z"/></svg>';
        toggleButton.onclick = () => {
            statusContainer.style.display = (statusContainer.style.display === 'none') ? 'block' : 'none';
        };
        document.body.appendChild(toggleButton);

        // Create lists for download status
        const tabContainer = document.createElement('div');
        tabContainer.style.display = 'flex';
        tabContainer.style.justifyContent = 'space-around';
        tabContainer.style.marginBottom = '10px';

        const successTab = document.createElement('button');
        successTab.textContent = '成功下載';
        successTab.style.flex = '1';
        successTab.style.padding = '10px';
        successTab.style.cursor = 'pointer';
        successTab.style.border = 'none';
        successTab.style.borderRadius = '12px 0 0 12px';
        successTab.style.backgroundColor = '#1E90FF';
        successTab.style.color = 'white';
        successTab.onclick = () => {
            document.getElementById('success-section').style.display = 'block';
            document.getElementById('error-section').style.display = 'none';
            successTab.style.backgroundColor = '#1E90FF';
            errorTab.style.backgroundColor = '#555';
            successTab.style.color = 'white';
            errorTab.style.color = 'black';
        };
        tabContainer.appendChild(successTab);

        const errorTab = document.createElement('button');
        errorTab.textContent = '失敗下載';
        errorTab.style.flex = '1';
        errorTab.style.padding = '10px';
        errorTab.style.cursor = 'pointer';
        errorTab.style.border = 'none';
        errorTab.style.borderRadius = '0 12px 12px 0';
        errorTab.style.backgroundColor = '#555';
        errorTab.style.color = 'black';
        errorTab.onclick = () => {
            document.getElementById('success-section').style.display = 'none';
            document.getElementById('error-section').style.display = 'block';
            errorTab.style.backgroundColor = '#1E90FF';
            successTab.style.backgroundColor = '#555';
            errorTab.style.color = 'white';
            successTab.style.color = 'black';
        };
        tabContainer.appendChild(errorTab);

        statusContainer.appendChild(tabContainer);

        const successSection = document.createElement('div');
        successSection.id = 'success-section';
        successSection.style.display = 'block';
        statusContainer.appendChild(successSection);

        const errorSection = document.createElement('div');
        errorSection.id = 'error-section';
        errorSection.style.display = 'none';
        statusContainer.appendChild(errorSection);

        const successList = document.createElement('ul');
        successList.id = 'download-success-list';
        successList.style.listStyle = 'none';
        successList.style.padding = '0';
        successList.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        successList.style.color = '#fff';
        successSection.appendChild(successList);

        const errorList = document.createElement('ul');
        errorList.id = 'download-error-list';
        errorList.style.listStyle = 'none';
        errorList.style.padding = '0';
        errorList.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        errorList.style.color = '#fff';
        errorSection.appendChild(errorList);

        document.body.appendChild(statusContainer);
        console.debug('Download interface created'); // DEBUG
    }

    // Add the button and status lists to the page
    createDownloadInterface();
})();