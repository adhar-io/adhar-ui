/**
 * `adhar-ui doctor` command.
 * Validates project setup and reports any issues.
 */

import { readConfig } from '../utils/config.ts';
import { detectFramework } from '../utils/detect-framework.ts';
import { logger } from '../utils/logger.ts';

interface CheckResult {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
}

export async function doctorCommand(cwd: string): Promise<void> {
  logger.header('Adhar UI Doctor');
  logger.dim('Checking project configuration...');
  logger.break();

  const checks: CheckResult[] = [];

  // 1. Check adhar-ui.json
  const config = await readConfig(cwd);
  if (config) {
    checks.push({
      name: 'adhar-ui.json',
      status: 'pass',
      message: `Found (framework: ${config.framework})`,
    });
  } else {
    checks.push({
      name: 'adhar-ui.json',
      status: 'fail',
      message: 'Not found. Run `adhar-ui init`',
    });
  }

  // 2. Check package.json
  try {
    await Deno.stat(`${cwd}/package.json`);
    checks.push({ name: 'package.json', status: 'pass', message: 'Found' });
  } catch {
    checks.push({ name: 'package.json', status: 'fail', message: 'Not found' });
  }

  // 3. Check framework
  const info = await detectFramework(cwd);
  if (info.framework !== 'unknown') {
    checks.push({
      name: 'Framework',
      status: 'pass',
      message: `${info.framework} (${info.metaFramework})`,
    });
  } else {
    checks.push({ name: 'Framework', status: 'warn', message: 'Could not detect framework' });
  }

  // 4. Check TypeScript
  if (info.isTypeScript) {
    checks.push({ name: 'TypeScript', status: 'pass', message: 'tsconfig.json found' });
  } else {
    checks.push({
      name: 'TypeScript',
      status: 'warn',
      message: 'No tsconfig.json (JavaScript mode)',
    });
  }

  // 5. Check Tailwind CSS
  if (info.tailwindVersion) {
    checks.push({ name: 'Tailwind CSS', status: 'pass', message: `v${info.tailwindVersion}` });
  } else {
    checks.push({ name: 'Tailwind CSS', status: 'fail', message: 'Not found in dependencies' });
  }

  // 6. Check tailwind config file
  if (config) {
    try {
      await Deno.stat(`${cwd}/${config.tailwind.config}`);
      checks.push({ name: 'Tailwind config', status: 'pass', message: config.tailwind.config });
    } catch {
      checks.push({
        name: 'Tailwind config',
        status: 'warn',
        message: `${config.tailwind.config} not found`,
      });
    }
  }

  // 7. Check CSS file
  if (config) {
    try {
      await Deno.stat(`${cwd}/${config.tailwind.css}`);
      checks.push({ name: 'Global CSS', status: 'pass', message: config.tailwind.css });
    } catch {
      checks.push({
        name: 'Global CSS',
        status: 'warn',
        message: `${config.tailwind.css} not found`,
      });
    }
  }

  // 8. Check utils file
  if (config) {
    const utilsPath = config.aliases.utils.replace('@/', 'src/').replace('~/', '');
    try {
      await Deno.stat(`${cwd}/${utilsPath}.ts`);
      checks.push({ name: 'Utils (cn)', status: 'pass', message: `${utilsPath}.ts` });
    } catch {
      try {
        await Deno.stat(`${cwd}/${utilsPath}.js`);
        checks.push({ name: 'Utils (cn)', status: 'pass', message: `${utilsPath}.js` });
      } catch {
        checks.push({ name: 'Utils (cn)', status: 'fail', message: `${utilsPath} not found` });
      }
    }
  }

  // 9. Check base dependencies
  try {
    const pkgText = await Deno.readTextFile(`${cwd}/package.json`);
    const pkg = JSON.parse(pkgText);
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const required = ['clsx', 'tailwind-merge', 'class-variance-authority'];
    const missing = required.filter((d) => !allDeps[d]);
    if (missing.length === 0) {
      checks.push({
        name: 'Base deps',
        status: 'pass',
        message: 'clsx, tailwind-merge, cva installed',
      });
    } else {
      checks.push({ name: 'Base deps', status: 'fail', message: `Missing: ${missing.join(', ')}` });
    }
  } catch {
    checks.push({ name: 'Base deps', status: 'warn', message: 'Could not check dependencies' });
  }

  // 10. Check UI directory
  if (config) {
    const uiPath = config.aliases.ui.replace('@/', 'src/').replace('~/', '');
    try {
      await Deno.stat(`${cwd}/${uiPath}`);
      const files = [];
      for await (const entry of Deno.readDir(`${cwd}/${uiPath}`)) {
        if (entry.isFile) files.push(entry.name);
      }
      checks.push({
        name: 'UI directory',
        status: 'pass',
        message: `${uiPath} (${files.length} components)`,
      });
    } catch {
      checks.push({ name: 'UI directory', status: 'warn', message: `${uiPath} not created yet` });
    }
  }

  // Report
  const statusIcon = {
    pass: '\x1b[32m✓\x1b[0m',
    warn: '\x1b[33m!\x1b[0m',
    fail: '\x1b[31m✗\x1b[0m',
  };
  for (const check of checks) {
    console.log(`  ${statusIcon[check.status]} ${check.name.padEnd(18)} ${check.message}`);
  }

  const fails = checks.filter((c) => c.status === 'fail');
  const warns = checks.filter((c) => c.status === 'warn');
  logger.break();

  if (fails.length === 0 && warns.length === 0) {
    logger.success('All checks passed!');
  } else if (fails.length > 0) {
    logger.error(`${fails.length} issue(s) found. Fix them to use Adhar UI.`);
  } else {
    logger.warn(`${warns.length} warning(s). Components may still work.`);
  }
}
