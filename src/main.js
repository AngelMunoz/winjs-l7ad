import 'winjs/css/ui-dark.css';
import './managers/navigation.manager';
import ApplicationManager, { ON_FIRST_ACTIVATION, ON_READY } from "./managers/application.manager";
import Router from "./managers/route.manager";
import Events, { APPLICATION } from "./managers/event.manager";
import StorageManager from './managers/storage.manager';

import Home from './pages/home/home';
import About from './pages/about/about';


const routes = [Home, About];
const router = new Router(routes)



const app = new ApplicationManager();
Events.get(APPLICATION)
  .once(ON_FIRST_ACTIVATION, function(args) {
    // register routes
    router.definePages();
  })
  .once(ON_READY, function(args) {
    args.setPromise(WinJS.UI.processAll().then(() => {
      const commands = document.querySelectorAll('.splitview-commands div[data-win-control="WinJS.UI.SplitViewCommand"]');
      const filteredRoutes = Array.from(commands).filter(command => !!router.routes.find(r => r.label === command.winControl.label));
      router.addRouteListeners(filteredRoutes);
      return WinJS.Navigation.navigate(Home.uri, Home)
    }));
  });

app.start();

export const appStorage = new StorageManager(app);
export default app;
