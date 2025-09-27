import { homedir } from 'node:os';

/**
 * Path-related test utilities.
 */
export namespace path {
  /**
   * Replace \ separators to / separators.
   */
  export function toPosixSep(path: string): string {
    return path.replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/');
  }

  /**
   * Expands the '~' character where applicable to the user's home directory.
   */
  export function expandHome(path: string): string {
    if (path.startsWith('~')) {
      return homedir() + path.slice(1);
    }

    return path;
  }

  /**
   * Interpret the path closely to how sh would, returning an absolute path.
   */
  export function shellAbs(path: string): string {
    // TODO(markovejnovic): Implement properly...
    return toPosixSep(expandHome(path));
  }
}
