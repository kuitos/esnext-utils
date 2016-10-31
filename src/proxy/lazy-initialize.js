/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-31
 */

const initialize = (origin, lazyInitialization) => {

	let initialized = false;
	let initializedTarget = null;

	const initialization = target => {
		if (!initialized) {
			initializedTarget = lazyInitialization(target);
			initialized = true;
		}
	};

	const get = (target, property) => {
		initialization(target);
		return initializedTarget[property];
	};

	const apply = (target, thisArg, argumentsList) => {
		initialization(target);
		return initializedTarget.apply(thisArg, argumentsList);
	};

	return typeof origin === 'function' ? {get, apply} : {get};

};

export default function lazyInitialize(target, lazyInitialization) {
	return new Proxy(target, initialize(target, lazyInitialization));
}
