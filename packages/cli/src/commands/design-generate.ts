/**
 * `adhar-ui design-generate` command.
 *
 * Generates a complete importable design system kit consisting of:
 *  - SVG component files organized by category (all 91 components)
 *  - Color token swatches for light and dark modes
 *  - Typography scale samples
 *  - Spacing scale visualization
 *  - Penpot-compatible manifest JSON
 *  - W3C DTCG token file
 *  - README with import instructions
 *
 * Output: `design-kit/` directory in the project root.
 *
 * @module
 */

import { readConfig } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';
import { generateDesignKit } from '@adhar-ui/design-sync/generator';

export async function designGenerateCommand(
  cwd: string,
  args: string[],
): Promise<void> {
  const config = await readConfig(cwd);
  const preset = config?.tailwind.baseColor ?? 'zinc';

  const outputDir = args.find((a) => a.startsWith('--output='))?.split('=')[1] ?? 'design-kit';
  const outputPath = `${cwd}/${outputDir}`;

  logger.header('Generating Adhar UI Design Kit');
  logger.info(`Theme preset: ${preset}`);
  logger.info(`Output: ${outputDir}/`);
  logger.break();

  // Generate the kit
  const kit = generateDesignKit(preset);

  // Write all files
  let written = 0;
  for (const file of kit.files) {
    const filePath = `${outputPath}/${file.path}`;
    const dir = filePath.split('/').slice(0, -1).join('/');

    try {
      await Deno.mkdir(dir, { recursive: true });
    } catch { /* exists */ }

    await Deno.writeTextFile(filePath, file.content);
    written++;
  }

  // Report
  logger.success(`Generated ${written} files`);
  logger.break();

  console.log(`  Components:    ${kit.stats.components}`);
  console.log(`  Variants:      ${kit.stats.variants}`);
  console.log(`  Pages:         ${kit.stats.pages}`);
  console.log(`  Color tokens:  ${kit.manifest.colors.length}`);
  console.log(`  Typography:    ${kit.manifest.typography.length} styles`);
  console.log(`  Total files:   ${kit.stats.files}`);

  logger.break();
  logger.success(`Design kit generated at ${outputDir}/`);
  logger.break();
  logger.info('Next steps:');
  logger.list([
    `Import SVGs from ${outputDir}/components/ into Penpot as assets`,
    `Import colors from ${outputDir}/tokens/colors/ into your color library`,
    `Use ${outputDir}/tokens/tokens.dtcg.json for token sync with any DTCG tool`,
    `See ${outputDir}/README.md for detailed import instructions`,
  ]);
}
