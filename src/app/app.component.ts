import { Component } from '@angular/core';
import { Constants } from './globals';
import { PlayerData } from './globals';

import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Idle Sci-Fi 4X';
  playerData = PlayerData;
  FACTORY_COST = 10;

  // These elements need to be used to enable/disable buttons when we run out of resources
  // This is painful. We have to keep state and update it appropriately.
  // Worse yet, we can't even use !blah in our [disabled] attribute. Ouch.
  doesntHaveEnoughResourcesForResourceAFactory = false;
  
  // c/o https://stackoverflow.com/a/51330020/8641842
  resourceTimer = interval(1000).subscribe(() => {
    for (var i = 0; i < PlayerData.factories.length; i++) {
      var numFactories = PlayerData.factories[i];
      this.harvestResource(i, numFactories);
    }

    this.updateResourcesForButtonsStates();
  });

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
}
