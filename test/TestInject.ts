import { expect } from 'chai';
import { getInject, Inject } from 'src/Inject';
import { describeAsync, itAsync } from 'test/helpers/async';

describeAsync('injection decorator', async () => {
  itAsync('should attach dependencies', async () => {
    class FooClass { /* noop */ }
    const dep = {
      contract: FooClass,
      name: 'foo',
    };

    @Inject(dep)
    class TestClass { /* noop */ }

    expect(getInject(TestClass)).to.deep.equal([dep]);
  });

  itAsync('should handle missing dependencies', async () => {
    class TestClass { /* noop */ }

    expect(getInject(TestClass)).to.deep.equal([]);
  });

  itAsync('should flatten dependencies', async () => {
    class FooClass { /* noop */ }

    @Inject(FooClass)
    class TestClass { /* noop */ }

    expect(getInject(TestClass)).to.deep.equal([{
      contract: FooClass,
      name: FooClass.name,
    }]);
  });
});
