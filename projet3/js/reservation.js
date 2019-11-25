var rsv = {
    
    
    canvasCheck: function()  {
        //cacher le bloc erreur ( car si erreur précedente , cela sera affiché)
        $('#blocerreur').css('display','none');
        $('#canvaserreur').css('display','none');
        cvsSignature.context = document.getElementById("canvas").getContext('2d');
        //données du canvas
        var imageCanvas = cvsSignature.context.getImageData(0,0,400,150);
        
        for (var i=0; i<imageCanvas.data.length;i++)  {
                 //si il n'y a pas de données du canvas , remonter l'erreur
                 if (!imageCanvas.data[i])  {
                    $('#blocerreur').css('display', 'block')
                    $('#canvaserreur').css('display','block');
                    $('#formulaireerreur').css('display','none');

                 // si il y a des données, accedé a la réservation   
                 }  else if (imageCanvas.data[i]) {
                    $('#timereservation').css('display','block');
                    $('#blocerreur').css('display','none');
                    compteurElt.compteurTime();
                    break;
                }   
        }

    },
    checkForm: function()  {
        //si un des deux champs n'est pas rempli
        if ((document.getElementById('saisie').value === "")||(document.getElementById('saisiebis').value === ""))  {
            //ERREUR, veuillez remplir le formulaire
            $('#blocerreur').css('display', 'block');
            $('#canvaserreur').css('display', 'none');     
        }  else  { 
            //sinon lancer verification du canvas
            rsv.canvasCheck()
        }
    },
    
    cancelReserv: function()  {
        clearInterval(compteurElt.timer)
        //retire l'item du session storage pour que l'annulation sois bien prise en compte
        sessionStorage.removeItem('date');
        $('#tempsreserv').text('');
        //affiche le message d'annulation et cache le message d'expiration et la croix
        $('#fin').css('display','inline');
        $('#reserv').css('display','none');
        $('#reservcancel').css('display','none')  
    }
    

}
//si on clique sur reserver, cela lance la verification du formulaire
$('#valid').click(function()  {
    rsv.checkForm();
});

//si on clique sur annuler, cela annule la réservation (timer + affiche message d'annulation)
$('#reservcancel').click(function()  {
    rsv.cancelReserv();
})