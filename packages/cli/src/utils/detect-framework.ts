/**
 * Framework detection for Adhar UI CLI.
 * Mirrors adhar-kit's FrameworkDetector.java pattern.
 * Inspects package.json dependencies and config files.
 */

export type Framework = 'react' | 'vue' | 'angular' | 'solid' | 'svelte' | 'unknown';
export type MetaFramework =
  | 'nextjs'
  | 'remix'
  | 'nuxt'
  | 'astro'
  | 'sveltekit'
  | 'analog'
  | 'vite'
  | 'none';

export interface ProjectInfo {
  framework: Framework;
  metaFramework: MetaFramework;
  isSrcDir: boolean;
  isTypeScript: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun' | 'deno';
  tailwindVersion: 4 | null;
}

export async function detectFramework(cwd: string): Promise<ProjectInfo> {
  const info: ProjectInfo = {
    framework: 'unknown',
    metaFramework: 'none',
    isSrcDir: false,
    isTypeScript: false,
    packageManager: 'npm',
    tailwindVersion: null,
  };

  // Read package.json
  let pkg: Record<string, unknown> = {};
  try {
    const pkgText = await Deno.readTextFile(`${cwd}/package.json`);
    pkg = JSON.parse(pkgText);
  } catch {
    // No package.json - check for deno.json
    try {
      await Deno.stat(`${cwd}/deno.json`);
      info.packageManager = 'deno';
    } catch { /* no config */ }
  }

  const deps = {
    ...(pkg.dependencies as Record<string, string> || {}),
    ...(pkg.devDependencies as Record<string, string> || {}),
  };

  // Detect UI framework
  if (deps['react'] || deps['react-dom'] || deps['@types/react']) info.framework = 'react';
  else if (deps['vue'] || deps['@vue/runtime-core']) info.framework = 'vue';
  else if (deps['@angular/core']) info.framework = 'angular';
  else if (deps['solid-js']) info.framework = 'solid';
  else if (deps['svelte']) info.framework = 'svelte';

  // Detect meta-framework
  if (deps['next']) info.metaFramework = 'nextjs';
  else if (deps['@remix-run/react'] || deps['@remix-run/node']) info.metaFramework = 'remix';
  else if (deps['nuxt'] || deps['nuxt3']) info.metaFramework = 'nuxt';
  else if (deps['astro']) info.metaFramework = 'astro';
  else if (deps['@sveltejs/kit']) info.metaFramework = 'sveltekit';
  else if (deps['@analogjs/platform']) info.metaFramework = 'analog';
  else {
    // Check for vite config
    for (const f of ['vite.config.ts', 'vite.config.js', 'vite.config.mts']) {
      try {
        await Deno.stat(`${cwd}/${f}`);
        info.metaFramework = 'vite';
        break;
      } catch { /* not found */ }
    }
  }

  // Detect src directory
  try {
    const stat = await Deno.stat(`${cwd}/src`);
    info.isSrcDir = stat.isDirectory;
  } catch { /* no src dir */ }

  // Detect TypeScript
  for (const f of ['tsconfig.json', 'tsconfig.app.json']) {
    try {
      await Deno.stat(`${cwd}/${f}`);
      info.isTypeScript = true;
      break;
    } catch { /* not found */ }
  }

  // Detect package manager
  try {
    await Deno.stat(`${cwd}/pnpm-lock.yaml`);
    info.packageManager = 'pnpm';
  } catch {
    try {
      await Deno.stat(`${cwd}/yarn.lock`);
      info.packageManager = 'yarn';
    } catch {
      try {
        await Deno.stat(`${cwd}/bun.lockb`);
        info.packageManager = 'bun';
      } catch {
        try {
          await Deno.stat(`${cwd}/deno.lock`);
          info.packageManager = 'deno';
        } catch { /* npm default */ }
      }
    }
  }

  // Detect Tailwind version
  if (deps['tailwindcss']) {
    const ver = deps['tailwindcss'];
    if (ver.startsWith('4') || ver.startsWith('^4') || ver.startsWith('~4')) {
      info.tailwindVersion = 4;
    } else {
      info.tailwindVersion = 4;
    }
  }

  return info;
}
