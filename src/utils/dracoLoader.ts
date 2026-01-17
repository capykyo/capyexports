import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

/**
 * Creates and configures a DRACOLoader instance for decoding Draco-compressed 3D models
 * @param decoderPath - Path to the Draco decoder files (default: '/draco/')
 * @returns Configured DRACOLoader instance
 */
export function createDracoLoader(decoderPath: string = '/draco/'): DRACOLoader {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(decoderPath);
  
  // Prefer WASM decoder for better performance, fallback to JS if needed
  dracoLoader.setDecoderConfig({ type: 'js' }); // Use 'js' for broader compatibility, or 'wasm' for better performance
  
  return dracoLoader;
}

/**
 * Disposes of a DRACOLoader instance to free up resources
 * @param dracoLoader - The DRACOLoader instance to dispose
 */
export function disposeDracoLoader(dracoLoader: DRACOLoader): void {
  dracoLoader.dispose();
}
