import { div } from '../src/htmlTags.js';

test('simple', () => {
  expect(div()).toEqual(`<div></div>`);
  expect(div({ class: 'a' })).toEqual(`<div class="a"></div>`);
  expect(div(div())).toEqual(`<div><div></div></div>`);
  expect(div([div(), div()])).toEqual(`<div><div></div><div></div></div>`);
  expect(div({ class: 'a' }, div())).toEqual(
    `<div class="a"><div></div></div>`
  );
  expect(div({ class: 'a' }, [div(), div()])).toEqual(
    `<div class="a"><div></div><div></div></div>`
  );
});
