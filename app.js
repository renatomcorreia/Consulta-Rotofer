document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const resultsDiv = document.getElementById('results');

    // Carrega o CSV
    fetch('dados.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignorar a linha de cabeçalho
            const items = rows.map(row => {
                const columns = row.split(',');

                // Verifica se há pelo menos 3 colunas
                if (columns.length >= 3) {
                    const referencia = columns[0] ? columns[0].trim() : ''; // Garantir que seja uma string
                    const designacao = columns[1] ? columns[1].trim() : ''; // Garantir que seja uma string
                    const localizacao = columns[2] ? columns[2].trim() : 'Sem localização'; // Tratamento para localização
                    return { referencia, designacao, localizacao };
                }
                return null; // Ignora linhas mal formatadas
            }).filter(item => item !== null); // Remove entradas nulas

            // A função que será executada sempre que o usuário digitar algo
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.toLowerCase().trim();

                const filteredItems = items.filter(item => {
                    // Verificações rigorosas para evitar valores indefinidos
                    const referenciaMatch = item.referencia && typeof item.referencia === 'string' && item.referencia.toLowerCase().includes(query);
                    const designacaoMatch = item.designacao && typeof item.designacao === 'string' && item.designacao.toLowerCase().includes(query);
                    return referenciaMatch || designacaoMatch;
                });

                // Exibir os resultados na tela
                resultsDiv.innerHTML = filteredItems.map(item => 
                    `<div><strong>${item.referencia}</strong> - ${item.designacao} (${item.localizacao})</div>`
                ).join('');

                // Caso não haja resultados
                if (filteredItems.length === 0) {
                    resultsDiv.innerHTML = '<div>Nenhuma referência encontrada</div>';
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo CSV:', error);
            resultsDiv.innerHTML = "Erro ao carregar os dados.";
        });
});
