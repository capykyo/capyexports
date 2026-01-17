# 3D 模型文件目录

此目录用于存放 3D 模型文件（GLB、GLTF 格式）。

## 目录结构

```
public/
  models/              # 3D 模型文件目录
    capybara.glb       # 示例：水豚模型
    your-model.glb     # 你的模型文件
  draco/               # Draco 解码器文件
    draco_decoder.js
    draco_decoder.wasm
    draco_wasm_wrapper.js
```

## 使用方法

将你的 GLB 或 GLTF 文件放在此目录下，然后通过以下方式加载：

```typescript
import { loadDracoModel } from '../../utils/loadDracoModel';

// 加载模型（路径相对于 public 目录）
const gltf = await loadDracoModel('/models/capybara.glb');
scene.add(gltf.scene);
```

## 注意事项

1. **文件路径**：在代码中使用时，路径以 `/` 开头，对应 `public/` 目录
   - `public/models/capybara.glb` → `/models/capybara.glb`
   
2. **文件大小**：大文件建议使用 Draco 压缩以减小体积

3. **文件格式**：支持 GLB（二进制）和 GLTF（JSON）格式

4. **Draco 压缩**：如果模型使用了 Draco 压缩，确保 `public/draco/` 目录中有解码器文件
