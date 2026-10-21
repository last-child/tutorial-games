import { defineConfig } from 'vite';

// base: './' → 빌드 결과(dist)를 어느 경로에 올려도 에셋 상대경로가 유지된다.
export default defineConfig({
  base: './',
});
