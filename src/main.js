import 'bootstrap';
import {GlobalState} from 'global-state';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';


export function configure(aurelia) {

  let httpClient = new HttpClient();

  httpClient.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl('http://127.0.0.1:5000/api/');
  });

  aurelia.container.registerInstance(HttpClient, httpClient);

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css');
    //.plugin('aurelia-flux');

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.use.plugin('aurelia-task-queue');

  aurelia.start().then(
    (a) => {
      a.setRoot();

      //a.container.registerSingleton(GlobalState);
      //a.container.get(GlobalState);

  });

}
