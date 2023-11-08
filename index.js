// Write your code here...
let index = null
let id = null


fetch('http://localhost:3000/menu')
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
    handleForm(data)
    handleDisplay(data[0])
    for(let item of data){
        handleMenu(item)
    }
    
    console.log(index)
})

function handleMenu(item){
    let span = document.createElement('span')
    let menu = document.querySelector('#menu-items')
    span.textContent = item.name
    menu.append(span)
    
    span.addEventListener('click',()=>{
        handleDisplay(item)
        identifier(item)
        document.querySelector('#number-in-cart').textContent = item.number_in_bag
    })
}


function handleDisplay(item){
    let name = document.querySelector('#dish-name')
    let image = document.querySelector('#dish-image')
    let price = document.querySelector('#dish-price')
    let description = document.querySelector('#dish-description')
    
    name.textContent = item.name
    image.src = item.image
    price.textContent = `$${item.price}`
    description.textContent = item.description
    
}

function identifier(item){
    index = item.id - 1
    id = item.id
    return (id, index)
}

function handleForm(data){
    let form = document.querySelector('#cart-form')
    let cartSpan = document.querySelector('#number-in-cart')

    let p = document.createElement('p')
    p.id = 'cost'
    form.appendChild(p)


    let numberToAdd = 0

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        numberToAdd = form.querySelector('#cart-amount')
        cartNumber = data[index].number_in_bag + (numberToAdd.value)*1
        data[index].number_in_bag = cartNumber
        cartSpan.textContent = data[index].number_in_bag
        form.querySelector('#cost').textContent = `Total Cost: $${totalCost(data)}`

        fetch('http://localhost:3000/menu/'+id,{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                number_in_bag : data[index].number_in_bag
            }),
        })
        .then((res)=>res.json())
        .then((change)=>{
            console.log(change)
        })
    })

}

function totalCost(data){
    let cost = null
    for (item in data){
        cost += data[item].number_in_bag * data[item].price
    }
    return cost
}
