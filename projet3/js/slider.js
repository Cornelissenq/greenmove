var intervalSlider;
var slider = {
    // change les slider dans l'ordre 1 -> 2 -> 3 -> 1....
    changerSlider : function()  {
        if ($('#sliderun').css('display') === 'inline')  {
            
            $("#sliderun").css('display', 'none');
            $("#sliderdeux").css('display', 'inline');
            
        } else if ($("#sliderdeux").css('display') === "inline")  {
            
            $('#sliderdeux').css('display', 'none');
            $('#slidertrois').css('display', 'inline');
            
        } else if ($('#slidertrois').css('display') === "inline")  {
            
            $('#slidertrois').css('display', 'none');
            $('#sliderun').css('display', 'inline');
            
        }
    } ,
    //change les slider dans l'ordre 1 -> 3 -> 2 -> 1....
    sliderChanger : function()  {
        if ($("#sliderun").css("display") === "inline")  {
            
            $("#sliderun").css("display", "none")
            $("#slidertrois").css("display", "inline")
            
        } else if ($("#sliderdeux").css("display") === "inline")  {
            
            $("#sliderdeux").css("display", "none");
            $("#sliderun").css("display", "inline");
            
        } else if ($("#slidertrois").css("display") === "inline")  {
            
            $("#slidertrois").css("display", "none");
            $("#sliderdeux").css("display", "inline");    
        } 
    } ,
    chargerSlider: function() { 
      intervalSlider = setInterval(this.changerSlider, 5000)  
    }
}


//Lorsque l'on appuie sur le bouton pause , le bouton play se désactive et le bouton pause s'active + le changement de slider est en marche
$('#boutonplay').click(function()  {
    $( "#boutonplay" ).prop( "disabled", true );
    $( "#boutonpause" ).prop( "disabled", false );
    slider.chargerSlider();
})

//Lorsque l'on appuie sur le bouton pause , le bouton pause se désactive et le bouton play s'active + le changement de slider est en pause
$('#boutonpause').click(function()  {
    $( "#boutonplay" ).prop( "disabled", false );
    $( "#boutonpause" ).prop( "disabled", true );
    clearInterval(intervalSlider);
})

// Fleche gauche droite pour changer de slider
document.onkeydown =function(e)  {
    
    
    switch(e.keyCode)  {
        case 37:
            slider.sliderChanger();
        break;
    
        case 39:
            slider.changerSlider();
        break;
    }
}
