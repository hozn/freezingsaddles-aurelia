export class App {
  configureRouter(config, router) {
    config.title = 'Freezing Saddles';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'photos',        name: 'photos',       moduleId: 'photos',       nav: true, title: 'Competition Photos' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
