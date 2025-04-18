const form = document.querySelector("#item-form")
const input = document.querySelector("#item-input")
const list = document.querySelector("#item-list")


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(input.value === ""){
        alert("Пожалуйста заполните поле")
    } else{
        const newItem = input.value

        const li = document.createElement("li")
        li.appendChild(document.createTextNode(newItem))

        const button = document.createElement('button')
        button.className = "remove-item btn-link text-red"
        
        const icon = document.createElement("i")
        icon.className = "fa-solid fa-xmark"

        button.appendChild(icon)
        li.appendChild(button)
        list.appendChild(li)
    }

})
