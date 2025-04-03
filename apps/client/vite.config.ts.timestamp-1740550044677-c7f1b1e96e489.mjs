// vite.config.ts
import react from 'file:///Users/yunsu/Documents/aicfo/aicfo2_mono/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_@swc+helpers@0.5.15_vite@5.4.11_@types+node@22.10.7_/node_modules/@vitejs/plugin-react-swc/index.mjs'
import { visualizer } from 'file:///Users/yunsu/Documents/aicfo/aicfo2_mono/node_modules/.pnpm/rollup-plugin-visualizer@5.14.0_rollup@4.29.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js'
import svgr from 'file:///Users/yunsu/Documents/aicfo/aicfo2_mono/node_modules/.pnpm/vite-plugin-svgr@4.3.0_rollup@4.29.1_typescript@5.7.2_vite@5.4.11_@types+node@22.10.7_/node_modules/vite-plugin-svgr/dist/index.js'
import tsconfigPaths from 'file:///Users/yunsu/Documents/aicfo/aicfo2_mono/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.2_vite@5.4.11_@types+node@22.10.7_/node_modules/vite-tsconfig-paths/dist/index.mjs'
import { defineConfig } from 'file:///Users/yunsu/Documents/aicfo/aicfo2_mono/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.7/node_modules/vite/dist/node/index.js'
import path from 'path'

var __vite_injected_original_dirname =
  '/Users/yunsu/Documents/aicfo/aicfo2_mono/apps/client'
