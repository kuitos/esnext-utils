/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-31
 */

export default function lazyInitialize(target, lazyInitialization) {

	let initialized = false;

	return new Proxy(target, {
		get(target, property) {

			const result = initialized ? target[property] : lazyInitialization(target, property);
			initialized = true;
			return result;
		}
	});

}
