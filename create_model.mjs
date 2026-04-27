import * as THREE from 'three';
import fs from 'fs';

// simple GLTF format
const gltf = {
  "asset": { "version": "2.0" },
  "scenes": [{ "nodes": [0] }],
  "scene": 0,
  "nodes": [{ "mesh": 0 }],
  "meshes": [{
    "primitives": [{
      "attributes": { "POSITION": 1 },
      "indices": 0,
      "material": 0
    }]
  }],
  "materials": [{
    "pbrMetallicRoughness": {
      "baseColorFactor": [1, 0, 0, 1],
      "metallicFactor": 0,
      "roughnessFactor": 0.5
    }
  }],
  "buffers": [{
    "uri": "data:application/octet-stream;base64,AAABAAIAAwAAAAEA", // 0,1,2, 3,0,1, basic indices
    "byteLength": 12
  }, {
    "uri": "data:application/octet-stream;base64,AAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAACAPwAAAAAAAAAAAAAAAA==", // Simple triangle positions (0,1,0), (1,0,0), (0,0,1)
    "byteLength": 36
  }],
  "bufferViews": [{
    "buffer": 0,
    "byteOffset": 0,
    "byteLength": 12,
    "target": 34963
  }, {
    "buffer": 1,
    "byteOffset": 0,
    "byteLength": 36,
    "target": 34962
  }],
  "accessors": [{
    "bufferView": 0,
    "byteOffset": 0,
    "componentType": 5123,
    "count": 3,
    "type": "SCALAR"
  }, {
    "bufferView": 1,
    "byteOffset": 0,
    "componentType": 5126,
    "count": 3,
    "type": "VEC3",
    "min": [0,0,0],
    "max": [1,1,1]
  }]
};
fs.writeFileSync('./static/model/swedish-royal/scene.gltf', JSON.stringify(gltf, null, 2));
