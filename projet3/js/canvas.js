
// Création du canvas dans le formulaire de réservation

var cvsSignature = {

    context: '',
    radius: 1,
    drawing: false,
    
    signatureCapture: function() {
        //défini le contexte du canvas
        this.context = document.getElementById("canvas").getContext('2d');
        // défini l'epaisseur de trait
        this.context.lineWidth = this.radius*2;
        //quand on maintient le clic de la souris cela commence un nouveau chemin  
        $('#canvas').on('mousedown', function(e) {
            cvsSignature.context.beginPath();
            this.drawing = true;
        });
        //quand on bouge la souris avec le clic enfoncé , on continue le cheminen fonction de la ou se positionne le curseur
        $('#canvas').on('mousemove', function(e){
            if(this.drawing){
                cvsSignature.putPoint(e.offsetX, e.offsetY);
            }
        });
        //quand le clic de la souris est relaché, on change la variable drawing afin que les mouvements de la souris ne soit pas compris dans le chemin
        $('#canvas').on('mouseup', function() {
            this.drawing = false;
        });

        // RESPONSIVE
        //ce n'est plus une souris mais un doigt sur le tactile , des qu'on commence a toucher le canvas cela renseigne les coordonnées du premier point
        document.getElementById("canvas").addEventListener('touchstart', function(e){
            e.preventDefault();
            var rect = document.getElementById('canvas').getBoundingClientRect();
            var clientX = e.touches[0].clientX - rect.left;
            var clientY = e.touches[0].clientY - rect.top;
            cvsSignature.putPoint(clientX, clientY);
        }, {passive:true});
        //des que le doigt appuyé bouge cela renseigne les coordoonnées du chemin
        document.getElementById("canvas").addEventListener('touchmove', function(e){
            var rect = document.getElementById("canvas").getBoundingClientRect();
            var clientX = e.touches[0].clientX - rect.left;
            var clientY = e.touches[0].clientY - rect.top;
            cvsSignature.putPoint(clientX, clientY);
        }, {passive:true});
        //des que le doigt n'est plus appuyé sur le canvas, cela stop le chemin
        document.getElementById("canvas").addEventListener('touchend', function(){
            this.context.beginPath();
        });
    },
    //fonction pour ajouté les points sur ordi et en responsive
    putPoint: function(clientX, clientY) {
        this.context = document.getElementById("canvas").getContext('2d');
        //connecte le dernier point du sous-chemin en cours aux coordonnées x, y spécifiées avec une ligne droite (sans tracer réellement le chemin).
        this.context.lineTo(clientX, clientY);
        //dessine le chemin actuel ou donné avec le style de trait actuel 
        this.context.stroke();
        //permet de commencer un nouveau chemin en vidant la liste des sous-chemins
        this.context.beginPath();
        //permet d'ajouter un arc de cercle  au tracé
        this.context.arc(clientX, clientY, this.radius, 0, Math.PI  *2);
        //remplit le chemin courant ou donné avec la couleur de fond en cours
        this.context.fill();
        this.context.beginPath();
        //déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (x, y).
        this.context.moveTo(clientX, clientY);
    }
}
//Lorsque l'on clique sur le bouton effacer , cela efface le contenant du canvas.
$('#clear').click(function()  {
    document.getElementById("canvas").getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
})