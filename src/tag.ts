export type TagElement = string;
export type TagElements = string;
export type TagData =
  | TagElement
  | TagElements
  | string
  | (TagElement | TagElements)[];
export type TagAttrs = Record<string, string | number | boolean>;

function isTagAttrs(v: TagAttrs | TagData): v is TagAttrs {
  return typeof v === 'object' && !Array.isArray(v);
}

interface Selector {
  tag: string;
  id: string | undefined;
  classes: string[] | undefined;
}

// prettier-ignore
export type Tag =  "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "head" | "header" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr"

const voidElements = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

function renderTagAttrs(a: TagAttrs): string {
  const attrs = [];
  for (const key in a) {
    const value = a[key];
    if (typeof value === 'boolean') {
      if (value) attrs.push(key);
    } else {
      attrs.push(`${key}="${value}"`);
    }
  }
  attrs.sort();
  return attrs.length ? ' ' + attrs.join(' ') : '';
}

const selectorSeparatorR = /(?=[\.#])/g;
function parseSelector(sel: string): Selector {
  const split = sel.split(selectorSeparatorR),
    tag = split.shift()!,
    id = split.find(s => s.startsWith('#')),
    classes = split.filter(s => s.startsWith('.'));
  return {
    tag,
    id: id && id.substring(1),
    classes: classes.length ? classes.map(cls => cls.substring(1)) : undefined,
  };
}

export function tag(sel: Tag): TagElement;
export function tag(sel: string): TagElement;
export function tag(sel: Tag, data: TagData): TagElement;
export function tag(sel: string, data: TagData): TagElement;
export function tag(sel: Tag, attrs: TagAttrs): TagElement;
export function tag(sel: string, attrs: TagAttrs): TagElement;
export function tag(sel: Tag, attrs: TagAttrs, data: TagData): TagElement;
export function tag(sel: string, attrs: TagAttrs, data: TagData): TagElement;

export function tag(
  sel: string,
  a?: TagAttrs | TagData,
  b?: TagData
): TagElement {
  const selector = parseSelector(sel),
    attrs = a !== undefined && isTagAttrs(a) ? a : {},
    data = b !== undefined ? b : a !== undefined && !isTagAttrs(a) ? a : [];

  if (selector.classes) {
    if (attrs['class'])
      attrs['class'] = [attrs['class'], ...selector.classes].join(' ');
    else attrs['class'] = selector.classes.join(' ');
  }
  if (selector.id && !attrs['id']) attrs['id'] = selector.id;

  if (voidElements.includes(selector.tag)) {
    return `<${selector.tag}${renderTagAttrs(attrs)} />`;
  } else {
    const dataStr = Array.isArray(data) ? data.join('') : data;
    return `<${selector.tag}${renderTagAttrs(attrs)}>${dataStr}</${
      selector.tag
    }>`;
  }
}

export function frag(tags: TagElement[]): TagElements {
  return tags.join('');
}
