function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Fecha o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.usericon, .usericon *')) {
        var dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function(dropdown) {
            dropdown.style.display = 'none';
        });
    }
}