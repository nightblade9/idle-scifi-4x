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

  it('should harvest Resource A when you click the button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.debugElement.componentInstance.playerData.resources = [0, 0];

    var button = compiled.querySelector('#manual-harvesting button')
    
    expect(fixture.debugElement.componentInstance.playerData.resources[0]).toBe(0);
    button.click();

    expect(fixture.componentInstance.playerData.resources[0]).toBe(1);
  }));

  it('should increase resources when we call harvestResource', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.debugElement.componentInstance.playerData.resources = [0, 0];

    fixture.debugElement.componentInstance.harvestResource(0, 1);
    expect(fixture.debugElement.componentInstance.playerData.resources[0]).toEqual(1);

    fixture.debugElement.componentInstance.harvestResource(1, 7);
    expect(fixture.debugElement.componentInstance.playerData.resources[1]).toEqual(7);

    fixture.destroy();
  }));

  it('should discover Resource A factories when the player reaches 10 of resource A', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.debugElement.componentInstance.playerData.resources = [0, 0];

    fixture.debugElement.componentInstance.harvestResource(0, 9);
    expect(fixture.debugElement.componentInstance.playerData.discoveries).length == 0

    fixture.debugElement.componentInstance.harvestResource(0, 1);
    expect(fixture.debugElement.componentInstance.playerData.discoveries).length == 1;
    expect(fixture.debugElement.componentInstance.playerData.discoveries[0]).toBe("ResourceAFactory");
    
    // Adding more resources doesn't re-add the same thing
    fixture.debugElement.componentInstance.harvestResource(0, 86);
    expect(fixture.debugElement.componentInstance.playerData.discoveries).length == 1;

    fixture.destroy();
  }));

  it('should build a factory if the player has enough 10+ resources', async(() => {
    const fixture = TestBed.createComponent(AppComponent);    
    fixture.debugElement.componentInstance.playerData.resources = [0, 0];

    fixture.debugElement.componentInstance.harvestResource(0, 19);
    
    // Enough to build one
    fixture.debugElement.componentInstance.buildFactory(0);
    expect(fixture.debugElement.componentInstance.playerData.factories[0]).toBe(1);
    expect(fixture.debugElement.componentInstance.playerData.resources[0]).toBe(9);

    // Not enough
    fixture.debugElement.componentInstance.buildFactory(0);
    expect(fixture.debugElement.componentInstance.playerData.factories[0]).toBe(1); // didn't build
    expect(fixture.debugElement.componentInstance.playerData.resources[0]).toBe(9); // didn't decrease
  }));

  it('should return true for playerHasResourcesForFactory if player has 10+ of that resource', async(() => {
    const fixture = TestBed.createComponent(AppComponent);    
    fixture.debugElement.componentInstance.playerData.resources = [0, 0];
    
    fixture.debugElement.componentInstance.harvestResource(0, 9);
    expect(fixture.debugElement.componentInstance.playerHasResourcesForFactory(0)).toBe(false)
    fixture.debugElement.componentInstance.harvestResource(0, 1);
    expect(fixture.debugElement.componentInstance.playerHasResourcesForFactory(0)).toBe(true)
  }));

  it('should set doesntHaveEnoughResourcesForResourceAFactory to true if we have less than 10 of resource A', async(() => {
    const fixture = TestBed.createComponent(AppComponent);    
    fixture.debugElement.componentInstance.playerData.resources = [0, 0];
    
    fixture.debugElement.componentInstance.harvestResource(0, 1);
    expect(fixture.debugElement.componentInstance.doesntHaveEnoughResourcesForResourceAFactory).toBe(true);

    fixture.debugElement.componentInstance.harvestResource(0, 9);
    expect(fixture.debugElement.componentInstance.doesntHaveEnoughResourcesForResourceAFactory).toBe(false);

    fixture.debugElement.componentInstance.buildFactory(0)
    expect(fixture.debugElement.componentInstance.doesntHaveEnoughResourcesForResourceAFactory).toBe(true);
  }));

  it('should show the buildings section if the player has 10+ of resource A', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#buildings')).toBeNull();
    fixture.debugElement.componentInstance.harvestResource(0, 10);

    fixture.detectChanges();
    expect(compiled.querySelector('#buildings')).toBeTruthy();
    fixture.destroy();
  }));

  it('should show the buildings section if the player has discovered resource A factories', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#buildings')).toBeNull();
    fixture.debugElement.componentInstance.playerData.discoveries.push("ResourceAFactory");

    fixture.detectChanges();
    expect(compiled.querySelector('#buildings')).toBeTruthy();
    fixture.destroy();
  }));

  it('should buy a Resource A factory after you click the button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.debugElement.componentInstance.playerData.factories = [0];

    // Show the button by adding the discovery
    fixture.debugElement.componentInstance.playerData.discoveries = ["ResourceAFactory"];
    fixture.detectChanges();

    var button = compiled.querySelector('#buildings button')
    
    expect(fixture.debugElement.componentInstance.playerData.factories[0]).toBe(0);
    button.click();

    expect(fixture.componentInstance.playerData.factories[0]).toBe(1);
    fixture.destroy();
  }));
});
