function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchBtn = document.querySelector('.search-btn');
    const arrow = searchBtn.querySelector('.arrow');  // Seleciona o ícone da seta

    // Adiciona ou remove a classe 'open' tanto no menu quanto no botão
    searchBar.classList.toggle('open');  // Exibe/oculta o menu de pesquisa
    searchBtn.classList.toggle('open');  // Move o botão junto com o menu
    
    // Alterna a direção da seta
    if (searchBar.classList.contains('open')) {
        arrow.classList.replace('fa-arrow-up', 'fa-arrow-down');  // Troca para a seta para baixo
    } else {
        arrow.classList.replace('fa-arrow-down', 'fa-arrow-up');  // Troca para a seta para cima
    }
}