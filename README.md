# Welcome Track - NEAR Education

> _Find your place in the NEAR ecosystem._

The Welcome Track is a website for introducing people to Web3 and NEAR.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Getting started

### Installation

```bash
npm install
npm run prepare
```

### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Adding documentation

When adding documentation, whether it be a single article or a whole folder (category) of articles, please follow the following guidelines:

- Use article numbering (e.g. `01-ethereum.md`) in filenames and folder names to maintain ordering in the sidebar.
- Use [kebab case](https://www.theserverside.com/definition/Kebab-case) (e.g. lowercase separated by hyphens) filenames and folder names to maintain consistency in URL generation.
- Use the `title` metadata field to set the title of the article for the sidebar and heading of the article. Try to keep it the same as the name of the file but with the actual casing and separators.
- Use the `label` metadata field in the `_category_.json` file of the folder (category) to set the title of the category in the sidebar.

## Editing footer links

When editing footer links, please edit the `src/config/footerLinks.ts` file.
You will see a variable with the name of `FOOTER_LINKS` which holds the links.
Each persona has a different array of columns and links within those columns.

**IMPORTANT**: Make sure that the persona name matches the name of the directory where the persona documentation is located at (e.g. for `developers` write `developers`, don't use abbreviations in this config if they are not used in the file name, like using `devs`).
