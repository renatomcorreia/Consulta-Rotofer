let data = [];

// Carrega os dados do CSV
fetch('dados.csv')
    .then(response => response.text())
    .then(text => {
        const rows = text.trim().split('\n');
        data = rows.slice(1).map(row => {
            const [referencia, designacao, localizacao] = row.split(';');
            return { referencia, designacao, localizacao: localizacao || 'N/A' };
        });
    })
    .catch(error => console.error('Erro ao carregar o CSV:', error));

// Função de pesquisa
function search() {
    const query = document.getElementById('search').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Substitui o caractere curinga por uma expressão regular
    const regexQuery = query.replace(/\*/g, '.*'); // Converte * para expressão regular que captura qualquer sequência
    const regex = new RegExp(regexQuery, 'i'); // 'i' para pesquisa sem diferenciar maiúsculas e minúsculas

    const results = data.filter(item => 
        regex.test(item.referencia.toLowerCase()) ||
        regex.test(item.designacao.toLowerCase())
    );

    if (results.length > 0) {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Referencia</th>
                <th>Designacao</th>
                <th>Localizacao</th>
            </tr>
        `;
        results.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.referencia}</td>
                <td>${item.designacao}</td>
                <td>${item.localizacao}</td>
            `;
            table.appendChild(row);
        });
        resultsDiv.appendChild(table);
    } else {
        resultsDiv.innerHTML = 'Nenhuma correspondência encontrada.';
    }
}
