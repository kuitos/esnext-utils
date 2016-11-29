/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-06
 */

/**
 * bind装饰器,用于处理function bind不适用的场景
 */
export default (target: any, name: PropertyKey, descriptor: PropertyDescriptor) => {

	if (!descriptor) {
		throw new Error('can not use Bind decorator with a constructor!');
	}

	const fn = descriptor.value || target[name];
	// use function string as identifier which can ensure every function uniquely after wrapped
	// we can not use Function.name as identifier because its name may be empty(anonymous function)
	// or defined by other ways(such as Object.defineProperty)
	const fnName: string = `__${fn}Fn__`;

	// 定义访问器属性的同时不能定义value跟writable
	// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
	delete descriptor.value;
	delete descriptor.writable;

	descriptor.set = function (value): void {
		this[fnName] = value;
	};

	descriptor.get = function (): any {
		return this[fnName] || (this[fnName] = fn.bind(this));
	};

	return descriptor;
};
