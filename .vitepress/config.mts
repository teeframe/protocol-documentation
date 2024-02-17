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
          { text: 'Control Messages', link: '/packets/control-messages' },
          { text: 'Connection-less Messages', link: '/packets/connection-less-messages' },
          { text: 'Default Packets', link: '/packets/default-packets' },
        ]
      },

      {
        text: 'Chunks',
        items: [
          { text: 'Chunk Structure', link: '/chunks/chunk-structure' },
          { text: 'System Messages', link: '/encoding' },
          { text: 'Game Messages', link: '/fundamentals' },
        ]
      },

      {
        text: 'Snapshots',
        items: [
          { text: 'Snap Structure', link: '/fsdfsd' },
          { text: 'Object Items', link: '/encoding' },
          { text: 'Event Items', link: '/fundamentals' },
        ]
      },

      {
        text: 'Implementation',
        items: [
          { text: 'Initial Handshake', link: '/initial-handshake' },
          { text: 'Map Download', link: '/map-download' },
          { text: 'Sending Game Context', link: '/map-download' },
          { text: 'Disconnecting', link: '/disconnecting' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
