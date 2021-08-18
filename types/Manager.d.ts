import { Key } from './Key';
import { Observer } from './Observer';
export declare type Observers = {
    [key: string]: Observer[];
};
export declare type BulkListeners = {
    [key: string]: (value: any) => void;
};
export declare class Manager {
    protected observers: Observers;
    getObservers(): Observers;
    on<T = any>(key: string, callback: (value: T) => void): Key;
    off(key: Key): void;
    clear(): this;
    bulk(payload: BulkListeners): () => void;
    listen<T = any>(key: string, callback: (value: T) => void): Key;
    unlisten(key: Key): void;
    dispatch(name: string, value?: any): this;
}
