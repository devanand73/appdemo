export class ScriptModel {
    constructor(
        public script?:string,
        public created_date?:string,
        public status?:boolean
    ){
        this.status = true;
    }
}