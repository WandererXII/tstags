#!/usr/bin/env node
const { writeFile } = require('fs/promises');

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
// tag, description, void
const html5tags = [
  [
    'a',
    "The 'a' HTML element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.",
    false,
  ],
  [
    'abbr',
    "The 'abbr' HTML element represents an abbreviation or acronym.",
    false,
  ],
  [
    'address',
    "The 'address' HTML element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.",
    false,
  ],
  [
    'area',
    "The 'area' HTML element defines an area inside an image map that has predefined clickable areas. An image map allows geometric areas on an image to be associated with Hyperlink.",
    true,
  ],
  [
    'article',
    "The 'article' HTML element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.",
    false,
  ],
  [
    'aside',
    "The 'aside' HTML element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.",
    false,
  ],
  [
    'audio',
    "The 'audio' HTML element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the source element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.",
    false,
  ],
  [
    'b',
    "The 'b' HTML element is used to draw the reader's attention to the element's contents, which are not otherwise granted special importance. This was formerly known as the Boldface element, and most browsers still draw the text in boldface. However, you should not use 'b' for styling text; instead, you should use the CSS font-weight property to create boldface text, or the strong element to indicate that text is of special importance.",
    false,
  ],
  [
    'base',
    "The 'base' HTML element specifies the base URL to use for all relative URLs in a document. There can be only one 'base' element in a document.",
    true,
  ],
  [
    'bdi',
    "The 'bdi' HTML element tells the browser's bidirectional algorithm to treat the text it contains in isolation from its surrounding text. It's particularly useful when a website dynamically inserts some text and doesn't know the directionality of the text being inserted.",
    false,
  ],
  [
    'bdo',
    "The 'bdo' HTML element overrides the current directionality of text, so that the text within is rendered in a different direction.",
    false,
  ],
  [
    'blockquote',
    "The 'blockquote' HTML element indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the cite element.",
    false,
  ],
  [
    'body',
    "The 'body' HTML element represents the content of an HTML document. There can be only one 'body' element in a document.",
    false,
  ],
  [
    'br',
    "The 'br' HTML element produces a line break in text (carriage-return). It is useful for writing a poem or an address, where the division of lines is significant.",
    true,
  ],
  [
    'button',
    "The 'button' HTML element is an interactive element activated by a user with a mouse, keyboard, finger, voice command, or other assistive technology. Once activated, it then performs a programmable action, such as submitting a form or opening a dialog.",
    false,
  ],
  [
    'canvas',
    "	Use the HTML 'canvas' element with either the canvas scripting API or the WebGL API to draw graphics and animations.",
    false,
  ],
  [
    'caption',
    "The 'caption' HTML element specifies the caption (or title) of a table.",
    false,
  ],
  [
    'cite',
    "The 'cite' HTML element is used to describe a reference to a cited creative work, and must include the title of that work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.",
    false,
  ],
  [
    'code',
    "The 'code' HTML element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent default monospace font.",
    false,
  ],
  [
    'col',
    "The 'col' HTML element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a colgroup element.",
    true,
  ],
  [
    'colgroup',
    "The 'colgroup' HTML element defines a group of columns within a table.",
    false,
  ],
  [
    'data',
    "The 'data' HTML element links a given piece of content with a machine-readable translation. If the content is time- or date-related, the time element must be used.",
    false,
  ],
  [
    'datalist',
    "The 'datalist' HTML element contains a set of option elements that represent the permissible or recommended options available to choose from within other controls.",
    false,
  ],
  [
    'dd',
    "The 'dd' HTML element provides the description, definition, or value for the preceding term (dt) in a description list (dl).",
    false,
  ],
  [
    'del',
    `The 'del' HTML element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The ins element can be used for the opposite purpose: to indicate text that has been added to the document.`,
    false,
  ],
  [
    'details',
    `The 'details' HTML element creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label must be provided using the summary element.`,
    false,
  ],
  [
    'dfn',
    "The 'dfn' HTML element is used to indicate the term being defined within the context of a definition phrase or sentence. The p element, the dt/dd pairing, or the section element which is the nearest ancestor of the 'dfn' is considered to be the definition of the term.",
    false,
  ],
  [
    'dialog',
    "The 'dialog' HTML element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.",
    false,
  ],
  [
    'div',
    "The 'div' HTML element is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g. styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).",
    false,
  ],
  [
    'dl',
    "The 'dl' HTML element represents a description list. The element encloses a list of groups of terms (specified using the dt element) and descriptions (provided by dd elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).",
    false,
  ],
  [
    'dt',
    "The 'dt' HTML element specifies a term in a description or definition list, and as such must be used inside a dl element. It is usually followed by a dd element; however, multiple 'dt' elements in a row indicate several terms that are all defined by the immediate next dd element.",
    false,
  ],
  [
    'em',
    "The 'em' HTML element marks text that has stress emphasis. The 'em' element can be nested, with each level of nesting indicating a greater degree of emphasis.",
    false,
  ],
  [
    'embed',
    "The 'embed' HTML element embeds external content at the specified point in the document. This content is provided by an external application or other source of interactive content such as a browser plug-in.",
    true,
  ],
  [
    'fieldset',
    "The 'fieldset' HTML element is used to group several controls as well as labels (label) within a web form.",
    false,
  ],
  [
    'figcaption',
    "The 'figcaption' HTML element represents a caption or legend describing the rest of the contents of its parent figure element.",
    false,
  ],
  [
    'figure',
    "The 'figure' HTML element represents self-contained content, potentially with an optional caption, which is specified using the figcaption element. The figure, its caption, and its contents are referenced as a single unit.",
    false,
  ],
  [
    'footer',
    "	The 'footer' HTML element represents a footer for its nearest ancestor sectioning content or sectioning root element. A 'footer' typically contains information about the author of the section, copyright data or links to related documents.",
    false,
  ],
  [
    'form',
    "	The 'form' HTML element represents a document section containing interactive controls for submitting information.",
    false,
  ],
  [
    'h1',
    "The 'h1' to 'h6' HTML elements represent six levels of section headings. 'h1' is the highest section level and 'h6' is the lowest.",
    false,
  ],
  [
    'h2',
    "The 'h1' to 'h6' HTML elements represent six levels of section headings. 'h1' is the highest section level and 'h6' is the lowest.",
    false,
  ],
  [
    'h3',
    "The 'h1' to 'h6' HTML elements represent six levels of section headings. 'h1' is the highest section level and 'h6' is the lowest.",
    false,
  ],
  [
    'h4',
    "The 'h1' to 'h6' HTML elements represent six levels of section headings. 'h1' is the highest section level and 'h6' is the lowest.",
    false,
  ],
  [
    'h5',
    "The 'h1' to 'h6' HTML elements represent six levels of section headings. 'h1' is the highest section level and 'h6' is the lowest.",
    false,
  ],
  [
    'h6',
    "The 'h1' to 'h6' HTML elements represent six levels of section headings. 'h1' is the highest section level and 'h6' is the lowest.",
    false,
  ],
  [
    'head',
    "The 'head' HTML element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.",
    false,
  ],
  [
    'header',
    "The 'header' HTML element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.",
    false,
  ],
  [
    'hgroup',
    "The 'hgroup' HTML element represents a heading and related content. It groups a single 'h1–h6' element with one or more 'p'.",
    false,
  ],
  [
    'hr',
    "The 'hr' HTML element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.",
    true,
  ],
  [
    'html',
    "The 'html' HTML element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.",
    false,
  ],
  [
    'i',
    "The 'i' HTML element represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others. Historically, these have been presented using italicized type, which is the original source of the 'i' naming of this element.",
    false,
  ],
  [
    'iframe',
    "The 'iframe' HTML element represents a nested browsing context, embedding another HTML page into the current one.",
    false,
  ],
  ['img', "The 'img' HTML element embeds an image into the document.", true],
  [
    'input',
    "The 'input' HTML element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent. The 'input' element is one of the most powerful and complex in all of HTML due to the sheer number of combinations of input types and attributes.",
    true,
  ],
  [
    'ins',
    "The 'ins' HTML element represents a range of text that has been added to a document. You can use the del element to similarly represent a range of text that has been deleted from the document.",
    false,
  ],
  [
    'kbd',
    "The 'kbd' HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a 'kbd' element using its default monospace font, although this is not mandated by the HTML standard.",
    false,
  ],
  [
    'label',
    "The 'label' HTML element represents a caption for an item in a user interface.",
    false,
  ],
  [
    'legend',
    "The 'legend' HTML element represents a caption for the content of its parent fieldset.",
    false,
  ],
  [
    'li',
    "The 'li' HTML element is used to represent an item in a list. It must be contained in a parent element: an ordered list (ol), an unordered list (ul), or a menu (menu). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.",
    false,
  ],
  [
    'link',
    `The 'link' HTML element specifies relationships between the current document and an external resource. This element is most commonly used to link to CSS, but is also used to establish site icons (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.`,
    true,
  ],
  [
    'main',
    "The 'main' HTML element represents the dominant content of the body of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.",
    false,
  ],
  [
    'map',
    "The 'map' HTML element is used with area elements to define an image map (a clickable link area).",
    false,
  ],
  [
    'mark',
    "The 'mark' HTML element represents text which is marked or highlighted for reference or notation purposes due to the marked passage's relevance in the enclosing context.",
    false,
  ],
  [
    'math',
    "The top-level element in MathML is 'math'. Every valid MathML instance must be wrapped in 'math' tags. In addition you must not nest a second 'math' element in another, but you can have an arbitrary number of other child elements in it.",
    false,
  ],
  [
    'menu',
    "The 'menu' HTML element is described in the HTML specification as a semantic alternative to ul, but treated by browsers (and exposed through the accessibility tree) as no different than ul. It represents an unordered list of items (which are represented by li elements).",
    false,
  ],
  [
    'meta',
    "The 'meta' HTML element represents Metadata that cannot be represented by other HTML meta-related elements, like base, link, script, style or title.",
    true,
  ],
  [
    'meter',
    "The 'meter' HTML element represents either a scalar value within a known range or a fractional value.",
    false,
  ],
  [
    'nav',
    "The 'nav' HTML element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.",
    false,
  ],
  [
    'noscript',
    "The 'noscript' HTML element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.",
    false,
  ],
  [
    '_object',
    "The 'object' HTML element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.",
    false,
  ],
  [
    'ol',
    "The 'ol' HTML element represents an ordered list of items — typically rendered as a numbered list.",
    false,
  ],
  [
    'optgroup',
    "The 'optgroup' HTML element creates a grouping of options within a select element.",
    false,
  ],
  [
    'option',
    "The 'option' HTML element is used to define an item contained in a select, an optgroup, or a datalist element. As such, 'option' can represent menu items in popups and other lists of items in an HTML document.",
    false,
  ],
  [
    'output',
    "The 'output' HTML element is a container element into which a site or app can inject the results of a calculation or the outcome of a user action.",
    false,
  ],
  [
    'p',
    "The 'p' HTML element represents a paragraph. Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation, but HTML paragraphs can be any structural grouping of related content, such as images or form fields.",
    false,
  ],
  [
    'param',
    "The 'param' HTML element defines parameters for an object element.",
    true,
  ],
  [
    'picture',
    "The 'picture' HTML element contains zero or more source elements and one img element to offer alternative versions of an image for different display/device scenarios.",
    false,
  ],
  [
    'pre',
    "The 'pre' HTML element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional, or monospaced, font. Whitespace inside this element is displayed as written.",
    false,
  ],
  [
    'progress',
    "The 'progress' HTML element displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    false,
  ],
  [
    'q',
    "The 'q' HTML element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the blockquote element.",
    false,
  ],
  [
    'rb',
    "The 'rb' HTML element is used to delimit the base text component of a ruby annotation, i.e. the text that is being annotated. One 'rb' element should wrap each separate atomic segment of the base text.",
    false,
  ],
  [
    'rp',
    "The 'rp' HTML element is used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the ruby element. One 'rp' element should enclose each of the opening and closing parentheses that wrap the rt element that contains the annotation's text.",
    false,
  ],
  [
    'rt',
    "The 'rt' HTML element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The 'rt' element must always be contained within a ruby element.",
    false,
  ],
  [
    'rtc',
    "The 'rtc' HTML element embraces semantic annotations of characters presented in a ruby of rb elements used inside of ruby element. rb elements can have both pronunciation (rt) and semantic (rtc) annotations.",
    false,
  ],
  [
    'ruby',
    "	The 'ruby' HTML element represents small annotations that are rendered above, below, or next to base text, usually used for showing the pronunciation of East Asian characters. It can also be used for annotating other kinds of text, but this usage is less common.",
    false,
  ],
  [
    's',
    "The 's' HTML element renders text with a strikethrough, or a line through it. Use the 's' element to represent things that are no longer relevant or no longer accurate. However, 's' is not appropriate when indicating document edits; for that, use the del and ins elements, as appropriate.",
    false,
  ],
  [
    'samp',
    "The 'samp' HTML element is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console).",
    false,
  ],
  [
    'script',
    "The 'script' HTML element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code. The 'script' element can also be used with other languages, such as WebGL's GLSL shader programming language and JSON.",
    false,
  ],
  [
    'section',
    "The 'section' HTML element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.",
    false,
  ],
  [
    'select',
    "The 'select' HTML element represents a control that provides a menu of options.",
    false,
  ],
  [
    'slot',
    "The 'slot' HTML element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.",
    false,
  ],
  [
    'small',
    "The 'small' HTML element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small.",
    false,
  ],
  [
    'source',
    "The 'source' HTML element specifies multiple media resources for the picture, the audio element, or the video element. It is a void element, meaning that it has no content and does not have a closing tag. It is commonly used to offer the same media content in multiple file formats in order to provide compatibility with a broad range of browsers given their differing support for image file formats and media file formats.",
    true,
  ],
  [
    'span',
    "The 'span' HTML element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. 'span' is very much like a div element, but div is a block-level element whereas a 'span' is an inline element.",
    false,
  ],
  [
    'strong',
    "The 'strong' HTML element indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.",
    false,
  ],
  [
    'style',
    "The 'style' HTML element contains style information for a document, or part of a document. It contains CSS, which is applied to the contents of the document containing the 'style' element.",
    false,
  ],
  [
    'sub',
    "The 'sub' HTML element specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text.",
    false,
  ],
  [
    'summary',
    "The 'summary' HTML element specifies a summary, caption, or legend for a details element's disclosure box. Clicking the 'summary' element toggles the state of the parent 'details' element open and closed.",
    false,
  ],
  [
    'sup',
    "The 'sup' HTML element specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text.",
    false,
  ],
  [
    'svg',
    'The svg element is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document.',
    false,
  ],
  [
    'table',
    "The 'table' HTML element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.",
    false,
  ],
  [
    'tbody',
    "The 'tbody' HTML element encapsulates a set of table rows (tr elements), indicating that they comprise the body of the table (table).",
    false,
  ],
  [
    'td',
    "The 'td' HTML element defines a cell of a table that contains data. It participates in the table model.",
    false,
  ],
  [
    'template',
    "The 'template' HTML element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.",
    false,
  ],
  [
    'textarea',
    "The 'textarea' HTML element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.",
    false,
  ],
  [
    'tfoot',
    "The 'tfoot' HTML element defines a set of rows summarizing the columns of the table.",
    false,
  ],
  [
    'th',
    "The 'th' HTML element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.",
    false,
  ],
  [
    'thead',
    "The 'thead' HTML element defines a set of rows defining the head of the columns of the table.",
    false,
  ],
  [
    'time',
    "The 'time' HTML element represents a specific period in time. It may include the datetime attribute to translate dates into machine-readable format, allowing for better search engine results or custom features such as reminders.",
    false,
  ],
  [
    'title',
    "The 'title' HTML element defines the document's title that is shown in a Browser's title bar or a page's tab. It only contains text; tags within the element are ignored.",
    false,
  ],
  [
    'tr',
    "	The 'tr' HTML element defines a row of cells in a table. The row's cells can then be established using a mix of td (data cell) and th (header cell) elements.",
    false,
  ],
  [
    'track',
    "The 'track' HTML element is used as a child of the media elements, audio and video. It lets you specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks.",
    true,
  ],
  [
    'u',
    "The 'u' HTML element represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation. This is rendered by default as a simple solid underline, but may be altered using CSS.",
    false,
  ],
  [
    'ul',
    "The 'ul' HTML element represents an unordered list of items, typically rendered as a bulleted list.",
    false,
  ],
  [
    '_var',
    "	The 'var' HTML element represents the name of a variable in a mathematical expression or a programming context. It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent.",
    false,
  ],
  [
    'video',
    "The 'video' HTML element embeds a media player which supports video playback into the document. You can use 'video' for audio content as well, but the audio element may provide a more appropriate user experience.",
    false,
  ],
  [
    'wbr',
    "The 'wbr' HTML element represents a word break opportunity—a position within text where the browser may optionally break a line, though its line-breaking rules would not otherwise create a break at that location.",
    true,
  ],
];

