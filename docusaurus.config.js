// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const mouseflowProjectId = '9acc4ace-c756-4350-8643-6804551eabe0'; // https://us.mouseflow.com/websites/9acc4ace-c756-4350-8643-6804551eabe0/dashboards/1d1091d4-e671-4a0b-932c-2dfb4b9f0dd5

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NEAR Welcome Track',
  tagline:
    'The NEAR Welcome Track is a guide for developers and entrepreneurs to get started in Web3 with NEAR',
  url: 'https://near.university',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/near-favicon.png',
  organizationName: 'NEAR-Edu', // Usually your GitHub org/user name.
  projectName: 'welcome-track', // Usually your repo name.
  scripts: [
    // https://docusaurus.io/docs/api/docusaurus-config#scripts
    '//use.fontawesome.com/releases/v5.15.4/js/all.js',
    {
      src: `//cdn.mouseflow.com/projects/${mouseflowProjectId}.js`,
      defer: true,
    },
  ],
  stylesheets: [
    '//fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&display=swap',
    '//cdn.statically.io/gh/nearprotocol/near-global-footer/acdefee/footer.css',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root. https://docusaurus.io/docs/docs-introduction/#docs-only-mode and https://ricard.dev/how-to-set-docs-as-homepage-for-docusaurus/
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/NEAR-Edu/welcome-track/tree/main/',
          sidebarCollapsed: false, // https://docusaurus.io/docs/sidebar/items#expanded-categories-by-default
          sidebarCollapsible: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'NEAR University',
          src: 'img/nu_logo.svg',
          srcDark: 'img/nu_logo_white.svg',
          href: 'https://www.near.university/',
        },
        items: [
          {
            type: 'doc',
            docId: 'Developers/intro',
            position: 'left',
            label: 'NEAR for React devs',
          },
          {
            type: 'doc',
            docId: 'Entrepreneurs/intro',
            position: 'left',
            label: 'NEAR for entrepreneurs',
          },
          /*{
            to: '/blog', 
            label: 'Blog', 
            position: 'left'
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Explore',
            items: [
              {
                label: 'NEAR Official Documentation',
                href: 'https://docs.near.org/',
              },
              {
                label: 'NEAR Official Wiki',
                href: 'https://wiki.near.org/',
              },
              {
                label: 'NEAR Protocol Specification',
                href: 'https://nomicon.io/',
              },
              {
                label: 'Code Examples',
                href: 'https://examples.near.org/',
              },
              {
                label: 'Explore NEAR Protocol APIs',
                href: 'http://bit.ly/near-apis',
              },
            ],
          },
          {
            title: 'Learn',
            items: [
              {
                label: 'NEAR Certified Developer Course',
                href: 'https://www.near.university/courses/near-certified-developer',
              },
              {
                label: 'NEAR Academy',
                href: 'https://near.academy/',
              },
              {
                label: 'NEAR for Senior Developers',
                href: 'https://hackmd.io/@nearly-learning/near-201',
              },
              {
                label: 'NEAR 101',
                href: 'http://bit.ly/near-101',
              },
              {
                label: 'NEAR 102',
                href: 'http://bit.ly/near-102',
              },
              {
                label: 'Write your first smart contract',
                href: 'https://github.com/near-examples/workshop--exploring-assemblyscript-contracts/tree/master/assembly/A.sample-projects/01.greeting',
              },
            ],
          },
          {
            title: 'Stay connected',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/k4pxafjMWA',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/NEARedu',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/near.university/?hl=en',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/NEARProtocol',
              },
              {
                label: 'NEAR Education Official Website',
                href: 'https://www.near.university/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NEAR University is the project of NEAR Education`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['rust'],
      },
    }),
};

module.exports = config;
