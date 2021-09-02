import type { LanguageFn } from 'highlight.js';

const regexp: LanguageFn = (api) => {
  return {
    case_insensitive: false,
    contains: [
      {
        scope: 'operator',
        match: /[+*]\??|\?|\|/,
      },
      {
        scope: 'regexp',
        match: /\\[bBsSwWdD]/,
      },
      {
        scope: 'regexp',
        match: /\\\d+/,
      },
      {
        scope: 'regexp',
        begin: /\\k</,
        end: />/,
        contains: [
          {
            scope: 'title',
            match: /[^>]/,
          },
        ],
      },
      {
        scope: 'keyword',
        begin: /{/,
        end: /}/,
        contains: [
          {
            scope: 'number',
            match: /[0-9]+/,
          },
        ],
      },
      {
        scope: 'keyword',
        match: /\(\?\:|\)|\$|\^/,
      },
      {
        scope: 'keyword',
        match: /\(/,
        contains: [
          {
            scope: 'attribute',
            begin: /\?</,
            end: />/,
            contains: [
              {
                scope: 'title',
                match: /[^>]+/,
              },
            ],
          },
          {
            scope: 'attribute',
            match: /\?(?:=|!|<=|<!)/,
          },
        ],
      },
      {
        scope: 'keyword',
        begin: /\[\^?/,
        end: /\]/,
        contains: [
          {
            scope: 'literal',
            match: /\\[\]nr]/,
          },
          {
            scope: 'literal',
            match: /[^\]]/,
          },
        ],
      },
    ],
  };
};

export default regexp;
