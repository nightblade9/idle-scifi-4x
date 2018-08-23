import { Component } from '@angular/core';
import { Constants } from './globals';
import { PlayerData } from './globals';

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
  
  get constants() {
    return Constants;
  }

  public harvestResource = (index) => {
    PlayerData.resources[index] += 1;

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
      console.log("You got a factory!"); // lulz
      this.updateResourcesForButtonsStates();
    }
  }

  public playerHasResourcesForFactory = (resourceIndex) => {
    return PlayerData.resources[resourceIndex] >= this.FACTORY_COST;
  }

  private updateResourcesForButtonsStates = () => {
    this.doesntHaveEnoughResourcesForResourceAFactory = !this.playerHasResourcesForFactory(0);
  }
}
