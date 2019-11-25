slider.chargerSlider();
map.initMap();
cvsSignature.signatureCapture();

//si il y a une reservation en cours alors affiché les informations lié a la reservation
if (sessionStorage.getItem('date'))  {
    $('#timereservation').css('display','block');
    compteurElt.compteurTime();  
}
//si il y a un nom de renseigner par le meme navigateur, directement remplir les champs concernant le nom et le prenom dans le formulaire
if (localStorage.getItem('nom'))  {
    $('#saisie').val(localStorage.getItem('nom'));
    $('#saisiebis').val(localStorage.getItem('prenom'));                            
}

