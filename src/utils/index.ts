// Export all Draco-related utilities
export { createDracoLoader, disposeDracoLoader } from './dracoLoader';
export { loadDracoModel, loadDracoModelGroup } from './loadDracoModel';

/**
 * Get URL with base path
 * 获取带 base 路径的 URL
 */
export function getUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash from base, add path
  const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${baseClean}${cleanPath}`;
}
