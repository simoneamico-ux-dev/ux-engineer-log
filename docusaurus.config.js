import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'UX Engineer Log',
  tagline: 'From Factory to UX Engineer',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://simoneamico.com',
  baseUrl: '/',

  organizationName: 'simoneamico-ux-dev',
  projectName: 'ux-engineer-log',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      it: {
        label: 'Italiano',
        htmlLang: 'it-IT',
      },
    },
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "it"],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/manifest.json',
      },
    },
  ],

  themeConfig:
    ({
      metadata: [
        {name: 'google-site-verification', content: 'khP1TnDxkMdfEdD8JWm5WFb1xjcSzQfep0Xvgd5cRjA'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'},
      ],
      image: 'img/social-card.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'UX Engineer Log',
        items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Navigation',
            items: [
              {
                label: 'Featured',
                to: '/docs/featured/center',
              },
              {
                label: 'Path',
                to: '/docs/path/html-css/cat-photo-app',
              },
              {
                label: 'Vademecum',
                to: '/docs/vademecum/html-real-world-vademecum',
              },
              {
                label: 'Bookshelf',
                to: '/docs/bookshelf/the-design-of-everyday-things',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'Source Code',
                href: 'https://github.com/simoneamico-ux-dev/ux-engineer-log',
              },
              {
                label: 'Origin Story',
                href: 'https://github.com/simoneamico-ux-dev/from-factory-to-ux-engineer',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/simone-amico-ux-engineer/',
              },
              {
                label: 'Email',
                href: 'mailto:simone.amico1103@gmail.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Simone Amico.<br />Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;