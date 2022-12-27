require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;
const tokenFb = process.env.tokenAccesoFB
const stripeLiveKey = process.env.secretKeyStripe
const stripe = require('stripe')(stripeLiveKey);

// Create an instance of the express app.
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Redirect to https://xyncs.com
const targetBaseUrl = 'https://www.alejandrovilpa.com/inicio';



// Routes
app.get('/', function (req, res) {
    res.redirect(targetBaseUrl);
    // res.render('inicio')

});
app.get('/:params?', function (req, res) {
    var params = req.params.params;
    res.render(params);
})



// Nodemailer route

app.post("/ajax/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var textBody = `FROM: ${request.body.name}; EMAIL: ${request.body.email}; MESSAGE: ${request.body.message}`;
    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p> <p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Mensaje: ${request.body.message} </p>`;
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien ha llenado el formulario de contacto, Alejandro Vilpa!',
        html: htmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
});

app.post("/club/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var textBody = `FROM: ${request.body.name}; EMAIL: ${request.body.email}; MESSAGE: ${request.body.message}`;
    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p> <p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>País: ${request.body.country} </p>`;
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien se registró en tu club, Alejandro Vilpa!',
        html: htmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
});
app.post("/rebeccasmirnovenvio", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var textBody = `FROM: ${request.body.name}; EMAIL: ${request.body.email}; MESSAGE: ${request.body.message}`;
    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p> <p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>País: ${request.body.country} </p><p>Código Postal: ${request.body.zipCode}</p><p>Teléfono: ${request.body.phoneNumber}</p><p>Dedicado a: ${request.body.dedica}</p><p>Dirección: ${request.body.address}</p>`;
    var secondHtmlBody = `<h2>Gracias por adquirir tu copia de: La otra vida de Rebecca Smirnov</h2><p>${request.body.name} Tu copia será enviada, en breve, a la dirección de entrega que proporcionaste</p>`;
    let customerMail = `${request.body.email}`;
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Nuevo pedido: La otra vida de Rebecca Smirnov!',
        html: htmlBody
    };
    var secondMail = {
        from: 'Alejandro Vilpa',
        to: customerMail,
        subject: '¡Tu copia: La otra vida de Rebecca Smirnov!',
        html: secondHtmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
    transporter.sendMail(secondMail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    })
});

//STRIPE
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1MJfFyGyOvmlXVnJxgeefTxE',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${"https://www.alejandrovilpa.com"}/resumenrebeccaSmirnov`,
        cancel_url: `${"https://www.alejandrovilpa.com"}/inicio`,
    });

    res.redirect(303, session.url);
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});