$(document).ready(function() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    localStorage.setItem('theme', savedTheme !== null ? savedTheme : (prefersDark ? 'dark' : 'light'));
    
    let currentTheme = savedTheme !== null ? savedTheme : (prefersDark ? 'dark' : 'light');
    $('.icon-timer').attr('src', currentTheme == 'light' ? 'resources/icon-timer_light.svg' : 'resources/icon-timer.svg')
    $('html').attr('data-theme', currentTheme);    

    const toggleButton = $('#toggle-theme-button');
    toggleButton.on('click', toggleTheme);
})

let index = 1;
function toggleTheme() {
    const savedTheme = localStorage.getItem('theme');
    let newTheme = savedTheme === 'light' ? 'dark' : 'light';
    console.log(savedTheme, newTheme, index);
    index = index + 1;

    
    localStorage.setItem('theme', newTheme);
    
    $('html').attr('data-theme', newTheme);
    $('.icon-timer').attr('src', newTheme == 'light' ? 'resources/icon-timer_light.svg' : 'resources/icon-timer.svg')
}