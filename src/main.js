import '../style.css'

const myshroom = fetch("https://raw.githubusercontent.com/fosskers/myshroom-api/master/public/mushrooms.json").then(setas => setas.json())


document.getElementById("buscar").addEventListener("click",async () => {
    const formas = [...document.getElementsByTagName('input')]
        .filter(input => input.checked)
        .map(checked => checked.value)
    const sombreroValue = document.querySelector("#sombreroInf").value
    const esporasValue = document.querySelector("#esporas").value

    const aux = (await myshroom)
        .filter(shroom => shroom.attributes.sporePrint.indexOf(esporasValue)!=-1)
        .filter(shroom => shroom.attributes.hymenium.indexOf(sombreroValue)!=-1)
        .filter(shroom => compruebaElementos(shroom.attributes.cap, formas))
        .map(shroom => `<div>Nombre: ${shroom.common[0]}<br>
            Venenosa: ${shroom.attributes.poisonous&&'Si'||'No'}<br>
            Mortal: ${shroom.attributes.deadly&&'Si'||'No'}</div>`)
    document.getElementById('info').innerHTML=aux.join('')||'No existen setas que cumplan el filtro'

} )

function compruebaElementos(arr, elementos){
    for(const element of elementos){
        if(arr.indexOf(element)==-1)
            return false
    }
    return true
}