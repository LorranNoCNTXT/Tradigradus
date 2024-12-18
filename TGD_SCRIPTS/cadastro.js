document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('form'); 
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const passwordConfirmation = document.getElementById('password-confirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs(); 
  });

  function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    // Validação de campos
    if (usernameValue === "") {
      setErrorFor(username, "O nome de usuário é obrigatório.");
    } else {
      setSuccessFor(username);
    }

    if (emailValue === "") {
      setErrorFor(email, "O email é obrigatório.");
    } else if (!checkEmail(emailValue)) {
      setErrorFor(email, "Por favor, insira um email válido.");
    } else {
      setSuccessFor(email);
    }

    if (passwordValue === "") {
      setErrorFor(password, "A senha é obrigatória.");
    } else if (passwordValue.length < 7) {
      setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
    } else {
      setSuccessFor(password);
    }

    if (passwordConfirmationValue === "") {
      setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.");
    } else if (passwordConfirmationValue !== passwordValue) {
      setErrorFor(passwordConfirmation, "As senhas não conferem.");
    } else {
      setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll(".form-control");
    const formIsValid = [...formControls].every((formControl) => {
      return formControl.className === "form-control success";
    });

    if (formIsValid) {
      console.log("O formulário está 100% válido!");

      fetch('http://localhost:3000/cadastro', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);

        // Exibir popup de sucesso
        alert("Cadastro concluído!");

        // Redirecionar para a página de login
        window.location.href = "../TGD_HTML/Login.html";
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;
    formControl.className = "form-control error";
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
});
