import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addTaxPayerForm = document.getElementById('addTaxPayerForm');
    const searchTaxPayerForm = document.getElementById('searchTaxPayerForm');
    const taxPayerList = document.getElementById('taxPayerList');
    const searchResult = document.getElementById('searchResult');

    // Function to display all tax payers
    async function displayAllTaxPayers() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '';
        taxPayers.forEach(taxPayer => {
            const li = document.createElement('li');
            li.textContent = `TID: ${taxPayer.tid}, Name: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
            taxPayerList.appendChild(li);
        });
    }

    // Add new tax payer
    addTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        await backend.addTaxPayer(tid, firstName, lastName, address);
        addTaxPayerForm.reset();
        displayAllTaxPayers();
    });

    // Search for a tax payer
    searchTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(searchTid);

        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.textContent = `Found: TID: ${taxPayer.tid}, Name: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
        } else {
            searchResult.textContent = 'TaxPayer not found';
        }
    });

    // Initial display of all tax payers
    displayAllTaxPayers();
});
