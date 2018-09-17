import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class PlayerData {
    resources = [0, 0, 0, 0];
    energy = 0;
    discoveries = []; // A buncha strings saying we discovered XYZ, eg. the cubes factory ("ResourceAFactory")
    factories = [0, 0, 0, 0];
}