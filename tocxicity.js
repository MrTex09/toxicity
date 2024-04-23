let model;

// Cargar el modelo de toxicidad
toxicity.load(0.85).then(loadedModel => {
    model = loadedModel;
    console.log("Modelo cargado.");
});

function checkToxicity() {
    const text = document.getElementById('textinput').value;
    if (!text.trim()) {
        alert("Por favor, ingresa un texto para analizar.");
        return;
    }

    model.classify([text]).then(predictions => {
        document.getElementById('results').innerHTML = '';
        predictions.forEach(prediction => {
            const label = prediction.label;
            const results = prediction.results[0];
            const match = results.match;
            const probability = results.probabilities[1];  

            const elem = document.createElement('div');
            elem.textContent = `¿${label}? ${match ? 'Sí' : 'No'} - Probabilidad: ${(probability * 100).toFixed(2)}%`;
            document.getElementById('results').appendChild(elem);
        });
    });
}
