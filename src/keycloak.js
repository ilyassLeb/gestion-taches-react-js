import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",  // URL de base du serveur Keycloak
  realm: "myrealm",  // Nom du realm
  clientId: "my-client",  // ID du client
});

// Initialiser Keycloak
keycloak.init({
  onLoad: "login-required",  // L'utilisateur doit être authentifié
  checkLoginIframe: false,   // Désactive la vérification du login iframe
  enableLogging: true,       // Active les logs pour aider au débogage
  redirectUri: window.location.href,  // URL où l'utilisateur sera redirigé après la connexion
}).then(authenticated => {
  if (authenticated) {
    console.log("Authenticated");
  } else {
    console.log("Not authenticated");
  }
}).catch(err => {
  console.error("Error initializing Keycloak", err);
});

export default keycloak;
