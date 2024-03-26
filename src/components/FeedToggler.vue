<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-ative">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          class="nav-link"
          :to="{name: 'yourFeed'}"
          :class="{active: routeName === 'yourFeed'}"
        >
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{name: 'globalFeed'}"
          :class="{active: routeName === 'globalFeed'}"
        >
          Global Feed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          class="nav-link"
          :to="{name: 'tag'}"
          :class="{active: routeName === 'tag'}"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getterTypes } from '@/store/modules/auth';
import { mapGetters } from 'vuex';

export default {
  name: 'McvFeedToggler',
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    routeName() {
      return this.$route.name
    }
  }
}
</script>
