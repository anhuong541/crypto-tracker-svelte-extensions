# Crypto Tracker Chrome Extension

A Chrome extension built with SvelteKit for tracking cryptocurrency prices in real-time using the CoinMarketCap API.

![Crypto Tracker](static/icons/coinmarketcap_icon_128.png)

## Features

- Automatically updates data every time you open the extension
- Powered by the CoinMarketCap API for accurate market data
- Built with Svelte for high performance

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- A modern web browser (Chrome recommended for extension testing)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/anhuong541/crypto-tracker-svelte-extensions.git
cd crypto-tracker-svelte-extension
```

2. Install dependencies:
```bash
bun install
```

3. Build the extension:
```bash
bun run build
```

This will generate a `build` directory containing the extension files.

### Development

To start development with hot-reloading:

```bash
bun run dev
```

To build and watch for changes:

```bash
bun run build:watch
```

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer Mode" by toggling the switch in the top-right corner
3. Click "Load unpacked" and select the `build` directory from this project
4. The extension should now appear in your Chrome toolbar

## Project Structure

- `src/` - SvelteKit source code
  - `routes/` - Page components and API routes
  - `lib/` - Reusable components and utilities
- `static/` - Static assets including extension manifest and icons
- `build/` - Generated extension bundle (after building)

## Technology Stack

- [SvelteKit](https://kit.svelte.dev/) - Frontend framework
- [sveltekit-adapter-chrome-extension](https://github.com/michmich112/sveltekit-adapter-chrome-extension) - SvelteKit adapter for Chrome extensions
- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Building for Production

```bash
bun run build
```

The production-ready extension will be in the `build` directory.

## License

This project is licensed under the terms of the license included in the repository.

## Author

Huong Nguyen - https://github.com/anhuong541
