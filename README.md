# Just Use Markdown

This is a JavaScript library that dynamically scans a page for `<script type="text/markdown">`
elements, parses their contents (after stripping away HTML comment markers and un-indenting) using
[marked](https://github.com/chjj/marked), and then injects the resulting HTML into the same place
in the DOM.

I don't know whether I think this is a good idea or not; it's just an idea, and I felt like spiking
it out.
