import { Key } from './Key';
import { Observer } from './Observer';
declare type Observers = {
    [key: string]: Observer[];
};
export declare class Manager {
    protected observers: Observers;
    getObservers(): Observers;
    on<T = any>(key: string, callback: (value: T) => void): Key;
    off(key: Key): void;
    listen<T = any>(key: string, callback: (value: T) => void): Key;
    unlisten(key: Key): void;
    dispatch(name: string, value?: any): this;
}
export {};
