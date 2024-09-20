// Espera o DOM carregar para iniciar a lógica
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');

    // Evento para buscar resultados quando o usuário digita
    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase().replace('*', '.*'); // Substitui '*' por regex
        fetch('dados.csv') // Faz o download do arquivo CSV
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.split('\n').slice(1); // Remove o cabeçalho
                const regex = new RegExp(query); // Cria uma expressão regular
                const results = rows.filter(row => {
                    const [ref, designacao] = row.split(';');
                    // Testa se a referência ou designação correspondem ao padrão
                    return regex.test(ref.toLowerCase()) || regex.test(designacao?.toLowerCase());
                });
                
                displayResults(results); // Exibe os resultados
            });
    });

    // Função para exibir os resultados
    function displayResults(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Limpa resultados anteriores

        if (results.length === 0) {
            resultsDiv.textContent = 'Nenhuma correspondência encontrada.'; // Mensagem se não houver resultados
            return;
        }

        // Cria uma tabela para exibir os resultados
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

        resultsDiv.appendChild(table); // Adiciona a tabela aos resultados
    }
});
