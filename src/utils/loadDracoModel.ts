import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group } from 'three';
import { createDracoLoader } from './dracoLoader';

// GLTF type definition
interface GLTF {
  scene: Group;
  scenes: Group[];
  cameras: any[];
  animations: any[];
  asset: any;
  parser: any;
  userData: any;
}

/**
 * Loads a Draco-compressed GLTF/GLB model
 * @param url - URL to the Draco-compressed model file
 * @param decoderPath - Path to the Draco decoder files (default: '/draco/')
 * @returns Promise that resolves to the loaded GLTF scene
 */
export async function loadDracoModel(
  url: string,
  decoderPath: string = '/draco/'
): Promise<GLTF> {
  return new Promise((resolve, reject) => {
    const dracoLoader = createDracoLoader(decoderPath);
    const gltfLoader = new GLTFLoader();
    
    // Set the DRACO loader on the GLTF loader
    gltfLoader.setDRACOLoader(dracoLoader);
    
    gltfLoader.load(
      url,
      (gltf) => {
        resolve(gltf as GLTF);
        // Optionally dispose the loader after use to free memory
        // dracoLoader.dispose();
      },
      (progress) => {
        // Progress callback
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading Draco model:', error);
        reject(error);
      }
    );
  });
}

/**
 * Loads a Draco-compressed GLTF/GLB model and returns just the scene group
 * @param url - URL to the Draco-compressed model file
 * @param decoderPath - Path to the Draco decoder files (default: '/draco/')
 * @returns Promise that resolves to the loaded 3D model group
 */
export async function loadDracoModelGroup(
  url: string,
  decoderPath: string = '/draco/'
): Promise<Group> {
  const gltf = await loadDracoModel(url, decoderPath);
  return gltf.scene;
}
