var marked = require('marked');

window.addEventListener('load', function() {
  var markdownScripts = document.querySelectorAll('script[type="text/markdown"]');

  forEach(markdownScripts, function(script) {
    var markdown = script.textContent;
    markdown = markdown.replace(/^<!-- *\n/, '').replace(/ *-->$/, '');
    markdown = unindent(markdown);

    var html = marked(markdown);

    var reference = script;
    reverseForEach(parseHTML(html), function(node) {
      reference = insertElementBefore(reference, node);
    });

    removeElement(script);
  });

  function forEach(collection, fn) {
    for (var i = 0, len = collection.length; i < len; ++i) {
      fn(collection[i]);
    }
  }

  function unindent(text) {
    var lines = text.split('\n');
    var leadingSpace = lines[0].match(/^(\s*)/)[1].length;
    var unindented = lines.map(function(line) {
      return line.substring(leadingSpace);
    });

    return unindented.join('\n');
  }

  function reverseForEach(collection, fn) {
    for (var i = collection.length - 1; i >= 0; --i) {
      fn(collection[i]);
    }
  }

  function parseHTML(html) {
    var div = document.createElement('DIV');
    div.innerHTML = html;
    return div.children;
  }

  function insertElementBefore(reference, element) {
    reference.parentNode.insertBefore(element, reference);
    return element;
  }

  function removeElement(element) {
    element.parentNode.removeChild(element);
  }
});
