export class PlaceHolderModel {
    constructor(
        public name?: string,
        public createdDate?: string,
        public status?: boolean
    ) {
        this.status = true;
    }
}
