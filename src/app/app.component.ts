import { Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from './globals';
import { PlayerData } from './globals';

import { interval } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'Idle Sci-Fi 4X';
  playerData = PlayerData;
  FACTORY_COST = 10;
  alive = true;
  interval = 1000; // 1000 = 1s
  timerSubscription = null

  // These elements need to be used to enable/disable buttons when we run out of resources
  // This is painful. We have to keep state and update it appropriately.
  // Worse yet, we can't even use !blah in our [disabled] attribute. Ouch.
  doesntHaveEnoughResourcesForResourceAFactory = false;
  
  ngOnInit() {    
    const coreTimer = interval(this.interval);
    this.timerSubscription = coreTimer.subscribe((elapsed) => {
      for (var i = 0; i < PlayerData.factories.length; i++) {
        var numFactories = PlayerData.factories[i];
        this.harvestResource(i, numFactories);
      }
      this.updateResourcesForButtonsStates();
    });
  }
  

  get constants() {
    return Constants;
  }

  public harvestResource = (index, amount = 1) => {
    PlayerData.resources[index] += amount;

    this.updateResourcesForButtonsStates();

    // This logic should probably go in a controller/service.
    if (!PlayerData.discoveries.includes("ResourceAFactory") && this.playerHasResourcesForFactory(0))
    {
      PlayerData.discoveries.push("ResourceAFactory");
    }
  }

  public buildFactory = (resourceIndex) => {
    // redundant but safer
    if (this.playerHasResourcesForFactory(resourceIndex)) {
      PlayerData.resources[resourceIndex] -= this.FACTORY_COST;
      PlayerData.factories[resourceIndex] += 1;
    }
    this.updateResourcesForButtonsStates();
  }

  public playerHasResourcesForFactory = (resourceIndex) => {
    return PlayerData.resources[resourceIndex] >= this.FACTORY_COST;
  }

  private updateResourcesForButtonsStates = () => {
    this.doesntHaveEnoughResourcesForResourceAFactory = !this.playerHasResourcesForFactory(0);
  }

  public ngOnDestroy() {
    if (this.timerSubscription != null) {
      this.timerSubscription.unsubscribe();
    }
  }
}
