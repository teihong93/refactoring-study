import { Producer } from "./Producer.mjs";

export class Province {
    constructor(doc) {
        this._name = doc.name;
        this._producers = [];
        this._totalProduction = 0;
        this._demand = doc.demand;
        this._price = doc.price;
        doc.producers.forEach((d) => {
            this.addProducer(new Producer(this, d));
        });
    }

    addProducer(arg) {
        this._producers.push(arg);
        this._totalProduction += arg.production;
    }

    get name() {
        return this._name;
    }

    get producers() {
        return this._producers.slice();
    }

    get totalProduction() {
        return this._totalProduction;
    }

    set totalProduction(arg) {
        this._totalProduction = arg;
    }

    get demand() {
        return this._demand;
    }

    set demand(arg) {
        return (this._demand = arg);
    }

    get price() {
        return this._price;
    }

    set price(arg) {
        this._price = parseInt(arg);
    }

    get shortfall() {
        return this._demand - this.totalProduction;
    }

    get profit() {
        return this.demandValue - this.demandConst;
    }

    get demandValue() {
        return this.satisfiedDemand * this.price;
    }

    get satisfiedDemand() {
        return Math.min(this._demand, this.totalProduction);
    }

    get demandConst() {
        let remainingDemand = this.demand;
        let result = 0;
        this.producers
            .sort((a, b) => a.cost - b.cost)
            .forEach((p) => {
                const contribution = Math.min(remainingDemand, p.production);
                remainingDemand -= contribution;
                result += contribution * p.cost;
            });
        return result;
    }
}

export function sampleProvinceData() {
    return {
        name: "Aisa",
        producers: [
            { name: "Byzantoum", cost: 10, production: 9 },
            { name: "Attalia", cost: 12, production: 10 },
            { name: "Sinope", cost: 10, production: 6 },
        ],
        demand: 30,
        price: 20,
    };
}
