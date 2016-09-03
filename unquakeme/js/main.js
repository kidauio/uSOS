$(function() {
    
    function init(){
        $('.active-serv').hide();
        $('.princ-needs').hide();
        $('.miss-people').hide();
        $('.rescue-me').hide();
    }
    
    init();

    $('#active-services').click(function(){
        $('.selection').hide();
        $('.active-serv').show();
    });
    
    $('#principal-needs').click(function(){
        $('.selection').hide();
        $('.princ-needs').show();
    });
    
    $('#missing-people').click(function(){
        $('.selection').hide();
        $('.miss-people').show();
    });
    
     $('#rescue').click(function(){
        $('.selection').hide();
        $('.rescue-me').show();
    });
    
    $('#redirect_page').click(function(){
        $('.selection').show();
        $('.active-serv').hide();
        $('.princ-needs').hide();
        $('.miss-people').hide();
        $('.rescue-me').hide();
    });
    
    $("#submit_missing").click(function(){
      $.post("http://192.168.1.42:8080?nombre="+$('#nombre').val()+"&edad=23&rasgo=pecas&sector=norte&contacto=Maria&tel=023349",
             {
          "?nombre": $('#nombre').val(),
          "edad": 23,
          "rasgo": "pecas",
          "sector": "norte de quito",
          "contacto": "Maria Susana",
          "tel":"023948485"
          
      },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });         //%27$('#name')%27&edad=$('#age')&%27rasgo=$('#rasgo').value%27&sector=%27$('#sector').value%27&contacto=%27$('#contacto').value%27&tel=%27$('#tel').value%27",
  });
    

    
});
