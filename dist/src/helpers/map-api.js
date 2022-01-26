"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCoordinates = void 0;
const findCoordinates = (address, city) => {
    const { street, house } = address;
    const apartment = address.apartment ? `+${address.apartment}` : '';
    let coordinates;
    fetch(`https://nominatim.openstreetmap.org/search?q=${street}+${house}${apartment},+${city}=json`)
        .then(res => res.json())
        .then(data => coordinates = data[0].boundingbox)
        .catch(err => console.log(err));
    return coordinates;
};
exports.findCoordinates = findCoordinates;
