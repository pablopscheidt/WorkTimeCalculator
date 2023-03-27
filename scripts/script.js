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
        completaAutomatico();
    })

    // Animação para abrir o banco de horas
    $('.banco-horas .checkbox-banco .checkbox-styled').on('click', function() {
        $(this).next('label').click();
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
            $('.meu-banco-horas').animate({ "height": "150" }, 100 )
        } else {
            $('.meu-banco-horas').animate({ "height": "0" }, 100 )
        }
    })

    //Passar para o proximo input quando preenchido
    var inputs = $('.input-timer input');
    inputs.on('keyup', function(e) {
        if ($(this).val().replace(/[^0-9]/g,'').length === 4) {
          var index = inputs.index(this);
          inputs.eq(index + 1).focus();
        }
    });

   // Aqui começa os scripts para calcular
    let cargaHoraria = 528;
    $('.carga-hor input').on('change', function() {
        if ($('#six-hours').is(':checked')) {
            cargaHoraria = 360; //6:00
        } else {
            cargaHoraria = 528; //8:48
        }
        completaAutomatico();
    });

    function calculoHoras() {
        // Primeira metade do dia
        let entrada1 = $('#entrada1').val().split(':')
        let he1 = parseInt(entrada1[0]);
        let me1 = parseInt(entrada1[1]);
        let minEFirstHalf = (he1 * 60) + me1;
        
        let saida1 = $('#saida1').val().split(':')
        let hs1 = parseInt(saida1[0]);
        let ms1 = parseInt(saida1[1]);
        let minSFirstHalf = (hs1 * 60) + ms1;

        let firstHalf = minSFirstHalf - minEFirstHalf;

        // Segunda Metade do dia 
        let entrada2 = $('#entrada2').val().split(':')
        let he2 = parseInt(entrada2[0]);
        let me2 = parseInt(entrada2[1]);
        let minESecondHalf = (he2 * 60) + me2;
        
        let saida2 = $('#saida2').val().split(':')
        let hs2 = parseInt(saida2[0]);
        let ms2 = parseInt(saida2[1]);
        let minSSecondHalf = (hs2 * 60) + ms2;

        let secondHalf = minSSecondHalf - minESecondHalf;

        // Calculo total 
        let minuto = (secondHalf + firstHalf)%60;
        let hora = ((secondHalf + firstHalf) - minuto)/60;
        hora = (`00${hora}`).slice(-2);
        minuto = (`00${minuto}`).slice(-2);
        let resultado = (`${hora}:${minuto}`)
        
        if (resultado != 'aN:aN') {
            $('.resultadoTotalHoras .resultado').text(resultado);
        }
    }

    function completaAutomatico() {
        if ($('#autocomplete').is(':checked')) {
            // Primeira metade do dia
            let entrada1 = $('#entrada1').val().split(':')
            let he1 = parseInt(entrada1[0]);
            let me1 = parseInt(entrada1[1]);
            let minEFirstHalf = (he1 * 60) + me1;
            
            let saida1 = $('#saida1').val().split(':')
            let hs1 = parseInt(saida1[0]);
            let ms1 = parseInt(saida1[1]);
            let minSFirstHalf = (hs1 * 60) + ms1;

            let firstHalf = minSFirstHalf - minEFirstHalf;

            // Segunda Metade do dia 
            let entrada2 = $('#entrada2').val().split(':')
            let he2 = parseInt(entrada2[0]);
            let me2 = parseInt(entrada2[1]);
            let minESecondHalf = (he2 * 60) + me2;

            let minutoTotalSaida = minESecondHalf + (cargaHoraria - firstHalf);
            let minutoSaida = minutoTotalSaida%60;
            let horaSaida = (minutoTotalSaida - minutoSaida)/60;
            let hs2 = (`00${horaSaida}`).slice(-2);
            let ms2 = (`00${minutoSaida}`).slice(-2);
            
            $('#saida2').val(`${hs2}:${ms2}`);

            let secondHalf = minutoTotalSaida - minESecondHalf;

            let minuto = (secondHalf + firstHalf)%60;
            let hora = ((secondHalf + firstHalf) - minuto)/60;
            hora = (`00${hora}`).slice(-2);
            minuto = (`00${minuto}`).slice(-2);
            let resultado = (`${hora}:${minuto}`)
            
            if (resultado != 'aN:aN') {
                $('.resultadoTotalHoras .resultado').text(resultado);
            }
        }
    }

    $('.inputs-horarios input').on('keyup focusout', function() {
        completaAutomatico();
        calculoHoras()
    });

    //Completar com dois zeros no final caso digite apenas as horas nos inputs
    $('.inputs-horarios input').on('focusout', function() {
        // Verifica se o valor contém apenas duas posições
        if ($(this).val().replace(/[^0-9]/g,'').length == 2) {
            // Adiciona "00" ao final do valor
            let newValue = $(this).val().replace(/[^0-9]/g,'') + ":00";
            // Atualiza o valor do input
            $(this).val(newValue);
        }
    });
});