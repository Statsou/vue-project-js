<template>
  <button class="btn btn-sm action-btn ng-binding btn-outline-secondary" type="button">
    <i class="ion-plus-round" />
    &nbsp;Follow {{ userProfile.username }}
  </button>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'McvFollowUserProfile',
    computed: {
    ...mapState({
      userProfile: state => state.userProfile.data
    }),
  }
}
</script>
