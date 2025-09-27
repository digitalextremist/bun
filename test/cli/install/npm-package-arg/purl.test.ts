//import { npa } from "bun:internal-for-testing";
//import { test, expect, describe } from "bun:test";
//
//describe('toPurl', () => {
//  test('valid', () => {
//    // Unscoped package
//    expect(npa.toPurl('foo@1.2.3')).toBe('pkg:npm/foo@1.2.3');
//
//    // Scoped package
//    expect(
//      npa.toPurl('@foo/bar@1.2.3-alpha.1')
//    ).toBe('pkg:npm/%40foo/bar@1.2.3-alpha.1');
//
//    // Non-default registry
//    expect(
//      npa.toPurl({ name: '@foo/bar', rawSpec: '1.0.0' }, 'https://npm.pkg.github.com')
//    ).toBe('pkg:npm/%40foo/bar@1.0.0?repository_url=https://npm.pkg.github.com');
//
//    // Default registry
//    expect(
//      npa.toPurl({ name: '@foo/bar', rawSpec: '1.0.0' }, 'https://registry.npmjs.org')
//    ).toBe('pkg:npm/%40foo/bar@1.0.0');
//  });
//
//  test('invalid', () => {
//    // Invalid package name
//    expect(() => npa.toPurl({ name: 'foo/bar', rawSpec: '1.0.0' })).toThrow();
//
//    // Invalid version
//    expect(() => npa.toPurl('foo@a.b.c')).toThrow();
//
//    // Invalid type
//    expect(() => npa.toPurl('git+ssh://git@github.com/user/foo#1.2.3')).toThrow();
//  });
//});
