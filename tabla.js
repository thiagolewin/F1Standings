const main = document.querySelector("main")
const nav = document.querySelector("nav")
const BotonTemporada = document.querySelector(".BotonTemporada")
const BotonCarrera = document.querySelector(".BotonCarrera")
const leftbar = document.querySelector("#leftbar")
const contenedorTabla = document.querySelector(".contenedorTabla")
//contenedorTabla.style.width = window.innerWidth-leftbar.clientWidth + "px"
const tabla = document.querySelector("#tabla")
let primeraVez = true
let temporadas
let temporadaActual
let temporada
let carrera
var PeriJS
async function peticion() {
    const peti = await fetch(`http://ergast.com/api/f1/${temporada}/${carrera}/driverStandings.json`);
    petiJS = await peti.text()
    actualRound = (JSON.parse(petiJS)).MRData.StandingsTable.StandingsLists[0].season
    petiJS = (JSON.parse(petiJS)).MRData.StandingsTable.StandingsLists[0].DriverStandings
    console.log(petiJS)
    MostrarDatosEnTabla()
}
async function AgregarTemporadas() {
    temporadas = await fetch("http://ergast.com/api/f1/seasons.json?limit=100")
    temporadas  = await temporadas.text()
    temporadas = (JSON.parse(temporadas)).MRData.SeasonTable.Seasons
    const frag = document.createDocumentFragment();
    for (let i = temporadas.length-1; i>=0;i--) {
        let option = document.createElement("option")
        option.value = temporadas[i].season
        option.textContent = temporadas[i].season
        frag.appendChild(option)
    }
    BotonTemporada.appendChild(frag)
    temporada = BotonTemporada.value;
    AgregarSeasons()
}
async function AgregarSeasons() {
    while(BotonCarrera.firstChild) {
        BotonCarrera.removeChild(BotonCarrera.firstChild)
    }
    temporadaActual = await fetch(`http://ergast.com/api/f1/${temporada}.json`)
    temporadaActual  = await temporadaActual.text()
    temporadaActual = (JSON.parse(temporadaActual)).MRData.RaceTable.Races
    //let fechaActual = new Date().toISOString()
    let fechaActual = new Date().toISOString()
    let fechaCal = fechaActual.substring(0,10)
    let horarioCal = fechaActual.substring(11,19)
    let i = 0;
        while(i < temporadaActual.length && fechaCal > temporadaActual[i].date) {
            i++
        }
    const frag = document.createDocumentFragment();
    for (let f = i-1;f>=0;f--) {
        let option = document.createElement("option")
        option.value = f+1
        option.textContent = f+1
        frag.appendChild(option)
    }
    BotonCarrera.appendChild(frag)
    carrera = BotonCarrera.value;
    peticion()
}
function MostrarDatosEnTabla() {
    const frag = document.createDocumentFragment()

    EliminarTemporadas()
    for (let i = 0; i<petiJS.length;i++) {
        PonerSideBar(i)
        let h2 = document.createElement("h2")
        h2.textContent = petiJS[i].position
        h2.classList.add("item")
        let h3 = document.createElement("h3")
        h3.textContent = petiJS[i].Driver.givenName + " " + petiJS[i].Driver.familyName
        h3.classList.add("item")
        let h4 = document.createElement("h4")
        h4.textContent = petiJS[i].Constructors[0].name
        h4.classList.add("item")
        let h5 = document.createElement("h5")
        h5.textContent = petiJS[i].Driver.nationality
        h5.classList.add("item")
        let h52 = document.createElement("h5")
        h52.textContent = petiJS[i].points
        h52.classList.add("item")
        frag.appendChild(h2)
        frag.appendChild(h3)
        frag.appendChild(h4)
        frag.appendChild(h5)
        frag.appendChild(h52)
    }
    primeraVez = false
    tabla.appendChild(frag)
}
function EliminarTemporadas() {
    while(tabla.children[5]) {
        tabla.removeChild(tabla.children[5])
    }
}
function PonerSideBar(i) {
    const sideFrag = document.createDocumentFragment()
    if (primeraVez == true) {
        let img = document.createElement("img")
        let a = document.createElement("a")
        let apellido = petiJS[i].Driver.familyName
        apellido = apellido.replace(/ /g, "")
        img.src = `https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/${apellido}.jpg.img.1920.medium.jpg/1677069594164.jpg`
        img.setAttribute("loading","lazy")
        a.textContent = petiJS[i].Driver.givenName + " " + petiJS[i].Driver.familyName
        let li = document.createElement("li")
        li.appendChild(img)
        li.appendChild(a)
        sideFrag.appendChild(li)
    }
    leftbar.children[1].appendChild(sideFrag)
}
AgregarTemporadas()
BotonTemporada.addEventListener("change",()=> {
    temporada = BotonTemporada.value
    AgregarSeasons()
})
BotonCarrera.addEventListener("change",()=> {
    carrera = BotonCarrera.value;
    peticion()
})
