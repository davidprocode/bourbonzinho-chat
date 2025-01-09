import venom from 'venom-bot';

venom.create()
    .then((client) => {
        client.onMessage((message) => {
            // Lógica para lidar com mensagens recebidas
            console.log(message);
        });
    })
    .catch((err) => {
        console.log(err);
    });