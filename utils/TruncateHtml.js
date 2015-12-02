module.exports = function(input, length) {
  if ( input ) {
    length = length || 20;
    input = input.replace(/<(li|dt)([^>]*)>/gi, " ");
    input = input.replace(/<(br|p|div|ol|ul)([^>]*)>/gi, "\n");
    input = input.replace(/<(?:.|\s)*?>/g, "");
    input = input.substr(0, length).replace(/\n+/g,"<br />").replace(/^<br \/>/i, '');
    return input + '...';
  }
}
