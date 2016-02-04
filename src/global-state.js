import {bindable, inject, computedFrom} from 'aurelia-framework';

export class GlobalState {

    _leaderboard = null;

    constructor() {
      
    }

    @computedFrom('_leaderboard')
    get leaderboard() {

    }

    set leaderboard(newLeaderboard) {
      this._leaderboard = newLeaderboard;
    }
}
