/**
 * Created by Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-11-29
 */
import { assert } from 'chai';
import Bind from '../bind';

describe('bind decorator', () => {

	class Service {

		public age: number;
		public name: string;

		constructor(name = 'kuitos') {
			this.name = name;
			this.age = 0;
		}

		@Bind
		public getName() {
			return this.name;
		}

		@Bind
		public getName2() {
			return this.name + '2';
		}

	}

	it('Service Recipe: this pointer always equal service instance', () => {
		const serviceInstance = new Service('kuitos');
		const getName = serviceInstance.getName;
		assert.equal(getName(), serviceInstance.name);
	});

	it('this pointer should not obstruct each instance', () => {
		const service1GetName = new Service('l').getName;
		const service2GetName = new Service('k').getName;
		assert.notEqual(service1GetName(), service2GetName());
	});

	it('function should always share the same instance', () => {
		const service = new Service('kuitos');
		const getName1 = service.getName;
		const getName2 = service.getName;
		const get2AppendedName = service.getName2;
		assert.equal(getName1, getName2);
		assert.equal(get2AppendedName(), 'kuitos2');
	});

	it('reassign should also worked well', () => {
		const service = new Service('kuitos');
		const original = service.getName;
		service.getName = () => {
			return original() + '6666';
		};
		const getName = service.getName;
		assert.equal(getName(), 'kuitos6666');
	});

	it('worked well although use decorator without @ symbol like compiled after webpack', () => {

		const descriptors = [
			{
				key: 'fn1',
				value() {
					return 1;
				}
			},
			{
				key: 'fn2',
				value() {
					return 2;
				}
			}
		];

		class Klass {
			public fn1: Function;
			public fn2: Function;
		}

		descriptors.forEach(descriptor => {
			const target = Klass.prototype;
			const name = descriptor.key;
			Object.defineProperty(target, name, Bind(target, name, descriptor));
		});

		const instance = new Klass();

		assert.notEqual(instance.fn1, instance.fn2);
		assert.equal(instance.fn1(), 1);
		assert.equal(instance.fn2(), 2);
	});
});
