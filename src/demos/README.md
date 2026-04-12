# Demo Simulations

Drop a `.json` file into `basic/` or `advanced/` to add a new demo. It will appear in the simulation picker automatically — no code changes needed.

## JSON format

The file must be a valid `Simulation` object with at minimum:

- `id` (string) — unique identifier
- `title` (string) — displayed as the label in the picker
- `productType` (`"claude-code"` | `"claude-chat"` | `"claude-cowork"`) — determines which view to use
- `events` (array) — the sequence of events to play back

The easiest way to create a valid file is to build a simulation in the app editor and use **Export JSON**.

## Folder convention

- `basic/` — Simple, short demos (one or two turns)
- `advanced/` — Longer, more complex demos
