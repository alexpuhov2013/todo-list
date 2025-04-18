const form = document.querySelector("#item-form")
const input = document.querySelector("#item-input")
const list = document.querySelector("#item-list")


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim() === "") {
        alert("Пожалуйста заполните поле")
        return;
    }

    const newItem = input.value

    const li = document.createElement("li")
    li.appendChild(document.createTextNode(newItem))

    const button = createBtn("remove-item btn-link text-red")
    
    li.appendChild(button)
    list.appendChild(li)

})



function createBtn(classes) {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon("fa-solid fa-xmark")
    button.appendChild(icon)
    return button;
}

function createIcon(classes) {
    const icon = document.createElement("i")
    icon.className = classes
    return icon;
}
