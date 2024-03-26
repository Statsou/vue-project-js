<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" />

    <div class="tag-list" v-if="popularTags">
      <router-link
        class="tag-default tag-pill"
        v-for="popularTag in popularTags"
        :key="popularTag"
        :to="{name: 'tag', params: {slug: popularTag}}"
      >
        {{ popularTag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from '@/store/modules/popularTags'

import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'

export default {
  name: 'McvPopularTags',
  components: {
    McvLoading,
    McvErrorMessage
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.data,
      error: state => state.popularTags.error
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  }
}
</script>
