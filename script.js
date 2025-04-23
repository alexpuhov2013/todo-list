const form = document.querySelector("#item-form")
const input = document.querySelector("#item-input")
const list = document.querySelector("#item-list")
const clearBtn = document.querySelector("#clear")



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
    input.value = ''
})
list.addEventListener("click", (e) => {
    if(e.target.parentElement.classList.contains("remove-item")){
      const listItem = e.target.closest('li')
        listItem.remove()
    }
})
clearBtn.addEventListener("click", (e) => {
    // const listItems = list.querySelectorAll("li")
    // listItems.forEach((li) => li.remove())
    list.innerHTML = ''
    
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
