import { defineConfig } from 'vite';

// base: './' → 빌드 결과를 어느 경로에 올려도 에셋 상대경로가 유지된다.
// outDir: 'play' → 빌드 결과를 저장소에 올려 GitHub Pages의 furina/play/에서 실행한다.
export default defineConfig({
  base: './',
  build: { outDir: 'play' },
});
