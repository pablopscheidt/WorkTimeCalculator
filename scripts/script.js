$(document).ready(function() {
    // script para o checkbox personalizado realizar a função do check nativo.
    $('.carga-hor .checkbox-styled input[checked]').closest('.checkbox-styled').addClass('checked'); 

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

    $('.banco-horas .checkbox-banco .checkbox-styled').on('click', function() {
        $(this).next('label').click();
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
            $('.meu-banco-horas').animate({ "height": "150" }, "slow" )
        } else {
            $('.meu-banco-horas').animate({ "height": "0" }, "slow" )
        }
    })
});