export default class Registry {
    dependencies: any = {}

    register(name: string, value: any){
        this.dependencies[name] = value;
    }

    inject(name: string) {
        return this.dependencies[name];
    }
}