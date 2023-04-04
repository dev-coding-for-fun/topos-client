import { Auth } from "./FriendlyEats.Auth";


/**
 * Initializes the ToposClient app.
 */
 export class ToposClient {
    constructor(firebaseApp) {
      this.firebaseApp = firebaseApp;
      this.auth = new Auth(firebaseApp);
  
      /*this.db = new Data({ firebaseApp });
      this.mock = new Mock({
        friendlyEats: this,
        data: this.db,
        auth: this.auth,
      }); */
  
      this.auth
        .signInAnonymously()
        .then(() => {
          /*this.view = new View({
            friendlyEats: this,
            data: this.db,
            auth: this.auth,
            router: this.router,
            dialogs: this.dialogs,
            mock: this.mock
          }); */
        })
        .catch(err => {
          console.log(err);
        });
    }

    getFirebaseConfig() {
        return this.firebaseApp.options;
      }
 }
