
const switchView = async () => {
    var btn = document.getElementById("btn-viewSwitch");
    var list = document.getElementsByClassName("list")[0];

    list.classList.add("invisible");
    await setTimeout(async () => {
        list.classList.remove("invisible");
        list.classList.toggle("grid");
        list.classList.add("visible");
        await setTimeout(() => {
            list.classList.remove("visible");
            if (list.classList.contains("grid")) {
                btn.children[0].src = "../assets/glyphicons-115-list.png"
            } else {
                btn.children[0].src = "../assets/glyphicons-157-show-thumbnails.png"
            }
        }, 1000)
    }, 2000)
}

const listItemClick = (ev) => {
    alert(ev.target.closest("div.list-item").querySelector(".primary-text").textContent)
}
const optionClick = (ev) => {

    const url = ev.target.closest("div.list-item").querySelector(".cover").src;
    const title = ev.target.closest("div.list-item").querySelector(".primary-text").textContent;
    alert(`${url}\n${title}`)
    ev.preventDefault();
    ev.stopPropagation();
}
const attachHandlers = () => {
    document.getElementById("btn-viewSwitch").onclick = switchView
    Array.from(document.getElementsByClassName("btn-option")).forEach(element => {
        element.onclick = optionClick
    });
    Array.from(document.getElementsByClassName("list-item")).forEach(element => {
        element.onclick = listItemClick
    });
}

window.onload = async () => {
    attachHandlers();
    var uri =
        window.location.href.trimEnd().toLocaleLowerCase().replace("index.html", "");
    uri += "/data/listitems.json";
    await fetch(uri).then(response => response.json())
        .then(data => fillList());
};