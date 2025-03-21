<script setup lang="ts">
import { decode } from 'blurhash';

const props = withDefaults(
  defineProps<{
    hash?: string;
    src?: string;
    alt?: string;
    aspectRatio?: number;
    hashWidth?: number;
    hashHeight?: number;
  }>(),
  {
    hash: undefined,
    src: undefined,
    alt: undefined,
    aspectRatio: 3 / 2,
    hashWidth: 32,
    hashHeight: 32,
  },
);

const imgElement = useTemplateRef<HTMLImageElement>('img');
const canvasElement = useTemplateRef<HTMLCanvasElement>('canvas');

function drawBlurHash() {
  if (!props.hash) return;

  const pixels = decode(props.hash, props.hashWidth, props.hashHeight);
  const ctx = canvasElement.value?.getContext('2d');
  const imageData = ctx?.createImageData(props.hashWidth, props.hashHeight);
  if (!imageData) return;

  imageData.data.set(pixels);
  ctx!.putImageData(imageData, 0, 0);
}

function handleLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  img.style.animationName = 'fadeIn';
  // if (!canvasElement.value) return;
  // canvasElement.value.style.animationName = 'fadeOut';
}

watchEffect(() => drawBlurHash());

onMounted(() => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement;
        if (lazyImage.dataset.src) {
          lazyImage.src = lazyImage.dataset.src;
          imageObserver.unobserve(lazyImage);
        }
      }
    });
  });

  if (imgElement.value) {
    imageObserver.observe(imgElement.value);
  }
});
</script>

<template>
  <div class="lazy-image" :style="`aspect-ratio: ${aspectRatio}`">
    <canvas ref="canvas" :width="hashWidth" :height="hashHeight" />

    <img
      ref="img"
      :data-src="src"
      :alt="alt || ''"
      loading="lazy"
      :style="`aspect-ratio: ${aspectRatio}`"
      @load="handleLoad"
    />
  </div>
</template>

<style>
.lazy-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    /* animation-delay: var(--duration-sm);
    animation-duration: var(--duration-xl);
    animation-fill-mode: forwards; */
  }

  img {
    position: absolute;
    inset: 0;
    max-width: 100%;
    height: 100%;
    opacity: 0;
    animation-duration: var(--duration-xl);
    animation-fill-mode: forwards;
  }
}
</style>
