import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Photos {
  heading = 'Competition Photos';
  photos = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://127.0.0.1:5000/');
    });

    this.http = http;
  }

  activate() {
    return this.http.fetch('photos')
      .then(response => response.json())
      .then(container => {
        console.log("Fetched photos", container);
        this.photos = container.result;
      });
  }
}
