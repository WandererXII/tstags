import { tag } from '../src/tag.js';

test('simple', () => {
  expect(tag('div')).toEqual(`<div></div>`);
  expect(tag('br')).toEqual(`<br />`);
});

test('with selector', () => {
  expect(tag('div.cls')).toEqual(`<div class="cls"></div>`);
  expect(tag('div#id')).toEqual(`<div id="id"></div>`);
  expect(tag('div.my#very')).toEqual(`<div class="my" id="very"></div>`);
  expect(tag('div#my.very')).toEqual(`<div class="very" id="my"></div>`);
  expect(tag('div.cls.another')).toEqual(`<div class="cls another"></div>`);
  expect(tag('div.cls.another.omg')).toEqual(
    `<div class="cls another omg"></div>`
  );
  expect(tag('div#id#what')).toEqual(`<div id="id"></div>`);
  expect(tag('div#id.what.was.that')).toEqual(
    `<div class="what was that" id="id"></div>`
  );
  expect(tag('div.what.was.that#id')).toEqual(
    `<div class="what was that" id="id"></div>`
  );
});

test('with attrs', () => {
  expect(tag('a', { href: 'http' })).toEqual(`<a href="http"></a>`);
  expect(tag('a.cls', { href: 'http' })).toEqual(
    `<a class="cls" href="http"></a>`
  );
  expect(tag('div', { class: 'what' })).toEqual(`<div class="what"></div>`);
  expect(tag('div.cls', { class: 'what' })).toEqual(
    `<div class="what cls"></div>`
  );
  expect(tag('img', { src: 'http', 'aria-label': 'pic' })).toEqual(
    `<img aria-label="pic" src="http" />`
  );

  expect(tag('div#id', { id: 'realId' })).toEqual(`<div id="realId"></div>`);

  expect(tag('input', { type: 'checkbox', checked: false })).toEqual(
    `<input type="checkbox" />`
  );
  expect(tag('input', { type: 'checkbox', checked: true })).toEqual(
    `<input checked type="checkbox" />`
  );
  expect(tag('div', { 'custom-boolean-attr': true })).toEqual(
    `<div custom-boolean-attr></div>`
  );
});

test('with string data', () => {
  expect(tag('title', 'data')).toEqual(`<title>data</title>`);
  expect(tag('title', 'data')).toEqual(`<title>data</title>`);
  expect(tag('title', ['da', 'ta'])).toEqual(`<title>data</title>`);
});

test('with nested data', () => {
  expect(tag('div', tag('a', 'link'))).toEqual(`<div><a>link</a></div>`);
  expect(tag('div', tag('a', 'link'))).toEqual(`<div><a>link</a></div>`);
  expect(tag('div', [tag('a', 'link'), '!'])).toEqual(
    `<div><a>link</a>!</div>`
  );
  expect(tag('div', [tag('a', 'link'), tag('a', 'link2')])).toEqual(
    `<div><a>link</a><a>link2</a></div>`
  );
});

test('with both data and attrs', () => {
  expect(tag('div', { class: 'hey' }, tag('a', 'link'))).toEqual(
    `<div class="hey"><a>link</a></div>`
  );
  expect(
    tag('div', { class: 'hey' }, [tag('a', 'link'), tag('a', 'link2')])
  ).toEqual(`<div class="hey"><a>link</a><a>link2</a></div>`);
});
