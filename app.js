document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase().replace(/\*/g, '.*'); // Suporte para '*'
    const regex = new RegExp(query);

    fetch('/dados.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n').map(line => line.split(';'));

        // Filtra os resultados usando regex para corresponder ao caractere curinga
        const results = lines.filter(item => 
            regex.test(item[0].toLowerCase()) || 
            (item[1] && regex.test(item[1].toLowerCase()))
        );
        
        displayResults(results);
      })
      .catch(error => {
        console.error('Erro ao carregar CSV:', error);
        document.getElementById('results').innerHTML = 'Erro ao carregar dados.';
      });
});

function displayResults(results) {
    if (results.length === 0) {
        document.getElementById('results').innerHTML = 'Nenhuma correspondência encontrada.';
        return;
    }
    
    // Criação da tabela para exibir os resultados de forma organizada
    let table = '<table><tr><th>Referência</th><th>Designação</th><th>Localização</th></tr>';
    results.forEach(result => {
        table += `<tr><td>${result[0]}</td><td>${result[1]}</td><td>${result[2] || ''}</td></tr>`;
    });
    table += '</table>';
    
    document.getElementById('results').innerHTML = table;
}
