    /*js*/



    let divvictoire = document.getElementById("victoire");

    let music = document.createElement("audio");
    music.src = "./audio/into-the-red-trinity.mp3";
    music.volume = 0.2;
    music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    document.getElementById("music").addEventListener('click', () => {
        if (document.getElementById("music").checked) {
            music.play();
        } else {
            music.pause();
            music.currentTime = 0;
        }
    });

    // Pour gérer les différentes couleurs des confettis ;-) Tu peux mettre autant de couleurs que tu
    // le souhaites ;-)
    var colors = ["#FCFF33", "#F500E6", "#17D92B", "#0C0203"];

    /*fonction confétie*/
    function frame() {
        confetti({
            particleCount: 600,
            angle: 40,
            spread: 10,
            origin: { x: 0 },
            colors: colors,
        });
        confetti({
            particleCount: 600,
            angle: 140,
            spread: 10,
            origin: { x: 1 },
            colors: colors,
        });
    }
    
  

    /*Class*/
    $(function() {
        class Voiture {
            constructor(nom, x, y, img) {
                this.nom = nom;
                this.x = x;
                this.y = y;
                this.dessiner(img);
            }
        }

        Voiture.prototype.dessiner = function(img) {
            let voitureHtml = "<img src='" + img + "'>";
            this.voitureElement = $(voitureHtml);
            this.voitureElement.css({
                position: "absolute",
                left: this.x,
                top: this.y
            })
            $('body').append(this.voitureElement);
        };

        let car1 = new Voiture("Les frères Têtes-dures", $(window).width() * 0.84, 200, "img/satanas (1).gif");
        let car2 = new Voiture("Sergent Grosse-Pomme et Soldat Petit-Pois", $(window).width() * 0.84, 400, "img/satanas (10).gif");

        Voiture.prototype.deplacerAGauche = function() {
            this.x -= Math.floor(Math.random() * 15);
            this.voitureElement.css({
                left: this.x
            });


        }
        Voiture.prototype.recommencer = function() {
            this.x = $(window).width() * 0.84;
            this.voitureElement.css({
                left: this.x
            });
        };
        let victoire = false;
        Voiture.prototype.checkPosition = function() {
            if (this.x < 10) {
                victoire = true;
            }
        }
        Voiture.prototype.victory = function() {
                if (victoire == true) {
                    clearInterval(carOne);
                    clearInterval(carTwo);
                    clearInterval(carTwoP);
                    clearInterval(carOneP);
                    clearInterval(carOneV);
                    clearInterval(carTwoV);
                    if (car2.x < car1.x) {
                        $("#victoire").fadeIn(500);
                        $("#victoire h3").html(car2.nom + ' ont gagné !');
                        // Appel de la pluie de confettis, tu peux même prévoir une couleur de confettis
                        // différente pour chacun des gagnants ;-) en définissant ici ton tableau de couleurs ;-)
                        requestAnimationFrame(frame);
                    } else if (car1.x < car2.x) {
                        $("#victoire").fadeIn(500);
                        $("#victoire h3").html(car1.nom + ' ont gagné !');
                        // Appel de la pluie de confettis
                        requestAnimationFrame(frame);
                    } else if (car1.x == car2.x) {
                        $("#victoire").fadeIn(500);
                        $("#victoire h3").html("Olalalala il va falloir recommencer !");
                        // Appel de la pluie de confettis
                        requestAnimationFrame(frame);
                    }


                }
            }
            /*fonctions du jeu*/
        let carOne;
        let carTwo;
        let cliquer = false;
        let carOneP;
        let carTwoP;
        let carOneV;
        let carTwoV;
        $("#go").on({
            click: () => {
                if (cliquer == false) {
                    carOne = setInterval(function() { car1.deplacerAGauche(); }, 20);
                    carTwo = setInterval(function() { car2.deplacerAGauche(); }, 20);
                    cliquer = true;
                    carTwoP = setInterval(function() { car2.checkPosition(); }, 1);
                    carOneP = setInterval(function() { car1.checkPosition(); }, 1);
                    carOneV = setInterval(function() { car1.victory(); }, 1);
                    carTwoV = setInterval(function() { car2.victory(); }, 1);
                }



            }
        });
        $("#stop").on({
            click: () => {
                clearInterval(carOne);
                clearInterval(carTwo);
                clearInterval(carTwoP);
                clearInterval(carOneP);
                clearInterval(carOneV);
                clearInterval(carTwoV);
                cliquer = false;

            }
        });
        $("#restart").on({
            click: () => {
                cliquer = false;
                clearInterval(carOne);
                clearInterval(carTwo);
                clearInterval(carTwoP);
                clearInterval(carOneP);
                clearInterval(carOneV);
                clearInterval(carTwoV);
                car1.recommencer();
                car2.recommencer();
                $("#victoire").hide();
                victoire = false;

            }
        })

    });