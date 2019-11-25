var map = {
        //ajout de la map leaflet positionné sur toulouse 
    mymap : L.map('map').setView([43.604652,1.444209], 12),
        //declaration du bloc infos
    bloc: document.getElementById("blocinfos"),
    
        // Ajout de l'api jcdecaux
    apijcdecaux: "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=eae0e4c3e18116ba845657acbc7eeff480febe8b",
    
        //définition de l'icone rouge
    iconRed: L.icon({iconUrl: "images/markerred.png",
                     iconSize: [35, 35]
                    }),
    iconGreen: L.icon({iconUrl: "images/markergreen.jpg",
                       iconSize:  [35, 35]
                    }),
    iconOrange: L.icon({iconUrl: "images/markerorange.png",
                       iconSize:  [35, 35]
                    }),
        //ajout des marqueurs sur la map
    getMarker: function()  {
        //defini le marker clusters
        var markerClusters = L.markerClusterGroup();
        map.mymap.addLayer(markerClusters);
            //demande d'info a l'apijcdecaux 
        $.getJSON(this.apijcdecaux, function(stations){
                //boucle each pour chaque stations
             $.each(stations, function(i, field){
                    //definition des infos
                
                var status = stations[i].status;
                var velo = stations[i].available_bikes;
                var nomStation = document.createElement("h4");
                nomStation.textContent= "Station : " + stations[i].name;
                var adresseStation = document.createElement("p");
                adresseStation.textContent = "Adresse : " + stations[i].address;
                var veloDispo = document.createElement("p");
                veloDispo.textContent = "Vélo(s) disponible(s) : " + stations[i].available_bikes + "/" + stations[i].bike_stands;
                
                    
                        //si la station est fermer, afficher une icone rouge et ne pas afficher le formulaire.
                if (status === "CLOSE")  { 
                    var markerClosed = L.marker([stations[i].position.lat,stations[i].position.lng], {icon:map.iconRed});
                    markerClusters.addLayer(markerClosed);
                    markerClosed.addEventListener("click",function()  {
                        $('#blocreservation').css('display', 'none')
                        var nondispo = document.createElement("p");
                        nondispo.textContent = "La station est fermée, veuillez selectionner une autre station.";
                        nondispo.style.color = "red";
                        map.bloc.textContent="";
                        map.bloc.appendChild(nomStation);
                        map.bloc.appendChild(adresseStation);
                        map.bloc.appendChild(nondispo);
                    })
                    //s'il n'y a pas de vélo disponible, afficher une icone rouge et ne pas afficher le formulaire.
                } else if (velo === 0)  {
                    var markerNoBike = L.marker([stations[i].position.lat,stations[i].position.lng], {icon:map.iconOrange});
                    markerClusters.addLayer(markerNoBike);
                    markerNoBike.addEventListener("click",function()  {
                        $('#blocreservation').css('display', 'none')
                        var nondispo = document.createElement("p");
                        nondispo.textContent = "Il n'y a pas de vélo disponible, veuillez selectionner une autre station.";
                        nondispo.style.color = "red";
                        map.bloc.textContent="";
                        map.bloc.appendChild(nomStation);
                        map.bloc.appendChild(adresseStation);
                        map.bloc.appendChild(nondispo);
                    })
                   //sinon afficher une icone bleu 
                } else  {

                    var marker = L.marker([stations[i].position.lat,stations[i].position.lng], {icon:map.iconGreen});
                    markerClusters.addLayer(marker);
                    marker.addEventListener("click",function()  {

                            //effacer l'indication
                        map.bloc.textContent="";
                                //Ajout des informations stations
                        map.bloc.appendChild(nomStation);
                        map.bloc.appendChild(adresseStation);
                        map.bloc.appendChild(veloDispo);  

                        $('#blocreservation').css('display', 'inline')
                            //si il y a un nom déja rempli dans le formulaire par le meme navigateur , saisir automatiquement le nom et le prénom

                        
                            //si le timer n'est pas lancé , changé l'adresse sur le bandeau de réservation
                        if ($('#tempsreserv').text() === "")  {
                            $('#adressevelo').text(stations[i].address);
                            sessionStorage.setItem('adresse',document.getElementById('adressevelo').textContent)
                        }                        
                    })
                } 
                    
 
             })
             
        })
    },
    
    initMap: function()  {
        // Initialise la map
        var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        accessToken:'pk.eyJ1IjoiZmlzaDgxMTAwIiwiYSI6ImNqdzdxN2NnbDBuNDI0Ym80cnoxbzVicnIifQ.DTl4y65RoISbbNt1RtTzQg'
        });
        map.mymap.addLayer(osmLayer);
        
        // desactive l'affichage des blocs non nécessaires au début de la reservation
        $('#blocreservation').css('display', 'none');
        $('#blocerreur').css('display', 'none');
        $('#timereservation').css('display', 'none');
        
        //lance la requete api , plus place les marqueurs avec les diverses infos
        map.getMarker();
    }
}
