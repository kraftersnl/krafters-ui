<script setup lang="ts">
const props = defineProps<{
  url: string;
  caption?: string;
  loading?: 'lazy' | 'eager';
}>();

const started = ref(false);

const videoProvider = computed(() => {
  if (props.url?.includes('vimeo')) {
    return 'vimeo';
  }
  return 'youtube';
});

/** Vimeo video id and optional privacy hash (path or `h` query). */
function parseVimeoUrl(url: string | undefined): { id: string; hash?: string } {
  if (!url) {
    return { id: 'e' };
  }

  try {
    const parsed = new URL(url);
    const hFromQuery = parsed.searchParams.get('h') ?? undefined;
    const segments = parsed.pathname.split('/').filter(Boolean);
    const videoIndex =
      segments[0] === 'video' && segments.length >= 2 ? 1 : 0;
    const idSegment = segments[videoIndex];
    if (idSegment && /^\d+$/.test(idSegment)) {
      const next = segments[videoIndex + 1];
      const hashFromPath =
        next && /^[a-zA-Z0-9]+$/.test(next) ? next : undefined;
      return {
        id: idSegment,
        hash: hashFromPath ?? hFromQuery,
      };
    }
  } catch {
    /* relative or malformed URL */
  }

  const legacy = url.match(
    /:\/\/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)(?:#t=(\d+?)s)?/,
  );
  if (legacy?.[1]) {
    const hParam = url.match(/[?&]h=([a-zA-Z0-9]+)/);
    return { id: legacy[1], hash: hParam?.[1] };
  }

  return { id: 'e' };
}

const vimeoParsed = computed(() =>
  videoProvider.value === 'vimeo' ? parseVimeoUrl(props.url) : null,
);

const videoKey = computed(() => {
  if (videoProvider.value === 'vimeo') {
    return vimeoParsed.value?.id ?? 'e';
  }

  const match = props.url?.match(
    /:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9-_]+)(?:(?:&t=|\?t=|\?start=)(\d+))?/,
  );

  if (match?.length === 3) {
    return match[1];
  }

  return 'e';
});

const vimeoPrivacyHash = computed(() => vimeoParsed.value?.hash);

const metadataUrl = computed(() => {
  if (videoProvider.value === 'vimeo') {
    const pageUrl = vimeoPrivacyHash.value
      ? `https://vimeo.com/${videoKey.value}/${vimeoPrivacyHash.value}`
      : `https://vimeo.com/${videoKey.value}`;
    return `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(pageUrl)}&width=960&height=540`;
  }
  return `https://youtube.com/oembed?url=https://youtube.com/watch?v=${videoKey.value}&format=json`;
});

const { data: videoData } = await useAsyncData<VideoMetaData>(
  props.url || '',
  () => $fetch(metadataUrl.value),
  {
    lazy: true,
  },
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
    const h =
      vimeoPrivacyHash.value &&
      `&h=${encodeURIComponent(vimeoPrivacyHash.value)}`;
    return `https://player.vimeo.com/video/${videoKey.value}?autoplay=1&keyboard=0${h ?? ''}`;
  }
  return `https://www.youtube-nocookie.com/embed/${videoKey.value}?autoplay=1&disablekb=1`;
});

const thumbUrl = computed(() => {
  if (videoProvider.value === 'vimeo') {
    return videoData.value?.thumbnail_url;
  }
  return `https://i.ytimg.com/vi_webp/${videoKey.value}/hq720.webp`;
  // return `https://img.youtube.com/vi/${videoKey.value}/maxresdefault.jpg`;
});

function playVideo() {
  started.value = true;
}
</script>

<template>
  <figure class="video-player" :style="`--aspect-ratio: ${ratio}`">
    <NuxtImg
      v-if="!started && videoData"
      :src="thumbUrl"
      :alt="videoData?.title || ''"
      :loading="loading"
      :preload="loading === 'eager' ? { fetchPriority: 'high' } : undefined"
      format="webp"
      @click="playVideo"
    />

    <button v-if="!started" type="button" @click="playVideo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
      >
        <path
          d="M6.906 4.537A.6.6 0 0 0 6 5.053v13.894a.6.6 0 0 0 .906.516l11.723-6.947a.6.6 0 0 0 0-1.032z"
          aria-hidden="true"
        />
      </svg>

      <span class="visuallyhidden"
        >{{ $t('video.play') }}: {{ videoData?.title }}</span
      >
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
    font-style: italic;
    font-size: smaller;
    color: var(--color-grey-text);
    padding-block-start: 1rem;
  }

  button {
    background-color: black;
    border: none;
    color: white;
    display: grid;
    place-content: center;
    border-radius: var(--radius-full);
    position: absolute;
    padding: 0.25rem;
    cursor: pointer;
    scale: 0.94;
    transition: scale var(--duration-sm) ease-out;

    svg {
      fill: currentColor;
      padding-inline-start: 0.35rem;
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
