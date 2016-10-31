/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-31
 */

import lazyInitialize from '../lazy-initialize';
import sinon from 'sinon';
import { assert } from 'chai';

describe('lazy initialize', () => {

	const object = {
		name: 'kuitos',
		age: 20
	};
	const spy = sinon.spy();
	const actuallyFn = lazyInitialize(object, (target, property) => {
		spy(target, property);
		return target[property];
	});

	it('initialize should be invoke when actually called only', () => {

		assert.isFalse(spy.called);

		const name = actuallyFn.name;
		assert.equal(name, object.name);

		const age = actuallyFn.age;
		assert.equal(age, object.age);

		assert.isTrue(spy.calledOnce);
		assert.isTrue(spy.calledWith(object, 'name'));

	});

});
