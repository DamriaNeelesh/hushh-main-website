/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    a: "a",
    ul: "ul",
    li: "li",
    em: "em",
    strong: "strong",
    br: "br"
  }, props.components), {Image} = _components;
  if (!Image) _missingContentReference("Image", true);
  return <><_components.h2>{"JavaScript Module Bundler in Hushh Chrome Extensions"}</_components.h2>{"\n"}<_components.p>{"As of now Chrome Extensions inherently are built for the Vanilla Web Projects i.e The Pure HTML, CSS & JS builds. While working on the "}<_components.a href="https://www.linkedin.com/company/hushh-ai/">{"hushh.ai"}</_components.a>{" Chrome Extension, Me and the team wanted to take benefit of the React Library for quick and dynamic development of the frontend, however the Browser will not accept a Node Project (The Create-React-App project) directly as an extension.\nTo solve this problem I had to find a way to convert the Node Project into a Vanilla Web Project, this is exactly where Javascript Bundlers like Webpack come in handy!\nLet me share with you what I learnt while integrating a JS bundler like Webpack in chrome extension:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"JS Module bundlers are development tools that can combine large number of JS files with their dependencies into a single static JS file which is production ready."}</_components.li>{"\n"}<_components.li>{"To achieve this these bundler’s make use of a data structure called dependency graph, A dependency graph starts from an entry / source JS file provided and then tracks all the files this entry file is dependent on, so that when creating the bundled code, these dependencies are also added and linked properly."}</_components.li>{"\n"}<_components.li>{"Dependencies can include CSS, Images even Web fonts, if a JS file is dependent on another JS file, then the dependencies are tracked recursively. This also ensures that only necessary files are included in the production build"}</_components.li>{"\n"}<_components.li>{"The aim of these module bundlers is to make the bundle as small as possible, often with just 1 JS file, hence now we do not need to attach 10 different JS scripts to the website but rather just 1 bundled JS is enough"}</_components.li>{"\n"}<_components.li>{"When combining the JS files, bundlers often optimise the performance via code splitting, hot module replacement, error logging etc"}</_components.li>{"\n"}<_components.li>{"While doing dependency resolution, each file is assigned a unique id in order to resolve naming conflicts"}</_components.li>{"\n"}<_components.li>{"Dependency resolution also helps in maintaining a dependency order, i.e. in what order should which dependencies be loaded in order to avoid errors. (reminds me of topo-sort)"}</_components.li>{"\n"}<_components.li>{"Popular Bundlers: browserify, esbuild, parcel, rollup, webpack (most popular)"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Hope this introduction helps you to become a better dev, since it certainly helped me.\nPS: also attaching some great resources to learn more as always"}</_components.p>{"\n"}<_components.p><_components.em><_components.strong>{"Happy Hushh Coding"}</_components.strong></_components.em>{" 🤫"}</_components.p>{"\n"}<Image src="/blogs/team/apporv.png" width="150" height="150" alt="vectoDatabaseBrands" sizes="100vw" />{"\n"}<_components.p>{"Apoorv Bedmutha (SDE @hushh)"}</_components.p>{"\n"}<_components.p>{"References:\n"}<_components.a href="https://www.linkedin.com/posts/apoorvbedmutha_frontend-chromeextensions-webpack-activity-7181515666447818752-15jf?utm_source=share&amp;utm_medium=member_desktop">{"Link to the post"}</_components.a><_components.br />{"\n"}<_components.a href="https://lnkd.in/dgG6fPyv">{"Link-1"}</_components.a>{" "}<_components.a href="https://lnkd.in/dRgQUP3S">{"Link-1"}</_components.a>{" "}<_components.a href="https://lnkd.in/duY67hpJ">{"Link-1"}</_components.a></_components.p>{"\n"}<iframe data-source-url="https://www.linkedin.com/posts/apoorvbedmutha_frontend-chromeextensions-webpack-activity-7181515666447818752-15jf?utm_source=share&amp;utm_medium=member_desktop" src="https://www.linkedin.com/embed/feed/update/urn:li:share:7181515664489140224" height="600" width="100%" frameBorder="5" allowFullScreen={false} title="Embedded post" /></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}
function _missingContentReference(id: string, component: boolean) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

export const contentMeta = {
  "title": "Why do I need a JavaScript Module Bundler in hushh Chrome extensions 🤷🏻‍♂️",
  "description": "Get a detailed comparison of three popular JavaScript frameworks - Angular, React, and Vue.js. Understand the strengths, weaknesses, and use cases for each framework to make an informed decision for your next web development project.",
  "image": "/blogs/new/why-javascript.png",
  "publishedAt": "2022-11-12",
  "updatedAt": "2022-11-12",
  "author": "Apoorv Bedmutha",
  "isPublished": true,
  "tags": [
    "React",
    "Frontend",
    "chromeextensions"
  ]
};
export const contentHeadings = [
  {
    "text": "JavaScript Module Bundler in Hushh Chrome Extensions",
    "level": 2,
    "slug": "javascript-module-bundler-in-hushh-chrome-extensions"
  }
];
export const contentPlainText = "JavaScript Module Bundler in Hushh Chrome Extensions As of now Chrome Extensions inherently are built for the Vanilla Web Projects i.e The Pure HTML, CSS & JS builds. While working on the hushh.ai Chrome Extension, Me and the team wanted to take benefit of the React Library for quick and dynamic development of the frontend, however the Browser will not accept a Node Project (The Create React App project) directly as an extension. To solve this problem I had to find a way to convert the Node Project into a Vanilla Web Project, this is exactly where Javascript Bundlers like Webpack come in handy! Let me share with you what I learnt while integrating a JS bundler like Webpack in chrome extension: JS Module bundlers are development tools that can combine large number of JS files with their dependencies into a single static JS file which is production ready. To achieve this these bundler’s make use of a data structure called dependency graph, A dependency graph starts from an entry / source JS file provided and then tracks all the files this entry file is dependent on, so that when creating the bundled code, these dependencies are also added and linked properly. Dependencies can include CSS, Images even Web fonts, if a JS file is dependent on another JS file, then the dependencies are tracked recursively. This also ensures that only necessary files are included in the production build The aim of these module bundlers is to make the bundle as small as possible, often with just 1 JS file, hence now we do not need to attach 10 different JS scripts to the website but rather just 1 bundled JS is enough When combining the JS files, bundlers often optimise the performance via code splitting, hot module replacement, error logging etc While doing dependency resolution, each file is assigned a unique id in order to resolve naming conflicts Dependency resolution also helps in maintaining a dependency order, i.e. in what order should which dependencies be loaded in order to avoid errors. (reminds me of topo sort) Popular Bundlers: browserify, esbuild, parcel, rollup, webpack (most popular) Hope this introduction helps you to become a better dev, since it certainly helped me. PS: also attaching some great resources to learn more as always Happy Hushh Coding 🤫 Apoorv Bedmutha (SDE @hushh) References: Link to the post Link 1 Link 1 Link 1";
