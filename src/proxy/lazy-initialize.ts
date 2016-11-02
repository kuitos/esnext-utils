/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-31
 */

const initialize = <T>(origin: T, lazyInitialization: Function): ProxyHandler<T> => {

	let initialized: boolean = false;
	let initializedTarget: any = null;

	const initialization = (target: any) => {
		if (!initialized) {
			initializedTarget = lazyInitialization(target);
			initialized = true;
		}
	};

	const get = (target: any, property: string): any => {
		initialization(target);
		return initializedTarget[property];
	};

	const apply = (target: any, thisArg: any, argumentsList: Array<any>) => {
		initialization(target);
		return initializedTarget.apply(thisArg, argumentsList);
	};

	return typeof origin === 'function' ? {get, apply} : {get};
};

export default function lazyInitialize<T>(target: T, lazyInitialization: Function): T {
	return new Proxy(target, initialize(target, lazyInitialization));
}
