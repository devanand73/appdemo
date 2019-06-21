export class StepModel {
    constructor(
        public stepsName?: string,
        public stepsDetail?: Array<Steplist>,
        public status?: boolean,
        public created_date?: string,
        public _id?: string
    ) {
        this.stepsDetail = [];
    }
}

export class Steplist {
    constructor(
        public step?: string,
        public note?: string,
        public status?: boolean
    ) {
        this.status = true
    }
}