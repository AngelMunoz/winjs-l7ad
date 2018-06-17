import 'winjs/css/ui-dark.css';
import './managers/navigation.manager';
import ApplicationManager, { ON_FIRST_ACTIVATION, ON_READY, ON_ERROR } from "./managers/application.manager";
import Router from "./managers/route.manager";
import Events, { APPLICATION } from "./managers/event.manager";
import StorageManager from './managers/storage.manager';

import Home from './pages/home/home';
import About from './pages/about/about';


const routes = [Home, About];
const router = new Router(routes)



export const AppManager = new ApplicationManager();
Events
  .get(APPLICATION)
  .once(ON_FIRST_ACTIVATION, function(args) {
    // register routes
    router.definePages();
  })
  .once(ON_READY, function(args) {
    args.setPromise(WinJS.UI.processAll()
      .then(() => {
        const commands = document.querySelectorAll('.splitview-commands div[data-win-control="WinJS.UI.SplitViewCommand"]');
        const filteredRoutes = Array.from(commands).filter(command => !!router.routes.find(r => r.label === command.winControl.label));
        router.addRouteListeners(filteredRoutes);
        return WinJS.Navigation.navigate(Home.uri, Home)
      }));
  });

export const AppStorage = new StorageManager(AppManager);
// GLOBAL ERROR HANDLER 

Events
  .get(APPLICATION)
  .on(ON_ERROR, ({ detail }) => {
    const contentDialog = document.querySelector("#global-error-handler");
    contentDialog.innerHTML = `
    <h2 class="win-h2">Woops :(</h2>
    <p>
      It seems that there was something that went out of our hands, please try again or ${ window.Windows ? 'restart the app' : 'refresh your browser'}
      <br> If this is the first time it happens you can safely ignore it, however if you keep seeing this behavior please report it
      to our support team at <b>email@domain.com</b>
    </p>
    `;
    const errorDialog = new WinJS.UI.ContentDialog(contentDialog, {
      title: "Hey Sonething it's not right",
      primaryCommandText: 'Sure, thanks',
      secondaryCommandText: 'Nope, Report Now'
    });
    // run some error reporting stuff
    AppStorage.writeText('last-error', `Date:${new Date().toJSON()}~\nMessage: ${detail.message}~\nERROR: ${detail.stack}`)
      .then(() => errorDialog.show(), console.error)
      .done(({ result }) => result === 'secondary' ?
        window.open(`mailto:email@domain.com?subject=Date:${new Date().toJSON()}~\nMessage: ${detail.message || detail.errorMessage}~&body=ERROR: ${detail.stack || detail.errorMessage}`, 'blank') : undefined);
  });

AppManager.start();
export default { AppManager, AppStorage };
