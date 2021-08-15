# @avidian/events

A pub/sub library for handling events.

## Installation

NPM

```sh
npm install @avidian/events
```

Yarn

```sh
yarn add @avidian/events
```

## Usage

```javascript
import { Manager } from '@avidian/events';

const manager = new Manager();

// listen to events
const key = manager.on('my_event_key', (value) => {
    console.log(value);
}); // or manager.listen(name, callback)

// dispatch values to events
manager.dispatch('my_event_key', 'value');

// unlisten specific key to events
manager.off(key); // or manager.unlisten(key)

// clear all listeners
manager.clear();

```

## License

[MIT License](https://github.com/avidianity/events/blob/master/LICENSE)
