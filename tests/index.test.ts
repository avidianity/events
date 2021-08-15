import { Manager } from '../src';
import { Key } from '../src/Key';

describe('manager works as a pub/sub client', () => {
	it('creates a key for a listener', () => {
		const manager = new Manager();

		const key = manager.listen('key', () => {});

		expect(key).toBeInstanceOf(Key);
	});

	it('removes a key for a listener', () => {
		const manager = new Manager();

		const key = manager.listen('key', () => {});

		manager.unlisten(key);

		const exists = manager.getObservers()[key.getName()].find((k) => key.getID() === key.getID());

		expect(exists).toBeUndefined();
	});

	it('dispatches values to listeners', () => {
		return new Promise<void>((resolve, reject) => {
			const manager = new Manager();

			let handle: NodeJS.Timeout | null = null;

			manager.listen('key', () => {
				if (handle) {
					clearTimeout(handle);
				}
				resolve();
			});

			manager.dispatch('key', null);

			handle = setTimeout(reject, 1000);
		});
	});

	it('does not dispatch values to listeners', () => {
		return new Promise<void>((resolve, reject) => {
			const manager = new Manager();

			const key = manager.listen('key', reject);

			manager.unlisten(key);

			manager.dispatch('key', null);

			resolve();
		});
	});
});
