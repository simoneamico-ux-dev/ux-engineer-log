import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'UX Engineer Log',
  tagline: 'From Zero to UX Engineer',
  favicon: 'img/favicon.ico',

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

  themeConfig:
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'UX Engineer Log',
        items: [
          {
            href: 'https://github.com/simoneamico-ux-dev/ux-engineer-log',
            label: 'GitHub',
            position: 'right',
          },
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
                to: '/docs/Featured/ux-engineer-log',
              },
              {
                label: 'Inspirational',
                to: '/docs/Inspirational/factory-legacy-app',
              },
              {
                label: 'Path',
                to: '/docs/Path/HTML-CSS/cat-photo-app',
              },
              {
                label: 'Vademecum',
                to: '/docs/Vademecum/html-real-world-vademecum',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'GitHub (Archive)',
                href: 'https://github.com/simoneamico-ux-dev/zero-to-ux-engineer-logs',
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
        copyright: `Copyright © ${new Date().getFullYear()} Simone Amico. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;