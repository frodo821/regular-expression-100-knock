import App from './App.svelte';
import lang from './regexp';
import hljs from 'highlight.js';

hljs.registerLanguage('regexp', lang);

const app = new App({
  target: document.body,
});

export default app;
