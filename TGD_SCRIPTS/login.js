document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();  // Impede o envio padrão do formulário

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())  
        .then(data => {
            console.log(data);  
            if (data.message === 'Login bem-sucedido!') {
                window.location.href = 'Paginainicial.html';  
            } else {
                alert('Credenciais incorretas. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao tentar fazer login:', error);
            alert('Houve um erro. Tente novamente mais tarde.');
        });
    });
});
