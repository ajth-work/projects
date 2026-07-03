# Modern App Blueprint (Capacitor/JS)

This is a standardized template for building high-fidelity Android apps with a "Modern Google" aesthetic.

## 🏗 Core Architecture
- **8px Grid System**: All margins and paddings must use the `--space-` variables.
- **Dual-Mode Navigation**: Supports both a Floating Action Button (FAB) menu and a Contiguous Bottom Navbar, toggleable in user settings.
- **State Persistence**: Uses a `profile` object saved to `localStorage` for all user preferences and history.
- **Material Design 3**: Uses tonal surfaces, specific radii (24px/16px), and a dark-mode first palette.

## 📁 File Manifest
1. `design-system.css`: The "Source of Truth" for visual variables.
2. `app-shell.js`: Standard logic for loading/saving data and handling nav transitions.
3. `boilerplate.html`: The base structure for every page.

## 🤖 Instructions for the AI
When starting a new project with this template:
1. Inhale the `design-system.css` variables.
2. Use the `app-shell.js` state structure for features.
3. Maintain the vertical FAB list vs. the grid-based Navbar.
4. Ensure all new components follow the 8px spacing scale.
5. Prioritize "intelligence-first" UI (summary stats, trend indicators, and tonal panels).
