/*Globale Variablen*/
var aufgetauchteSchneemaenner = 0;
var start;

$(document).ready(function(){
    checkCookies();
    initFooter();

    if(window.location.pathname != '/impressum.html' && window.location.pathname != '/datenschutz.html') {
        initPageIndex();
    }
});

/**
 * Prüft, ob Cookies bereits akzeptiert wurden
 */
function checkCookies() {
    if(document.cookie.indexOf('hidecookiedingsbums=1') != -1){
        jQuery('#cookiedingsbums').hide();
    }
    else {
         jQuery('#cookiedingsbums').prependTo('body');
         jQuery('#cookiedingsbumsCloser').show();
    }
}

/**
 * Setzt das aktuelle Jahr in den Footer
 */
function initFooter() {
    $('footer > div:first-of-type').text('@ ' + new Date().getFullYear() + ' Toka');
}

/**
 * Initialisiert Inhalte, die nur auf der Indexseite ausgeführt werden sollen
 */
function initPageIndex() {
    //Sticky menu
    $(window).scroll(function(){
        if($(window).scrollTop() > $('img[alt="Vier Jahreszeiten"]').height()){
            $('#topnav').addClass('sticky');
        } else {
            $('#topnav').removeClass('sticky');
        }
    });
    
    //Scrollanimation
    $('#topnav ul a').click(function(){
        var link = $(this).attr('href');
        $('html,body').animate({scrollTop:$(link).offset().top - 45}, 2000)
    });

    //Slider
    var demo1 = $("#slider_fruehling").slippry({
        transition: 'fade',
        useCSS: true,
        speed: 1000,
        pause: 4000,
        auto: true,
        preload: 'visible',
        autoHover: true,
        pager:false
    });

    //Schneemannspiel
    $('img[alt^="Schneemann"]').click(function(){
        $(this).removeClass('schneemannani');
        var alterPunktestand = parseInt($('#punktzahl').text());
        var neuerPunktestand = alterPunktestand - 1;
        $('#punktzahl').text(neuerPunktestand);
        if(neuerPunktestand == 0) {
            clearTimeout(start);
            spielAuswerten();
            spielAufraeumen();
        }
    });
    
    //Schneemannspiel
    $('#starteTraining').click(function(){
        $('#starteTraining').text("Training läuft");
        start = setInterval('neueRunde()', 2000);
        $('#siegtext').text("");
    });
}

//Weitere Funktionen zum Schneemannspiel - START

/**
 * Startet einen neuen Durchlauf
 * Ein zufälliger Schneemann bekommt oder verliert die Schneemannanimation
 */
function neueRunde() {
    var schneemannID = getRandomSchneemannID();
    $(schneemannID).toggleClass('schneemannani');
    pruefeSchneemann(schneemannID);
}

/**
 * Liefert eine zufällige Schneemann-ID
 */
function getRandomSchneemannID() {
    var schneemann =  Math.floor(Math.random() * Math.floor(4));
    var schneemannID = "#schneemann" + (schneemann + 1);
    return schneemannID;
}

/**
 * Erhöhrt den Zähler an aufgetauchten (animierten) Schneemännern
 * @param {String} schneemannID, des zufällig ausgewälten Schneemannes
 */
function pruefeSchneemann(schneemannID) {
    if($(schneemannID).hasClass('schneemannani')) {
        aufgetauchteSchneemaenner = aufgetauchteSchneemaenner + 1;
    }
}

/**
 * Wertet die Leistung des Spielers aus
 */
function spielAuswerten (){
    if(aufgetauchteSchneemaenner < 11) {
        $('#siegtext').text("Perfektes Spiel - Du bist ein wahrer Schneemannfänger");
    } else if (aufgetauchteSchneemaenner == 11) {
        $('#siegtext').text("Prima, nur 1 Schneemann ist dir entwischt");
    } else {
        $('#siegtext').text("Geschafft! " + (aufgetauchteSchneemaenner - 10) + " Schneemänner sind dir entkommen.");
    }
}

/**
 * Bereitet alles für ein weiteres Spiel vor
 */
function spielAufraeumen() {
    $('#schneemann1').removeClass('schneemannani');
    $('#schneemann2').removeClass('schneemannani');
    $('#schneemann3').removeClass('schneemannani');
    $('#schneemann4').removeClass('schneemannani');
    $('#punktzahl').text(10);
    aufgetauchteSchneemaenner = 0;
    $('#starteTraining').text("Starte dein Training");
}
//Weitere Funktionen zum Schneemannspiel - ENDE