# claudetoPDF

This is a Chrome extension (Manifest V3) that adds print-friendly CSS formatting to Claude.ai chat pages, allowing users to export conversations to PDF with proper layout and styling.

## To Install

Download or clone repository into a directory. Enable developer mode in chrome extensions and then click "Load Unpacked". Choose the directory where you downloaded the files. 
In your chat session click the extension and it will append an @ media print {} to the DOM object. When you print the chat will be formatted for printing to a printer or as a PDF.

## Architecture

The extension uses a minimal two-component architecture:

1. **background.js** (Service Worker): Listens for extension icon clicks and injects the `addPrintCSS()` function into the active tab
2. **content.js**: Currently unused stub file (required by manifest for scripting permissions)

The extension operates entirely through programmatic script injection rather than persistent content scripts for the main functionality.

### Key Flow

1. User clicks extension icon on a Claude.ai chat page
2. Background service worker executes `chrome.scripting.executeScript()` to inject `addPrintCSS()`
3. `addPrintCSS()` function:
   - Generates comprehensive `@media print {}` CSS rules
   - Fixes document title (extracts from `header div.min-w-0`, replaces `/` with `-`)
   - Appends style element to document head
   - Triggers browser print dialog via `window.print()`

### CSS Targeting Strategy

The print styles use Claude.ai's specific DOM structure and CSS classes:
- **User messages**: Styled via `div.flex-row:has([data-testid=user-message])`
- **Content areas**: Targeted with `div:has([data-test-render-count])`
- **Hidden elements**: UI chrome (sidebar, buttons, overlays) hidden via `display: none`
- **Code blocks**: Handled specially to preserve formatting while excluding from katex math
- **Overflow handling**: Forces `overflow: visible` and `height: auto` for full content display

## Important Notes

- The extension only activates on `https://claude.ai/chat/*` URLs (see manifest.json content_scripts matches)
- Print CSS must be maintained to match Claude.ai's evolving DOM structure and class names
- The title extraction logic assumes a specific header structure that may break with UI updates
- CSS selectors use `:has()`, `:not()`, and attribute selectors extensively for specificity

## Development

**Testing changes:**
```bash
# Load extension in Chrome
# 1. Navigate to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select this repository directory
# 5. Navigate to any Claude.ai chat and click the extension icon
```

**After making changes:**
- Go to chrome://extensions/ and click the refresh icon on the extension card
- Reload the Claude.ai page
- Test the print output

## Files of Note

- **background.js:8-111**: The `addPrintCSS()` function contains all print CSS rules
- **manifest.json:20-24**: Content script configuration (currently only loads unused content.js)
- **index.html**: Unrelated file from a different project (MIDI Joystick), not part of extension functionality
