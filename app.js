document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    fetch('/dados.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n').map(line => line.split(';'));
        const results = lines.filter(item => 
            item[0].toLowerCase().includes(query) || 
            (item[1] && item[1].toLowerCase().includes(query))
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
    
    let table = '<table><tr><th>Referência</th><th>Designação</th><th>Localização</th></tr>';
    results.forEach(result => {
        table += `<tr><td>${result[0]}</td><td>${result[1]}</td><td>${result[2] || ''}</td></tr>`;
    });
    table += '</table>';
    
    document.getElementById('results').innerHTML = table;
}
