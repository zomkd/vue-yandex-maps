<template>
  <common-wrapper>
    <template
      #default="{
        coordinates: center, theme, zoom, width, height,
      }"
    >
      <!-- #region html -->
      <yandex-map
        :settings="{
          location: {
            center,
            zoom,
          },
        }"
        :width="width"
        :height="height"
      >
        <yandex-map-default-scheme-layer :settings="{ theme }" />
        <yandex-map-controls :settings="{ position: 'right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>

        <template v-if="dataSource">
          <yandex-map-tile-data-source :settings="{ id: layerId, raster: dataSource }" />
          <yandex-map-layer :settings="{ id: layerId, source: layerId, type: layerId }" />
        </template>
      </yandex-map>
      <!-- #endregion html -->
    </template>
  </common-wrapper>
</template>

<script setup lang="ts">
import CommonWrapper from '../CommonWrapper.vue';
// #region setup
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultSchemeLayer,
  YandexMapLayer,
  YandexMapTileDataSource,
  YandexMapZoomControl,
} from 'vue-yandex-maps';
import { onMounted } from 'vue';
import type { YMapTileDataSourceProps } from '@yandex/ymaps3-types';

const TILE_SIZE = 256;

const layerId = 'A';

let dataSource: YMapTileDataSourceProps['raster'] | undefined;

onMounted(() => {
  const image = new Image();

  const load = new Promise((resolve) => {
    image.src = '/vue-yandex-maps/ship.svg';
    if (image.complete) {
      resolve(image);
    } else {
      image.onload = () => resolve(image);
      image.onerror = () => resolve(image);
    }
  });

  dataSource = {
    type: layerId,
    fetchTile: async (x: number, y: number, z: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = TILE_SIZE;
      canvas.height = TILE_SIZE;
      const ctx = canvas.getContext('2d')!;
      ctx.strokeStyle = 'red';
      ctx.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
      ctx.fillText(JSON.stringify({
        x,
        y,
        z,
      }), 10, 10);
      ctx.drawImage(image, 0, 0);
      await load;
      return ({ image: canvas });
    },
  };
});
// #endregion setup
</script>
