<script setup lang="ts">
const props = defineProps<{
  url?: string;
}>();

const videoKey = ref();
const started = ref(false);
const ratio = ref(16 / 9);
const videoData: VideoMetaData = reactive({});

const videoProvider = computed(() => {
  if (props.url?.includes('vimeo')) {
    return 'vimeo';
  }
  return 'youtube';
});

watchEffect(() => getVideo());

function playVideo() {
  started.value = true;
}

async function getVideo() {
  started.value = false;

  // YouTube URL match
  if (videoProvider.value === 'youtube') {
    if (props.url) {
      const match = props.url.match(
        /:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9-_]+)(?:(?:&t=|\?t=|\?start=)(\d+))?/,
      );
      if (match?.length === 3) {
        videoKey.value = match[1];
      }
    }
  }

  // Vimeo URL match
  if (videoProvider.value === 'vimeo') {
    if (props.url) {
      const match = props.url.match(
        /:\/\/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)(?:#t=(\d+?)s)?/,
      );
      if (match?.length === 3) {
        videoKey.value = match[1];
      }
    }
  }

  await getRatio();
}

async function getRatio() {
  let url = `https://youtube.com/oembed?url=https://youtube.com/watch?v=${videoKey.value}&format=json`;

  if (videoProvider.value === 'vimeo') {
    url = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/132733629&width=960&height=540`;
  }

  const { data: response } = await useAsyncData<VideoMetaDataResponse>(
    props.url,
    () => $fetch(url),
  );
  Object.assign(videoData, response.value);

  if (response.value?.width && response.value?.height) {
    ratio.value = response.value.width / response.value.height;
  }
  if (ratio.value >= 1.76 && ratio.value <= 1.79) ratio.value = 16 / 9;
}

const embedUrl = computed(() => {
  if (videoProvider.value === 'vimeo') {
    return `https://player.vimeo.com/video/${videoKey.value}?autoplay=1&keyboard=0`;
  }
  return `https://www.youtube-nocookie.com/embed/${videoKey.value}?autoplay=1&disablekb=1`;
});
</script>

<template>
  <figure class="video-player" :style="`--aspect-ratio: ${ratio};`">
    <NuxtImg
      v-if="!started && videoData"
      :src="videoData?.thumbnail_url"
      :alt="videoData?.title || ''"
      format="webp"
      @click="playVideo"
    />

    <button v-if="!started" type="button" @click="playVideo">
      <Icon name="ic:round-play-arrow" />
      <span class="visuallyhidden">Speel video af: {{ videoData?.title }}</span>
    </button>

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
  width: 100%;
  position: relative;
  display: grid;
  place-items: center;

  img {
    cursor: pointer;
    background-color: black;
    aspect-ratio: var(--aspect-ratio);
    width: 100%;
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
    scale: 0.9;
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
