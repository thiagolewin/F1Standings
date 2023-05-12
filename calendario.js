let petiJS
let primeraVez = true
let calendario
let temporada = 2023
async function peticion() {
    const peti = await fetch(`http://ergast.com/api/f1/${2023}/driverStandings.json`);
    petiJS = await peti.text()
    actualRound = (JSON.parse(petiJS)).MRData.StandingsTable.StandingsLists[0].season
    petiJS = (JSON.parse(petiJS)).MRData.StandingsTable.StandingsLists[0].DriverStandings
    console.log(petiJS)
    for (let i = 0; i<petiJS.length;i++) {
        PonerSideBar(i)
    }
    primeraVez = false
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
async function MostrarCalendario() {
    calendario = await fetch(`http://ergast.com/api/f1/${temporada}.json`)
    calendario = (await calendario.json())
    calendario = calendario.MRData.RaceTable.Races
    console.log(calendario)
    for (let i = 0; i<calendario.length;i++) {
        
    }
}
peticion()
MostrarCalendario()