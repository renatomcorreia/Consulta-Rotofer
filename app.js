document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const resultsDiv = document.getElementById('results');

    // Função para carregar o CSV e processá-lo
    fetch('dados.csv')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar o CSV');
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignora a linha de cabeçalho
            const items = rows.map(row => {
                const columns = row.split(',');

                // Verifica se há pelo menos 3 colunas e trata campos vazios
                if (columns.length >= 3) {
                    const referencia = columns[0] ? columns[0].trim() : '';
                    const designacao = columns[1] ? columns[1].trim() : '';
                    const localizacao = columns[2] ? columns[2].trim() : 'Sem localização';
                    return { referencia, designacao, localizacao };
                }
                return null; // Ignora linhas mal formatadas
            }).filter(item => item !== null); // Remove entradas nulas

            // Função que será executada sempre que o usuário digitar algo
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.toLowerCase().trim();

                // Se o campo de busca estiver vazio, não faz nada
                if (query === '') {
                    resultsDiv.innerHTML = '<div>Por favor, insira um termo para buscar.</div>';
                    return;
                }

                const filteredItems = items.filter(item => {
                    const referenciaMatch = item.referencia && item.referencia.toLowerCase().includes(query);
                    const designacaoMatch = item.designacao && item.designacao.toLowerCase().includes(query);
                    return referenciaMatch || designacaoMatch;
                });

                // Exibir os resultados na tela
                resultsDiv.innerHTML = filteredItems.map(item =>
                    `<div><strong>${item.referencia}</strong> - ${item.designacao} (${item.localizacao})</div>`
                ).join('');

                // Caso não haja resultados
                if (filteredItems.length === 0) {
                    resultsDiv.innerHTML = '<div>Nenhuma correspondência encontrada.</div>';
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo CSV:', error);
            resultsDiv.innerHTML = "Erro ao carregar os dados.";
        });
});
