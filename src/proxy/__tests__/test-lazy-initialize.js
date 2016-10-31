/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-31
 */

import lazyInitialize from '../lazy-initialize';
import sinon from 'sinon';
import { assert } from 'chai';

describe('lazy initialize', () => {

	describe('initialize should be invoke when actually called only', () => {

		it('when object called', () => {

			const object = {
				name: 'kuitos',
				age: 20
			};
			const spy = sinon.spy();
			const actuallyFn = lazyInitialize(object, target => {
				spy(target);
				return target;
			});

			assert.isFalse(spy.called);

			const name = actuallyFn.name;
			assert.equal(name, object.name);

			const age = actuallyFn.age;
			assert.equal(age, object.age);

			assert.isTrue(spy.calledOnce);
			assert.isTrue(spy.calledWith(object));
		});

		it('when function called', () => {

			let counter = 0;
			const fn = () => counter;
			const actuallyFn = lazyInitialize(fn, () => {
				return () => counter + 1;
			});

			const result = actuallyFn();
			assert.equal(result, counter + 1);
			const result1 = actuallyFn();
			assert.equal(result1, counter + 1);

			const length = actuallyFn.length;
			assert.equal(length, 0);
		});

	});

});
