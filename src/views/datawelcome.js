import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class DataWelcome {
  heading = 'Data Welcome';

  constructor(http) {
    this.http = http;
  }

}
