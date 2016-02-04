import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Photos {
  heading = 'Competition Photos';
  photos = [];

  constructor(http) {
    this.http = http;
  }

  activate(params, routeConfig) {
    console.log(params);

    return this.http.fetch('photos')
      .then(response => response.json())
      .then(container => {
        // console.log("Fetched photos", container);
        this.photos = container.result;
      });
  }
}
