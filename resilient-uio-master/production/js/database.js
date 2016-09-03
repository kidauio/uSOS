$.couch.urlPrefix = "http://localhost:5984";

$( document ).ready(function() {

        

        $("#ejecutar").click( function(){

            console.log('hola');

            $.couch.login({
                name: "admin",
                password: "admin",
                success: function(data) {
                    console.log(data);
                },
                error: function(status) {
                    console.log(status);
                }
            });

            $.couch.db("libros").view("vistas_libros/num_paginas_view", {
                success: function(data) {
                    console.log(data);
                    $('#resultado').val(JSON.stringify(data,null, 4));
                },
                error: function(status) {
                    console.log(status);
                },
                reduce: false
            });
               
           }
        );

});