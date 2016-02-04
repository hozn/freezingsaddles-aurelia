export class DataExplore {
  heading = 'Data Exploration';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'datawelcome'], name: 'datawelcom', moduleId: './views/datawelcome',       nav: true, title: 'Data Welcome' },
      { route: ['', 'chart1'], name: 'chart1', moduleId: './views/chart1',       nav: true, title: 'Chart 1' },
      //{ route: 'users',         name: 'users',         moduleId: 'users',         nav: true, title: 'Github Users' },
      //{ route: 'child-router',  name: 'child-router',  moduleId: 'child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
