import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Robo Ai Text Book Engine',
  tagline: 'The Future of Robotics Learning',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://robo-text-book.vercel.app',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Maheenghouri',
  projectName: 'Robo-Ai-Text-Book-Engine',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Maheenghouri/Robo-Ai-Text-Book-Engine/tree/main/frontend/',
        },
        blog: false, // Disable blog for now as it's not in spec
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Robo Text Book',
      logo: {
        alt: 'Robo Ai Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Textbook',
        },
        { to: '/dashboard', label: 'Dashboard', position: 'left' },
        {
          href: 'https://github.com/Maheenghouri/Robo-Ai-Text-Book-Engine',
          label: 'GitHub',
          position: 'right',
        },
        { to: '/login', label: 'Login', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Textbook',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Maheenghouri/Robo-Ai-Text-Book-Engine',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Robo Ai Text Book Engine. Built by Autonomous Codex.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
