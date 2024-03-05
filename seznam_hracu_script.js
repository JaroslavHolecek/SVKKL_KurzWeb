class Hrac {
    constructor(jmeno_zadane, prijmeni_zadane, klub_zadane) {
        this.jmeno = jmeno_zadane;
        this.prijmeni = prijmeni_zadane.toUpperCase();
        this.klub = klub_zadane;
    }
}

let kapitan = new Hrac("Franta", "Klabzub", "FC Barcelona");
// kapitan.prijmeni // KLABZUB

// Vytvoření seznamu hráčů
let vsichniHraci = [
 //   new Hrac("Jan", "Novák", "FC Barcelona"),
 //   new Hrac("Petr", "Svoboda", "AC Milan"),
    // Přidat další hráče podle potřeby
];

function zobraz_vsechny_hrace(){ // Zajistí spuštění kódu až po načtení dokumentu
    const playerListElement = document.querySelector('.player-list');

    playerListElement.innerHTML = "";


    vsichniHraci.forEach(hrac => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');

        playerElement.innerHTML = `
            <p>Jméno: ${hrac.jmeno}</p>
            <p>Příjmení: ${hrac.prijmeni}</p>
            <p>Klub: ${hrac.klub}</p>
        `;

        playerListElement.appendChild(playerElement);
    });
}

document.addEventListener('DOMContentLoaded', zobraz_vsechny_hrace);

function addPlayer() {
        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;
        var club = document.getElementById("club").value;

        vsichniHraci.push( new Hrac(name, surname, club) );
        zobraz_vsechny_hrace();
        //document.getElementById("name").value = "";
        //document.getElementById("surname").value = "";
        //document.getElementById("club").value = "";
    }


// tuto funkci voláme po kliknutí na tlačítko 
function exportujHraceDoSouboru() {
    seznamHracu = vsichniHraci;
    // Převedení seznamu hráčů na řetězec ve formátu JSON
    const seznam_jako_napis = JSON.stringify(seznamHracu, null, 2);

    // Vytvoření blob objektu s JSON daty // blob je soubor
    const blob = new Blob([seznam_jako_napis], { type: 'application/json' });

    // Vytvoření URL odkazu na blob
    const url = URL.createObjectURL(blob);

    // Vytvoření neviditelného odkazu pro stahování
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'seznam-hracu.json'; // Název stahovaného souboru

    // Přidání odkazu do dokumentu a simulace kliknutí
    document.body.appendChild(a);
    a.click();

    // Odstranění odkazu po dokončení
    document.body.removeChild(a);

    // Uvolnění URL blobu
    URL.revokeObjectURL(url);
}

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0]; // Získání souboru
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const obsah = e.target.result;

        try {
            vsichniHraci = JSON.parse(obsah); // Převedení načteného obsahu na objekt

            zobraz_vsechny_hrace(); // viz vytvořená funkce výše -> smaže stávající obsah a zobrazí nový

        } catch (error) {
            console.error('Chyba při parsování souboru:', error);
        }
    };
    reader.readAsText(file); // Načtení souboru jako text
});

