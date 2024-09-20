document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value.trim().toLowerCase().replace('*', '.*');
    
    fetch('dados.csv')
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split('\n').slice(1); // Remove header
            const regex = new RegExp(query);
            const results = rows.filter(row => {
                const [ref, designacao] = row.split(';');
                return regex.test(ref.toLowerCase()) || regex.test(designacao?.toLowerCase());
            });
            
            displayResults(results);
        });
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.textContent = 'Nenhuma correspondência encontrada.';
        return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['Referência', 'Designação', 'Localização'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    results.forEach(row => {
        const rowElement = document.createElement('tr');
        const cols = row.split(';');
        cols.forEach(col => {
            const td = document.createElement('td');
            td.textContent = col.trim();
            rowElement.appendChild(td);
        });
        table.appendChild(rowElement);
    });

    resultsDiv.appendChild(table);
}
