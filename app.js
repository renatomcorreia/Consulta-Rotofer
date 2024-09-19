document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const resultsDiv = document.getElementById('results');

    // Carrega o CSV
    fetch('dados.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignorar a linha de cabeçalho
            const items = rows.map(row => {
                const [referencia, designacao, localizacao] = row.split(',');
                return { referencia, designacao, localizacao };
            });

            // A função que será executada sempre que o usuário digitar algo
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.toLowerCase();
                const filteredItems = items.filter(item => 
                    item.referencia.toLowerCase().includes(query) || 
                    item.designacao.toLowerCase().includes(query)
                );

                // Exibir os resultados na tela
                resultsDiv.innerHTML = filteredItems.map(item => 
                    `<div><strong>${item.referencia}</strong> - ${item.designacao} (${item.localizacao})</div>`
                ).join('');
            });
        })
        .catch(error => {
            resultsDiv.innerHTML = "Erro ao carregar os dados.";
        });
});
