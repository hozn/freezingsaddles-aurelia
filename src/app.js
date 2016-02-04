export class App {
  configureRouter(config, router) {
    config.title = 'Freezing Saddles';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'photos',        name: 'photos',       moduleId: 'views/photos', nav: true, title: 'Competition Photos' },
      { route: 'leaderboard',   name: 'leaderboard',  moduleId: 'leaderboard',  nav: true, title: 'Leaderboard' },
      { route: 'data-explore',  name: 'data-explore', moduleId: 'data-explore', nav: true, title: 'Data Exploration' }
    ]);

    this.router = router;
  }
}
