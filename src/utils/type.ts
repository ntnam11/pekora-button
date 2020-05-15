export default class Voice {
    file!: string;
    constructor(obj: object) {
        this.file = (obj as any).file;

    }
}