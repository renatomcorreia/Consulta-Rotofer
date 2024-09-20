// Espera o DOM carregar para iniciar a lógica
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o campo de entrada de pesquisa pelo seu ID
    const searchInput = document.getElementById('search-input');

    // Evento para buscar resultados quando o usuário digita no campo de entrada
    searchInput.addEventListener('input', function () {
        // Obtém o valor da pesquisa, remove espaços em branco e transforma em minúsculas
        // Substitui '*' por uma expressão regular que aceita qualquer sequência de caracteres
        const query = this.value.trim().toLowerCase().replace('*', '.*'); 
        
        // Faz o download do arquivo CSV
        fetch('dados.csv') 
            .then(response => response.text()) // Converte a resposta para texto
            .then(csvText => {
                // Divide o texto CSV em linhas e remove o cabeçalho
                const rows = csvText.split('\n').slice(1); 
                // Cria uma expressão regular com a consulta
                const regex = new RegExp(query); 
                
                // Filtra as linhas do CSV para encontrar correspondências
                const results = rows.filter(row => {
                    // Divide a linha em colunas (referência e designação)
                    const [ref, designacao] = row.split(';');
                    // Testa se a referência ou designação correspondem ao padrão da expressão regular
                    return regex.test(ref.toLowerCase()) || regex.test(designacao?.toLowerCase());
                });
                
                // Exibe os resultados encontrados
                displayResults(results); 
            });
    });

    // Função para exibir os resultados da pesquisa
    function displayResults(results) {
        // Seleciona a div onde os resultados serão exibidos
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Limpa resultados anteriores

        // Verifica se não há resultados e exibe mensagem correspondente
        if (results.length === 0) {
            resultsDiv.textContent = 'Nenhuma correspondência encontrada.'; 
            return; // Sai da função se não houver resultados
        }

        // Cria uma tabela para exibir os resultados
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        
        // Cria os cabeçalhos da tabela
        ['Referência', 'Designação', 'Localização'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText; // Define o texto do cabeçalho
            headerRow.appendChild(th); // Adiciona o cabeçalho à linha
        });
        
        table.appendChild(headerRow); // Adiciona a linha de cabeçalho à tabela

        // Percorre os resultados e cria uma linha para cada
        results.forEach(row => {
            const rowElement = document.createElement('tr');
            const cols = row.split(';'); // Divide a linha em colunas
            
            // Cria uma célula para cada coluna
            cols.forEach(col => {
                const td = document.createElement('td');
                td.textContent = col.trim(); // Define o texto da célula
                rowElement.appendChild(td); // Adiciona a célula à linha
            });
            
            table.appendChild(rowElement); // Adiciona a linha à tabela
        });

        resultsDiv.appendChild(table); // Adiciona a tabela aos resultados exibidos
    }
});
