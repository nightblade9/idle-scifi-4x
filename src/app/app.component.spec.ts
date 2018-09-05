import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidebarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have an appropriate title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Idle Sci-Fi 4X');
  }));

  it('should render a manual harvesting section', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#manual-harvesting p').textContent).toContain('Manual harvesting');
  }));

  it('should have a harvest button for Resource A', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#manual-harvesting button').textContent).toContain('Harvest Cubes');
    // Fix fixture timeouts due to the use of setInterval and friends
    fixture.destroy();
  }));

  it('should increase resources when we call harvestResource', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.componentInstance.harvestResource(0, 1);
    expect(fixture.componentInstance.playerData.resources[0]).toEqual(1);

    fixture.componentInstance.harvestResource(2, 7);
    expect(fixture.componentInstance.playerData.resources[2]).toEqual(7);

    fixture.destroy();
  }));

  it('should discover Resource A factories when the player reaches 10 of resource A', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.playerData.resources = [0, 0];

    fixture.componentInstance.harvestResource(0, 9);
    expect(fixture.componentInstance.playerData.discoveries).length == 0

    fixture.componentInstance.harvestResource(0, 1);
    expect(fixture.componentInstance.playerData.discoveries).length == 1;
    expect(fixture.componentInstance.playerData.discoveries[0]).toBe("ResourceAFactory");
    
    // Adding more resources doesn't re-add the same thing
    fixture.componentInstance.harvestResource(0, 86);
    expect(fixture.componentInstance.playerData.discoveries).length == 1;

    fixture.destroy();
  }));

  it('should build a factory if the player has enough 10+ resources', async(() => {
    const fixture = TestBed.createComponent(AppComponent);    
    fixture.componentInstance.playerData.resources = [0, 0];

    fixture.componentInstance.harvestResource(0, 19);
    
    // Enough to build one
    fixture.componentInstance.buildFactory(0);
    expect(fixture.componentInstance.playerData.factories[0]).toBe(1);
    expect(fixture.componentInstance.playerData.resources[0]).toBe(9);

    // Not enough
    fixture.componentInstance.buildFactory(0);
    expect(fixture.componentInstance.playerData.factories[0]).toBe(1); // didn't build
    expect(fixture.componentInstance.playerData.resources[0]).toBe(9); // didn't decrease
  }));

  it('should return true for playerHasResourcesForFactory if player has 10+ of that resource', async(() => {
    const fixture = TestBed.createComponent(AppComponent);    
    fixture.componentInstance.playerData.resources = [0, 0];
    
    fixture.componentInstance.harvestResource(0, 9);
    expect(fixture.componentInstance.playerHasResourcesForFactory(0)).toBe(false)
    fixture.componentInstance.harvestResource(0, 1);
    expect(fixture.componentInstance.playerHasResourcesForFactory(0)).toBe(true)
  }));

  it('should set doesntHaveEnoughResourcesForResourceAFactory to true if we have less than 10 of resource A', async(() => {
    const fixture = TestBed.createComponent(AppComponent);    
    fixture.componentInstance.playerData.resources = [0, 0];
    
    fixture.componentInstance.harvestResource(0, 1);
    expect(fixture.componentInstance.doesntHaveEnoughResourcesForResourceAFactory).toBe(true);

    fixture.componentInstance.harvestResource(0, 9);
    expect(fixture.componentInstance.doesntHaveEnoughResourcesForResourceAFactory).toBe(false);

    fixture.componentInstance.buildFactory(0)
    expect(fixture.componentInstance.doesntHaveEnoughResourcesForResourceAFactory).toBe(true);
  }));
});
