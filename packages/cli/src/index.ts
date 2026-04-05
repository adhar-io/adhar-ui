/**
 * @adhar-ui/cli
 *
 * CLI tool for the Adhar UI design system.
 * Mirrors shadcn CLI pattern: components are copied to your project,
 * not installed from npm. You own the code.
 *
 * Usage:
 *   deno run -A jsr:@adhar-ui/cli <command> [options]
 *
 * Commands:
 *   init                        Initialize project for Adhar UI
 *   add <component...>          Add component(s) to your project
 *   add --all                   Add all components
 *   list                        List all available components
 *   list --category=<cat>       Filter by category
 *   list --tier=<1|2|3>         Filter by tier
 *   diff [component...]         Show diff between local and registry
 *   theme                       List available themes
 *   theme <preset>              Apply a theme preset
 *   theme create <name>         Create a custom theme
 *   doctor                      Validate project setup
 */

import { initCommand } from './commands/init.ts';
import { addCommand } from './commands/add.ts';
import { listCommand } from './commands/list.ts';
import { themeCommand } from './commands/theme.ts';
import { doctorCommand } from './commands/doctor.ts';
import { diffCommand } from './commands/diff.ts';
import { designSyncCommand } from './commands/design-sync.ts';
import { designExportCommand } from './commands/design-export.ts';
import { designGenerateCommand } from './commands/design-generate.ts';

const VERSION = '0.1.0';

function printHelp(): void {
  console.log(`
\x1b[1madhar-ui\x1b[0m v${VERSION}
Framework-agnostic design system CLI

\x1b[1mUSAGE\x1b[0m
  adhar-ui <command> [options]

\x1b[1mCOMMANDS\x1b[0m
  init                        Initialize Adhar UI in your project
  add <component...>          Add component(s) to your project
  add --all                   Add all available components
  list                        List all available components
  diff [component...]         Compare local components with registry
  theme [preset]              List or apply theme presets
  theme create <name>         Scaffold a custom theme file
  doctor                      Validate your project setup
  design-sync pull            Pull tokens from Figma/Penpot
  design-sync push            Push tokens to Figma/Penpot
  design-sync status          Show sync state
  design-export dtcg          Export tokens as W3C DTCG JSON
  design-generate             Generate design kit (SVG + Penpot manifest)

\x1b[1mOPTIONS\x1b[0m
  --force                     Overwrite existing files
  --cwd <path>                Set working directory (default: .)
  --help, -h                  Show this help message
  --version, -v               Show version

\x1b[1mEXAMPLES\x1b[0m
  adhar-ui init
  adhar-ui add button card dialog
  adhar-ui add data-table chat code-block
  adhar-ui list --category=ai
  adhar-ui theme blue
  adhar-ui doctor
`);
}

async function main(): Promise<void> {
  const args = Deno.args;
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`adhar-ui v${VERSION}`);
    return;
  }

  // Parse --cwd flag
  let cwd = Deno.cwd();
  const cwdIdx = args.indexOf('--cwd');
  if (cwdIdx !== -1 && args[cwdIdx + 1]) {
    cwd = args[cwdIdx + 1];
    if (!cwd.startsWith('/')) {
      cwd = `${Deno.cwd()}/${cwd}`;
    }
  }

  const command = args[0];
  const restArgs = args.slice(1).filter((a) => !a.startsWith('--cwd') && a !== args[cwdIdx + 1]);
  const flags = {
    force: args.includes('--force'),
    all: args.includes('--all'),
    overwrite: args.includes('--overwrite') || args.includes('--force'),
    json: args.includes('--json'),
    defaults: args.includes('--defaults') || args.includes('-y'),
    category: args.find((a) => a.startsWith('--category='))?.split('=')[1],
    tier: args.find((a) => a.startsWith('--tier='))?.split('=')[1],
  };
  const positionalArgs = restArgs.filter((a) => !a.startsWith('--'));

  switch (command) {
    case 'init':
      await initCommand(cwd, { force: flags.force, defaults: flags.defaults });
      break;

    case 'add':
      await addCommand(cwd, positionalArgs, { overwrite: flags.overwrite, all: flags.all });
      break;

    case 'list':
    case 'ls':
      await listCommand(cwd, { category: flags.category, tier: flags.tier, json: flags.json });
      break;

    case 'diff':
      await diffCommand(cwd, positionalArgs);
      break;

    case 'theme':
      await themeCommand(cwd, positionalArgs);
      break;

    case 'doctor':
    case 'check':
      await doctorCommand(cwd);
      break;

    case 'design-sync':
      await designSyncCommand(cwd, positionalArgs);
      break;

    case 'design-export':
      await designExportCommand(cwd, positionalArgs);
      break;

    case 'design-generate':
      await designGenerateCommand(cwd, positionalArgs);
      break;

    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      Deno.exit(1);
  }
}

main().catch((err) => {
  console.error(`\x1b[31mError:\x1b[0m ${err.message}`);
  Deno.exit(1);
});
