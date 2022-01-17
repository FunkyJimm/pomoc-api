"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schelter_1 = __importDefault(require("../db/models/schelter"));
// get all shelters list
const getShelters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    schelter_1.default.find()
        .then(shelters => {
        if (Object.keys(shelters).length === 0) {
            return res.status(404).send({
                message: 'Error. Shelters list are empty.'
            });
        }
        const sheltersList = shelters.map(shelter => ({
            id: shelter._id,
            name: shelter.name,
            totalNumberOfBeds: shelter.totalNumberOfBeds,
            occupiedNumberOfBeds: shelter.occupiedNumberOfBeds,
        }));
        res.send(sheltersList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong with the server :( Try again later.'
        });
    });
});
// get shelter details
const getShelterDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.shelterId;
    schelter_1.default.findById(id)
        .then(shelter => {
        if (!shelter) {
            return res.status(404).send({
                message: `Shelter with Id: ${id} is not found.`
            });
        }
        res.send(shelter);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Shelter with Id: ${id} is not found.`
            });
        }
        return res.status(500).send({
            message: `Error retrieving shelter with Id: ${id}. Try again later!`
        });
    });
});
// add a shelter
const addShelter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: 'Content can not be empty.'
        });
    }
    const { name, address, city, zipCode, phone, totalNumberOfBeds } = req.body;
    const shelter = new schelter_1.default({ name, address, city, zipCode, phone, totalNumberOfBeds });
    shelter.save(err => {
        if (err) {
            res.status(500).send(err.message || 'Error. Shelter can not be added.');
        }
        else {
            res.send('Shelter has been successfully added.');
        }
    });
});
// update a shelter
const updateShelter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: 'Content can not be empty.'
        });
    }
    const id = req.params.shelterId;
    const { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds } = req.body;
    const options = {
        runValidator: true,
        upsert: false,
    };
    schelter_1.default.findByIdAndUpdate(id, { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds }, options, (err) => {
        if (err) {
            res.status(404).send({
                message: `Shelter with Id: ${id} is not found.`
            });
        }
        else {
            res.send('Shelter has been updated.');
        }
    });
});
// delete a shelter
const deleteShelter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.shelterId;
    schelter_1.default.findByIdAndDelete(id, null, (err) => {
        if (err) {
            res.status(404).send({
                message: `Shelter with Id: ${id} is not found.`
            });
        }
        else {
            res.send('Shelter has been deleted.');
        }
    });
});
exports.default = {
    getShelters,
    getShelterDetails,
    addShelter,
    updateShelter,
    deleteShelter,
};
