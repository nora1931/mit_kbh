//definer en varibel der tager fat i menuen
let mainNav = document.getElementById('js-menu');

//definer en varibel der tager fat i toggle menuen (burger)
let navBarToggle = document.getElementById('js-navbar-toggle');

//når der klikke på toggle knappen toggles der mellem de to
navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
})




const header = document.querySelector("nav h3");
const medieurl = "https://mitkbh-df3d.restdb.io/media/";
const myHeaders = {

    "x-apikey": "602f8cd45ad3610fb5bb63c8"
}
document.addEventListener("DOMContentLoaded", start)
let aktiviteter;
//Jeg laver en variabel "filter"
let filter = "alle";


// første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerAktiviter));
    loadJSON();
}

//Eventlistner knyttet til knapperne der vælger hvad for et filter der er aktivt
function filtrerAktiviter() {
    filter = this.dataset.aktivitet; //Sæt verdien "filter" til værdien af data-troende på den knap der er klikket på
    document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra den knap
    this.classList.add("valgt") //marker den knap, der er klikket på
    visAktiviteter(); //kald funktionen visPersoner efter det nye filter er sat
    header.textContent = this.textContent;
}


async function loadJSON() {
    const JSONData = await fetch("https://mitkbh-df3d.restdb.io/rest/aktiviteter", {
        headers: myHeaders
    });
    aktiviteter = await JSONData.json();
    console.log("aktiviteter", aktiviteter);
    visAktiviteter();
}

//funktion der viser personer i liste view
function visAktiviteter() {
    console.log(aktiviteter)
    const dest = document.querySelector("#liste"); // container til articles med en person
    const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
    dest.textContent = ""; //ryd container inden nyt loop
    aktiviteter.forEach(aktivitet => {
        console.log("Aktiviter", aktivitet.aktivitet);
        // loop igennem json (retter)

        if (filter == aktivitet.aktivitet || filter == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".seværdighed").textContent = aktivitet.seværdighed;
            //                    klon.querySelector(".ikon").textContent += `${aktivitet.pris} kr`;
            klon.querySelector(".billeder").src = medieurl + aktivitet.billede;
            //                    klon.querySelector(".aktivitet").addEventListener("click", () => visDetaljer(aktivitet));
            dest.appendChild(klon);
        }

    })
}


//        function visDetaljer(hvad) {
//            location.href = `detaljer.html?id=${hvad._id}`;
//        }
