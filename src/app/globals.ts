// Keep this as simple as possible and try to avoid coupling.
// The idea is to keep simple constants, like resource names/icons.
'use strict';
export const Constants = Object.freeze({
    RESOURCES: [
        {"name": "Cubes", "icon": "cube"},
        {"name": "Leaves", "icon": "leaf"},
        {"name": "Carbon", "icon": "diamond"},
        {"name": "Neodymium", "icon": "magnet"}
    ],
    
    ENERGY_NAME: "Energy",
    ENERGY_ICON: "bolt"
});

export const PlayerData = {
    "resources": [0, 0, 0, 0],
    "energy": 0,
    "discoveries": [] // A buncha strings saying we discovered XYZ, eg. the cubes factory
}