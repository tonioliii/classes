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