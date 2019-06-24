export class ScriptModel {
    constructor(
        public name?: string,
        public createdDate?: string,
        public status?: boolean,
        public steps?: any
    ) {
        this.status = true;
        this.steps = [];
    }
}