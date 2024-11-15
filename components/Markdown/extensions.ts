import type MarkdownIt from 'markdown-it';

export function targetBlankExtension(md: MarkdownIt) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']);
    } else {
      tokens[idx].attrs![aIndex][1] = '_blank';
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}

export function italicExtension(md: MarkdownIt) {
  md.renderer.rules.em_open = function (tokens, idx, options, env, self) {
    if (tokens[idx].type === 'em_open') {
      tokens[idx].tag = 'i';
    }
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.em_close = function (tokens, idx, options, env, self) {
    if (tokens[idx].type === 'em_close') {
      tokens[idx].tag = 'i';
    }
    return self.renderToken(tokens, idx, options);
  };
}
