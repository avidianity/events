import { Key } from './Key';
import { Observer } from './Observer';

type Observers = {
	[key: string]: Observer[];
};

export class Manager {
	protected observers: Observers = {};

	getObservers(): Observers {
		return { ...this.observers };
	}

	on<T = any>(key: string, callback: (value: T) => void) {
		return this.listen<T>(key, callback);
	}

	off(key: Key) {
		return this.unlisten(key);
	}

	clear() {
		for (const key in this.observers) {
			this.observers[key] = [];
		}

		return this;
	}

	listen<T = any>(key: string, callback: (value: T) => void) {
		if (!(key in this.observers)) {
			this.observers[key] = [];
		}

		const handle = new Key(key);
		this.observers[key].unshift(new Observer(handle, callback));

		return handle;
	}

	unlisten(key: Key) {
		const name = key.getName();
		const id = key.getID();

		if (!(name in this.observers)) {
			return;
		}

		const index = this.observers[name].findIndex((observer) => observer.getKey().getID() === id);

		if (index >= 0) {
			this.observers[name].splice(index, 1);
		}
	}

	dispatch(name: string, value?: any) {
		if (!(name in this.observers)) {
			return this;
		}

		this.observers[name].forEach((observer) => observer.execute(value));
		return this;
	}
}
