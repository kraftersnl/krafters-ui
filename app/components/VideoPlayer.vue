<script setup lang="ts">
const props = defineProps<{
  url: string;
  caption?: string;
}>();

const started = ref(false);

const videoProvider = computed(() => {
  if (props.url?.includes('vimeo')) {
    return 'vimeo';
  }
  return 'youtube';
});

const videoKey = computed(() => {
  let match: string[] | undefined | null;

  if (videoProvider.value === 'vimeo') {
    match = props.url?.match(
      /:\/\/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)(?:#t=(\d+?)s)?/,
    );
  } else {
    match = props.url?.match(
      /:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9-_]+)(?:(?:&t=|\?t=|\?start=)(\d+))?/,
    );
  }

  if (match?.length === 3) {
    return match[1];
  }

  return 'e';
});

const metadataUrl = computed(() => {
  if (videoProvider.value === 'vimeo') {
    return `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoKey.value}&width=960&height=540`;
  }
  return `https://youtube.com/oembed?url=https://youtube.com/watch?v=${videoKey.value}&format=json`;
});

const { data: videoData } = useAsyncData<VideoMetaData>(props.url, () =>
  $fetch(metadataUrl.value),
);

const ratio = computed(() => {
  if (videoData.value?.width && videoData.value?.height) {
    const ar = videoData.value.width / videoData.value.height;

    if (ar >= 1.76 && ar <= 1.79) {
      return 16 / 9;
    }
    return ar;
  }

  return 16 / 9;
});

const embedUrl = computed(() => {
  if (videoProvider.value === 'vimeo') {
    return `https://player.vimeo.com/video/${videoKey.value}?autoplay=1&keyboard=0`;
  }
  return `https://www.youtube-nocookie.com/embed/${videoKey.value}?autoplay=1&disablekb=1`;
});

function playVideo() {
  started.value = true;
}
</script>

<template>
  <figure class="video-player" :style="`--aspect-ratio: ${ratio};`">
    <img
      v-if="!started && videoData"
      :src="videoData?.thumbnail_url"
      :alt="videoData?.title || ''"
      loading="lazy"
      @click="playVideo"
    />

    <button v-if="!started" type="button" @click="playVideo">
      <Icon name="ic:round-play-arrow" />
      <span class="visuallyhidden">Speel video af: {{ videoData?.title }}</span>
    </button>

    <figcaption v-if="!started && caption">{{ caption }}</figcaption>

    <div v-if="started" class="iframe-wrapper">
      <iframe
        :src="embedUrl"
        :title="`Video: ${videoData?.title}`"
        allow="autoplay *; fullscreen *; encrypted-media *"
        allowfullscreen
      />
    </div>
  </figure>
</template>

<style>
.video-player {
  position: relative;
  display: grid;
  min-width: 240px;
  place-items: center;

  img {
    cursor: pointer;
    background-color: black;
    aspect-ratio: var(--aspect-ratio);
    width: 100%;
  }

  figcaption {
    padding-block-start: 1rem;
    font-style: italic;
  }

  button {
    background-color: black;
    padding: 0;
    border: none;
    color: white;
    display: grid;
    place-content: center;
    border-radius: var(--radius-full);
    position: absolute;
    cursor: pointer;
    scale: 0.95;
    transition: scale var(--duration-sm) ease-out;

    .iconify {
      font-size: 5rem;
    }

    &:hover {
      scale: 1;
    }
  }

  .iframe-wrapper {
    width: 100%;
    aspect-ratio: var(--aspect-ratio);
  }

  iframe {
    border: 0;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
