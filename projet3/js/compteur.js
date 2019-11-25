var compteurElt = {
    timer : null,
    compteurTime: function()  {
        //cache les differentes parties concernant l'annulation et reservation de velo.
        $('#fin').css('display','none');
        $('#reserv').css('display','inline');
        $('#reservcancel').css('display','inline');
        
        //calcule la date de fin de réservation,si la date est déja dans le session storage cela reprend la durée restante
        if(sessionStorage.getItem('date'))  {
            var horraireFin = sessionStorage.getItem('date');
            $('#adressevelo').text(sessionStorage.getItem('adresse'));
            
        }  else {
            //met en place une date de fin de réservation
            var horraireFin = new Date().getTime() + 1200000;
            //enregistre la date de fin 
            sessionStorage.setItem('date',horraireFin);         
            localStorage.setItem('nom',$('#saisie').val());
            localStorage.setItem('prenom',$('#saisiebis').val());
        }
        
        //si le compteur ne contient rien ( quand une réservation n'est pas en cours)
        if ($('#tempsreserv').text() === "")  {
             //intervale pour calculer le temps restant
             compteurElt.timer = setInterval(function()  {
                var now= new Date().getTime();
                var timeLeft= horraireFin - now;
                //Calcul des minutes restantes
                var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                //Calcul des secondes restantes
                var secondes = Math.floor((timeLeft % (1000 * 60)) / 1000 );
                $('#tempsreserv').text(minutes + " mn " + secondes + " s ");
                 //si le compteur atteint 0mn 0s
                if ((minutes <= 0) && (secondes <= 0))  {
                    //stop l'interval
                    rsv.cancelReserv()
                }
            },1000)            
        }

    }

}