var vite_config_default = defineConfig({
  envDir: '../../',
  plugins: [
    svgr(),
    react(),
    tsconfigPaths(),
    visualizer({
      open: true,
      gzipSize: true
    })
  ],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // React 관련
          'react-core': ['react', 'react-dom'],
          // 상태 관리
          'state-management': ['zustand'],
          // 라우팅
          routing: ['react-router-dom'],
          // UI 컴포넌트
          ui: ['@heroicons/react'],
          // 데이터 관련
          data: ['@tanstack/react-query', 'axios']
        }
      }
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'esbuild'
  },
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: path.resolve(
          __vite_injected_original_dirname,
          'src/assets'
        )
      },
      {
        find: '@components',
        replacement: path.resolve(
          __vite_injected_original_dirname,
          'src/components'
        )
      },
      {
        find: '@constants',
        replacement: path.resolve(
          __vite_injected_original_dirname,
          'src/constants'
        )
      },
      {
        find: '@hooks',
        replacement: path.resolve(__vite_injected_original_dirname, 'src/hooks')
      },
      {
        find: '@utils',
        replacement: path.resolve(__vite_injected_original_dirname, 'src/utils')
      },
      {
        find: '@stores',
        replacement: path.resolve(
          __vite_injected_original_dirname,
          'src/stores'
        )
      },
      {
        find: '@apis',
        replacement: path.resolve(__vite_injected_original_dirname, 'src/apis')
      },
      {
        find: '@pages',
        replacement: path.resolve(__vite_injected_original_dirname, 'src/pages')
      },
      {
        find: '@helper',
        replacement: path.resolve(
          __vite_injected_original_dirname,
          'src/helper'
        )
      },
      {
        find: '@types',
        replacement: path.resolve(__vite_injected_original_dirname, 'src/types')
      },
      {
        find: '@',
        replacement: path.resolve(__vite_injected_original_dirname, 'src')
      }
    ]
  },
  server: {
    port: 4e3
  }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXVuc3UvRG9jdW1lbnRzL2FpY2ZvL2FpY2ZvMl9tb25vL2FwcHMvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveXVuc3UvRG9jdW1lbnRzL2FpY2ZvL2FpY2ZvMl9tb25vL2FwcHMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95dW5zdS9Eb2N1bWVudHMvYWljZm8vYWljZm8yX21vbm8vYXBwcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVudkRpcjogJy4uLy4uLycsXG4gIHBsdWdpbnM6IFtcbiAgICBzdmdyKCksXG4gICAgcmVhY3QoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgdmlzdWFsaXplcih7XG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgZ3ppcFNpemU6IHRydWVcbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgaW5jbHVkZTogWy9ub2RlX21vZHVsZXMvXSxcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gUmVhY3QgXHVBRDAwXHVCODI4XG4gICAgICAgICAgJ3JlYWN0LWNvcmUnOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuXG4gICAgICAgICAgLy8gXHVDMEMxXHVEMERDIFx1QUQwMFx1QjlBQ1xuICAgICAgICAgICdzdGF0ZS1tYW5hZ2VtZW50JzogWyd6dXN0YW5kJ10sXG5cbiAgICAgICAgICAvLyBcdUI3N0NcdUM2QjBcdUQzMDVcbiAgICAgICAgICByb3V0aW5nOiBbJ3JlYWN0LXJvdXRlci1kb20nXSxcblxuICAgICAgICAgIC8vIFVJIFx1Q0VGNFx1RDNFQ1x1QjEwQ1x1RDJCOFxuICAgICAgICAgIHVpOiBbJ0BoZXJvaWNvbnMvcmVhY3QnXSxcblxuICAgICAgICAgIC8vIFx1RDNGQyBcdUFEMDBcdUI4MjhcbiAgICAgICAgICBmb3JtOiBbJ3JlYWN0LWhvb2stZm9ybSddLFxuXG4gICAgICAgICAgLy8gXHVCMzcwXHVDNzc0XHVEMTMwIFx1QUQwMFx1QjgyOFxuICAgICAgICAgIGRhdGE6IFsnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JywgJ2F4aW9zJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICBtaW5pZnk6ICdlc2J1aWxkJ1xuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHsgZmluZDogJ0Bhc3NldHMnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMnKSB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQGNvbXBvbmVudHMnLFxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJylcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAY29uc3RhbnRzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29uc3RhbnRzJylcbiAgICAgIH0sXG4gICAgICB7IGZpbmQ6ICdAaG9va3MnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9ob29rcycpIH0sXG4gICAgICB7IGZpbmQ6ICdAdXRpbHMnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscycpIH0sXG4gICAgICB7IGZpbmQ6ICdAc3RvcmVzJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3RvcmVzJykgfSxcbiAgICAgIHsgZmluZDogJ0BhcGlzJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXBpcycpIH0sXG4gICAgICB7IGZpbmQ6ICdAcGFnZXMnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wYWdlcycpIH0sXG4gICAgICB7IGZpbmQ6ICdAaGVscGVyJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaGVscGVyJykgfSxcbiAgICAgIHsgZmluZDogJ0B0eXBlcycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3R5cGVzJykgfSxcbiAgICAgIHsgZmluZDogJ0AnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpIH1cbiAgICBdXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDQwMDBcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsT0FBTyxXQUFXO0FBQ2hXLE9BQU8sVUFBVTtBQUNqQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFMMUIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLElBQ1AsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGlCQUFpQjtBQUFBLE1BQ2YsU0FBUyxDQUFDLGNBQWM7QUFBQSxNQUN4Qix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixjQUFjLENBQUMsU0FBUyxXQUFXO0FBQUE7QUFBQSxVQUduQyxvQkFBb0IsQ0FBQyxTQUFTO0FBQUE7QUFBQSxVQUc5QixTQUFTLENBQUMsa0JBQWtCO0FBQUE7QUFBQSxVQUc1QixJQUFJLENBQUMsa0JBQWtCO0FBQUE7QUFBQSxVQUd2QixNQUFNLENBQUMsaUJBQWlCO0FBQUE7QUFBQSxVQUd4QixNQUFNLENBQUMseUJBQXlCLE9BQU87QUFBQSxRQUN6QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2QixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLFdBQVcsYUFBYSxLQUFLLFFBQVEsa0NBQVcsWUFBWSxFQUFFO0FBQUEsTUFDdEU7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ3ZEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQ3REO0FBQUEsTUFDQSxFQUFFLE1BQU0sVUFBVSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxNQUNwRSxFQUFFLE1BQU0sVUFBVSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxNQUNwRSxFQUFFLE1BQU0sV0FBVyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxZQUFZLEVBQUU7QUFBQSxNQUN0RSxFQUFFLE1BQU0sU0FBUyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxVQUFVLEVBQUU7QUFBQSxNQUNsRSxFQUFFLE1BQU0sVUFBVSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxNQUNwRSxFQUFFLE1BQU0sV0FBVyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxZQUFZLEVBQUU7QUFBQSxNQUN0RSxFQUFFLE1BQU0sVUFBVSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxNQUNwRSxFQUFFLE1BQU0sS0FBSyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxJQUMzRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
