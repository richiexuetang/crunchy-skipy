/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const { default: merge } = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const manifestTemplate = {
  name: packageJson.extensionName,
  version: packageJson.version,
  description: packageJson.description,
  options_ui: {
    page: 'options.html',
    open_in_tab: true,
  },
  host_permissions: [],
  permissions: ['storage'],
  icons: {
    16: 'icon_16.png',
    48: 'icon_48.png',
    128: 'icon_128.png',
  },
};

const apiPermissions = [
  '*://beta-api.crunchyroll.com/*',
];

const backgroundScript = 'background-script.js';

const browser = process.env.BROWSER;

module.exports = () => {
  manifestTemplate.content_scripts = [
    {
      matches: ['<all_urls>'],
      js: ['content-script.js'],
      run_at: 'document_start',
    },
    {
      matches: ['<all_urls>'],
      js: ['player-script.js'],
      all_frames: true,
      run_at: 'document_start',
    },
  ];

  if (process.env.NODE_ENV === 'development') {
    manifestTemplate.host_permissions.push('*://localhost/*');
  }

  switch (browser) {
  case 'chromium':
    return merge(manifestTemplate, {
      manifest_version: 3,
      background: {
        service_worker: backgroundScript,
      },
      action: {
        default_popup: 'popup.html',
        chrome_style: false,
      },
      host_permissions: apiPermissions,
    });
  case 'firefox':
    return merge(manifestTemplate, {
      manifest_version: 2,
      background: {
        scripts: [backgroundScript],
      },
      options_ui: {
        browser_style: false,
      },
      browser_action: {
        default_popup: 'popup.html',
        browser_style: false,
      },
      browser_specific_settings: {
        gecko: {
          id: '{c67645fa-ad86-4b2f-ab7a-67fc5f3e9f5a}',
        },
      },
      permissions: apiPermissions,
    });
  default:
    throw new Error(`Invalid browser type '${browser}'`);
  }
};
