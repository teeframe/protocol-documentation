import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Protocool Docs - TeeFrame",
  description: "A VitePress Site",

  srcDir: 'src',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    search: {
      provider: 'local',
      options: {
        miniSearch: {
        }
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/teeframe/protocol-documentation' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Encoding', link: '/encoding' },
          { text: 'Fundamentals', link: '/fundamentals' },
        ]
      },

      {
        text: 'Packets',
        items: [
          { text: 'Connection-less Messages', link: '/packets/connection-less-messages' },
          { text: 'Control Messages', link: '/packets/control-messages' },
          { text: 'Default Packets', link: '/packets/default-packets' },
        ]
      },

      {
        text: 'Chunks',
        items: [
          { text: 'Chunk Structure', link: '/chunks/chunk-structure' },
          { text: 'System Messages', link: '/chunks/system-messages' },
          { text: 'Game Messages', link: '/chunks/game-messages' },
        ]
      },

      {
        text: 'Snaps',
        items: [
          { text: 'Snap Structure', link: '/snap/snap-structure' },
          { text: 'Snap Items', link: '/snap/snap-items' },        ]
      },

      {
        text: 'Implementation',
        items: [
          { text: 'Initial Handshake', link: '/implementation/initial-handshake' },
          { text: 'Map Download', link: '/implementation/map-download' },
          { text: 'Sending Game Context', link: '/implementation/sending-game-context' },
          { text: 'Disconnecting', link: '/implementation/disconnecting' },
        ]
      },

      { text: 'Naming Changes', link: '/others/naming-changes' },
    ],
  }
})