let str = `// DO NOT EDIT
// This file was autogenerated from gen/html5-tags.js
import { TagAttrs, TagData, TagElement, tag } from './tag.js';

/** In HTML, the doctype is the required '<!DOCTYPE html>' preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called 'quirks mode' when rendering a document; that is, the '<!DOCTYPE html>' doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications. - MDN */
export function doctype(): string {
  return '<!DOCTYPE html>';
}
/** The Comment interface represents textual notations within markup; although it is generally not visually shown, such comments are available to be read in the source view. - MDN */
export function comment(text: string): string {
  return \`<!--\${text}-->\`;
}
`;
for (const tagList of html5tags) {
  const [tag, desc, isVoid] = tagList;
  const emptyAndAttrs = `
/** ${desc} - MDN */
export function ${tag}(): TagElement;
/** ${desc} - MDN */
export function ${tag}(attrs: TagAttrs): TagElement;`;
  const data = isVoid
    ? ''
    : `/** ${desc} - MDN */
export function ${tag}(data: TagData): TagElement;
/** ${desc} - MDN */
export function ${tag}(attrs: TagAttrs, data: TagData): TagElement;`;
  const implementation = isVoid
    ? `export function ${tag}(a?: any): TagElement {
  return tag('${tag}', a);
}`
    : `export function ${tag}(a?: any, b?: any): TagElement {
  return tag('${tag}', a, b);
}
`;
  str += [emptyAndAttrs, data, implementation].filter(s => s.length).join('\n');
}
str += '\n';

writeFile(`../src/htmlTags.ts`, str);
