import * as path from 'path';
import { Glob } from 'bun';

/**
 * Loads all exported classes from the given directory.
 * @see https://github.com/typestack/routing-controllers/blob/master/src/util/importClassesFromDirectories.ts
 */
export function importClassesFromDirectories(directories: string[], formats = ['.js', '.ts']): Function[] {
  const loadFileClasses = function(exported: any, allLoaded: Function[]) {
    if (exported instanceof Function) {
      allLoaded.push(exported);
    } else if (exported instanceof Array) {
      exported.forEach((i: any) => loadFileClasses(i, allLoaded));
    } else if (exported instanceof Object || typeof exported === 'object') {
      Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));
    }

    return allLoaded;
  };

  const allFiles = directories.reduce((allDirs, dir) => {
    const glob = new Glob(path.basename(dir));
    const things = Array.from(glob.scanSync({
      cwd: path.dirname(dir),
    })).map(file => path.join(path.dirname(dir), file));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return allDirs.concat(things);
  }, [] as string[]);

  const dirs = allFiles
    .filter(file => {
      const dtsExtension = file.substring(file.length - 5, file.length);
      return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
    })
    .map(file => {
      return require(file);
    });

  return loadFileClasses(dirs, []);
}
