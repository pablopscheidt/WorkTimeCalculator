$(document).ready(function() {
    // script para o checkbox personalizado realizar a função do check nativo.
    $('.carga-hor .checkbox-styled').on('click', function() {
        $(this).next('label').click();
        $('.carga-hor .checkbox-styled').removeClass('checked');
        if ($(this).children().is(':checked')) {
            $(this).addClass('checked')
        }
    })

    $('.autocomplete-content .checkbox-styled').on('click', function() {
        $(this).next('label').click();
        $(this).toggleClass('checked');
    })
});