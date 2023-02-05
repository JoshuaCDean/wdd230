const button = document.querySelector("button");
button.addEventListener("click", addChapter);


function addChapter()
{
    const favchap = document.querySelector("#favchap");
    const list = document.querySelector("#list")
    const item = favchap.value;
    favchap.value = "";
    const listElements = document.createElement("li")
    listElements.innerHTML=item
    list.appendChild(listElements);
    
    const delButton = document.createElement("button")
    delButton.innerHTML = "X"
    listElements.appendChild(delButton)
    delButton.addEventListener("click", () => {
        list.removeChild(listElements)
    })
}