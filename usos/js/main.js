
$(function() {
    
    function init(){
        initEvents();
        $('.register1').hide();
        $('.rating').hide();
        $('.mochila').hide();
        
    }
    
    function initEvents(){
        $('#open-button').click(function(){
            $('body').toggleClass('show-menu');
            
        });
        $('#close-button').click(function(){
            $('body').toggleClass('show-menu');
        });
    }
    
    init();

    $('#home-section').click(function(){
        $('.register').hide();
        $('.register2').hide();
        $('.welcome').show();
        $('body').toggleClass('show-menu');
        $(this).addClass('active');
        $('#register-section').removeClass('active');
    });
    
    $('#register-section').click(function(){
        $('.mochila').hide();
        $('.register').show();
        $('body').toggleClass('show-menu');
        $(this).addClass('active');
        $('#mochila-section').removeClass('active');
    });
    
    $('#mochila-section').click(function(){
        $('.mochila').show();
        $('.register').hide();
        $('body').toggleClass('show-menu');
        $(this).addClass('active');
        $('#register-section').removeClass('active');
    });
    
    
    
    
    $(function(){
    $("#submit").click(function(){      
        alert($('input[name=q12_3]:checked').val());
    });
 });
    
});
