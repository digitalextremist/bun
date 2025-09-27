import { npa } from "bun:internal-for-testing";
import { test, expect, beforeAll, afterAll } from "bun:test";

// redefine process.platform before any requires so that we don't cache a require that got the non-redefined value
const { platform } = process;

beforeAll(() => {
  Object.defineProperty(process, 'platform', { value: 'win32' });
});

afterAll(() => {
  Object.defineProperty(process, 'platform', { value: platform });
});

const cases = {
  'C:\\x\\y\\z': {
    raw: 'C:\\x\\y\\z',
    scope: null,
    name: null,
    escapedName: null,
    rawSpec: 'C:\\x\\y\\z',
    fetchSpec: 'C:\\x\\y\\z',
    type: 'directory',
  },

  'foo@C:\\x\\y\\z': {
    raw: 'foo@C:\\x\\y\\z',
    scope: null,
    name: 'foo',
    escapedName: 'foo',
    rawSpec: 'C:\\x\\y\\z',
    fetchSpec: 'C:\\x\\y\\z',
    type: 'directory',
  },

  'foo@file:///C:\\x\\y\\z': {
    raw: 'foo@file:///C:\\x\\y\\z',
    scope: null,
    name: 'foo',
    escapedName: 'foo',
    rawSpec: 'file:///C:\\x\\y\\z',
    fetchSpec: 'C:\\x\\y\\z',
    type: 'directory',
  },

  'foo@file://C:\\x\\y\\z': {
    raw: 'foo@file://C:\\x\\y\\z',
    scope: null,
    name: 'foo',
    escapedName: 'foo',
    rawSpec: 'file://C:\\x\\y\\z',
    fetchSpec: 'C:\\x\\y\\z',
    type: 'directory',
  },

  'file:///C:\\x\\y\\z': {
    raw: 'file:///C:\\x\\y\\z',
    scope: null,
    name: null,
    escapedName: null,
    rawSpec: 'file:///C:\\x\\y\\z',
    fetchSpec: 'C:\\x\\y\\z',
    type: 'directory',
  },

  'file://C:\\x\\y\\z': {
    raw: 'file://C:\\x\\y\\z',
    scope: null,
    name: null,
    escapedName: null,
    rawSpec: 'file://C:\\x\\y\\z',
    fetchSpec: 'C:\\x\\y\\z',
    type: 'directory',
  },

  'foo@/foo/bar/baz': {
    raw: 'foo@/foo/bar/baz',
    scope: null,
    name: 'foo',
    escapedName: 'foo',
    rawSpec: '/foo/bar/baz',
    fetchSpec: 'C:\\foo\\bar\\baz',
    type: 'directory',
  },

  'foo@git+file://C:\\x\\y\\z': {
    type: 'git',
    registry: null,
    where: null,
    raw: 'foo@git+file://C:\\x\\y\\z',
    name: 'foo',
    escapedName: 'foo',
    scope: null,
    rawSpec: 'git+file://C:\\x\\y\\z',
    saveSpec: 'git+file://C:\\x\\y\\z',
    fetchSpec: 'file://c:/x/y/z',
    gitRange: null,
    gitCommittish: null,
    hosted: null,
  },
};

test('parse a windows path', () => {
  Object.keys(cases).forEach((c) => {
    const expected = cases[c];
    const actual = npa(c, 'C:\\test\\path');
    expect(actual).toMatchObject(expected);
  });
});