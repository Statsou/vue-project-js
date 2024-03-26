<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <mcv-follow-user-profile v-if="!isCurrentUserProfile" />
              <router-link
                class="btn btn-sm action-btn ng-binding btn-outline-secondary"
                :to="{name: 'settings'}"
                v-if="isCurrentUserProfile"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                  :to="{name: 'userProfile', params: {slug: userProfile.username}}"
                >
                  My Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                  :to="{name: 'userProfileFavorites', params: {slug: userProfile.username}}"
                >
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <mcv-feed :api-url="apiUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { actionTypes as userProfileActionTypes } from '@/store/modules/userProfile';
import { getterTypes as authGetterTypes } from '@/store/modules/auth'
import McvFeed from '@/components/Feed.vue'
import McvFollowUserProfile from '@/components/FollowUserButton.vue'

export default {
  name: 'McvUserProfile',
  components: {
    McvFeed,
    McvFollowUserProfile
  },
  computed: {
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      userProfile: state => state.userProfile.data,
      error: state => state.userProfile.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false
      }

      return this.currentUser.username === this.userProfile.username
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites')
      return isFavorites
        ? `articles?favorited=${this.userProfileSlug}`
        : `articles?author=${this.userProfileSlug}`
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    routeName() {
      return this.$route.name
    }
  },
  mounted() {
    this.getUserProfile()
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile()
    }
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {slug: this.userProfileSlug})
    }
  }
}
</script>
