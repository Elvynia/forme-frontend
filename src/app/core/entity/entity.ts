export abstract class Entity {
    id: number;

    constructor(id?: number) {
        this.id = id;
    }

    public abstract clone(entity: Entity): Entity;

    public abstract getClassName(): string;
}
