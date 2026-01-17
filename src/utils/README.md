# Draco 压缩解码器使用指南

本项目已配置 Draco 压缩解码器，用于加载使用 Draco 压缩的 3D 模型。

## 文件结构

```
public/
  models/                    # 3D 模型文件目录（GLB/GLTF 格式）
    capybara.glb             # 示例：你的 3D 模型文件
  draco/
    draco_decoder.js          # JavaScript 解码器
    draco_decoder.wasm        # WebAssembly 解码器（性能更好）
    draco_wasm_wrapper.js     # WASM 包装器

src/utils/
  dracoLoader.ts             # DRACOLoader 配置工具
  loadDracoModel.ts          # 模型加载工具
  index.ts                   # 统一导出
```

## 模型文件存放位置

**GLB/GLTF 格式的 3D 文件应该放在 `public/models/` 目录下**

- 在代码中引用时，使用路径 `/models/your-model.glb`
- 路径以 `/` 开头，对应 `public/` 目录的根路径

## 使用方法

### 方法 1: 使用便捷函数加载模型

```typescript
import { loadDracoModel, loadDracoModelGroup } from '../utils/loadDracoModel';
import * as THREE from 'three';

// 加载完整的 GLTF 对象（包含场景、动画等）
const gltf = await loadDracoModel('/models/compressed-model.glb');
scene.add(gltf.scene);

// 或者只加载场景组
const modelGroup = await loadDracoModelGroup('/models/compressed-model.glb');
scene.add(modelGroup);
```

### 方法 2: 手动配置 DRACOLoader

```typescript
import { createDracoLoader } from '../utils/dracoLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const dracoLoader = createDracoLoader('/draco/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/models/compressed-model.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

### 在 Astro 组件中使用

```astro
---
import { loadDracoModel } from '../utils/loadDracoModel';
import * as THREE from 'three';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

// 在客户端加载模型
if (import.meta.env.SSR === false) {
  // 初始化 Three.js 场景
  // ... 场景设置代码 ...
  
  // 加载 Draco 压缩模型
  loadDracoModel('/models/capybara.glb')
    .then((gltf) => {
      scene.add(gltf.scene);
    })
    .catch((error) => {
      console.error('Failed to load model:', error);
    });
}
---

<div id="canvas-container"></div>

<script>
  // 客户端脚本
  import * as THREE from 'three';
  import { loadDracoModel } from '../utils/loadDracoModel';
  
  // 初始化场景和加载模型
</script>
```

## 配置选项

- `decoderPath`: 解码器文件路径（默认: `/draco/`）
- 解码器类型: 当前配置为 `js` 模式以确保兼容性，可改为 `wasm` 以获得更好性能

## 注意事项

1. 确保 Draco 解码器文件在 `public/draco/` 目录中
2. 模型文件需要是使用 Draco 压缩的 GLTF/GLB 格式
3. 在服务器端渲染（SSR）环境中，Three.js 相关代码需要在客户端执行
