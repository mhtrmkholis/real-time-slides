<template>
  <vueper-slides
    :infinite="false"
    :touchable="false"
    @slide="slideUpdate"
    fixed-height="100vh"
    ref="slides">
    <vueper-slide
      v-for="slide in slides"
      :key="slide.id"
      :title="slide.title"
      :content="slide.content"
    ></vueper-slide>
  </vueper-slides>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      currentSlideIndex: 0,
      slides: [
        {
          id: 1,
          title: 'Stardust Crusaders Characters',
          content: '',
        },
        {
          id: 2,
          title: `
            <img
              src="https://66.media.tumblr.com/04fe5b58ba810a38795217c5f5beef77/tumblr_olmu6cLFDT1vy2tgqo1_250.png"
              class="character-icon"><br>
              Jotaro Kujo`,
          content: '',
        },
        {
          id: 3,
          title: `
            <img
              src="https://66.media.tumblr.com/ef148fb9e5cebea5b0eece5c9ef10bea/tumblr_pop2ufBPcH1u1ycqw_540.jpg"
              class="character-icon"><br>
            Joseph Joestar`,
          content: '',
        },
        {
          id: 4,
          title: `
            <img
              src="https://66.media.tumblr.com/ba8684a7df1af67243ada8b5890823ba/tumblr_pmsciwZ98V1v7ql19_540.jpg"
              class="character-icon"><br>
            DIO`,
          content: '',
        },
      ],
    };
  },
  methods: {
    slideUpdate(eventName, params) {
      this.currentSlideIndex = params.currentSlide.index;

      axios
        .patch(`${serverUrl}/current-slide-index`, { currentSlideIndex: this.currentSlideIndex })
        .then(() => {
          console.log('Slide updated');
        })
        .catch(console.log);
    },
  },
  created() {
    socket.on('change-current-slide-index', (newIndex) => {
      if (newIndex !== this.currentSlideIndex) {
        this.$refs.slides.goToSlide(newIndex);
      }
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  fill: #fff;
  color: #fff;
}
.vueperslide {
  background-color: #333;
}
.vueperslide__content-wrapper {
  top: 50%;
  left: 50%;
  width: 80%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-family: sans-serif;
}
.vueperslide__title {
  font-size: 2em;
  font-weight: 900;
  color: #fff;
}
.character-icon {
  width: 200px;
  border-radius: 100%;
}

@media (min-width: 500px) {
  .vueperslide__title {
    font-size: 4em;
  }
}

@media (min-width: 800px) {
  .vueperslide__title {
    font-size: 7em;
  }
}
</style>
