const express = require('express');
const path = require('path');
const app = express();

app.use(express.json()); // Para processar JSON no corpo da requisição

// Servir a página de configuração
app.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Retornar os parâmetros configuráveis
app.get('/params', (req, res) => {
    res.json([
        { name: "num_questions", label: "Number of Questions", type: "select", options: [5, 10, 15, 20, 30, 50] },
        { name: "category", label: "Category", type: "select", options: ["general knowledge", "books", "science"] },
        { name: "difficulty", label: "Difficulty", type: "select", options: ["easy", "medium", "hard"] },
        { name: "time", label: "Time per Question", type: "select", options: [10, 15, 20, 30] }
    ]);
});

// Gerenciar deploy da atividade
app.post('/deploy', (req, res) => {
    const { activityID, InvenIRAstdID, json_params } = req.body;
    const studentUrl = `https://quiz-gamify.onrender.com/activity/${activityID}/student/${InvenIRAstdID}`;
    res.json({ url: studentUrl });
});

// Retornar dados analíticos da atividade
app.post('/analytics', (req, res) => {
    const analyticsData = [
        {
            "inveniraStdID": "std_1",
            "quantAnalytics": [
                { "name": "Acedeu à atividade", "value": true },
                { "name": "Pontuação total", "value": 7 },
                { "name": "Percentagem de respostas corretas", "value": "70.0" }
            ],
            "qualAnalytics": [
                { "Perfil de Desempenho": "https://url-analytics/perfil/std_1" }
            ]
        }
    ];
    res.json(analyticsData);
});

// Retornar lista de analytics disponíveis
app.get('/analytics-list', (req, res) => {
    res.json([
        { name: "Acedeu à atividade", type: "boolean" },
        { name: "Pontuação total", type: "numeric" },
        { name: "Percentagem de respostas corretas", type: "percentage" }
    ]);
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Service running on http://localhost:3000');
});
