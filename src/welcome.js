import {inject, computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Welcome {
  heading = 'Freezing Saddles Competition';

  teamCount = null;
  contestantCount = null;
  totalRides = null;

  rainHours = null;
  snowHours = null;
  subFreezingHours = null;

  totalHours = null;
  totalMiles = null;
  totalRides = null;

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://127.0.0.1:5000/');
    });

    this.http = http;
  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    // if (this.fullName !== this.previousValue) {
    //   return confirm('Are you sure you want to leave?');
    // }
    return true;
  }
  activate() {
    return this.loadStats();
  }

  loadStats() {
    return this.http.fetch('stats/general')
      .then(response => response.json())
      .then(stats => {
        console.log("Received server stats", stats);
        this.teamCount = stats.team_count;
        this.contestantCount = stats.contestant_count;
        this.totalRides = stats.total_rides;
        this.totalHours = stats.total_hours;
        this.totalMiles = stats.total_miles;
        this.subFreezingHours = stats.sub_freezing_hours;
        this.rainHours = stats.rain_hours;
        this.snowHours = stats.snow_hours;
      });
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
