const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');  

const app = express();
const port = 3000;

app.use(cors()); //servidor aceita requisições de qualquer origem

// Middleware para interpretar o corpo das requisições em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '23084626',
  database: 'formulariocadastro',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota POST para cadastro de usuário
app.post('/cadastro', (req, res) => {
  const { username, email, password } = req.body;

  
  const sql = 'INSERT INTO usuarios (nick, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao salvar no banco:', err);
      return res.status(500).json({ message: 'Erro ao salvar os dados.' });
    }
    res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body; 

  
  const sql = 'SELECT * FROM usuarios WHERE nick = ? AND senha = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Erro ao consultar o banco:', err);
      return res.status(500).json({ message: 'Erro ao validar as credenciais.' });
    }

    if (result.length > 0) {
      // Se encontrar o usuário, envia sucesso
      res.status(200).json({ success: true, message: 'Login bem-sucedido!' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }
  });
});
