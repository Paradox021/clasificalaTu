import '../style.css'

const myshroom = (await fetch("https://raw.githubusercontent.com/fosskers/myshroom-api/master/public/mushrooms.json")).json()


document.getElementById("buscar").addEventListener("click",async () => {
    const formas = [...document.getElementsByTagName('input')]
        .filter(input => input.checked)
        .map(checked => checked.value)
    const selectSombrero = document.getElementById("sombreroInf")
    const selectEsporas = document.getElementById("esporas")
    
    const sombreroValue = selectSombrero.options[selectSombrero.selectedIndex].value
    const esporasValue = selectEsporas.options[selectEsporas.selectedIndex].value

    const aux = Object.entries(await myshroom)
        .filter(shroom => shroom[1].attributes.sporePrint.indexOf(esporasValue)!=-1)
        .filter(shroom => shroom[1].attributes.hymenium.indexOf(sombreroValue)!=-1)
        .filter(shroom => compruebaElementos(shroom[1].attributes.cap, formas))
        .map(shroom => `<div>Nombre: ${shroom[1].common[0]}<br>
            Venenosa: ${shroom[1].attributes.poisonous&&'Si'||'No'}<br>
            Mortal: ${shroom[1].attributes.deadly&&'Si'||'No'}</div>`)
    document.getElementById('info').innerHTML=aux.join('')||'No existen setas que cumplan el filtro'

} )

function compruebaElementos(arr, elementos){
    for(const element of elementos){
        if(arr.indexOf(element)==-1)
            return false
    }
    return true
}