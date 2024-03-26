<template>
  <button
    :class="{'btn': true, 'btn-sm': true, 'btn-primary': isFavoritedOptimistic, 'btn-outline-primary': !isFavoritedOptimistic}"
    type="button"
    @click="handleLike"
  >
    <i class="ion-heart" />
    <span>&nbsp;{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import { actionTypes as addToFavoritesActionTypes } from '@/store/modules/addToFavorites'
import { getterTypes as authGetterTypes } from '@/store/modules/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: authGetterTypes.isLoggedIn
    })
  },
  methods: {
    handleLike() {
      if (this.isLoggedIn) {
        this.$store.dispatch(addToFavoritesActionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFaforited: this.isFavoritedOptimistic
        })
        if (this.isFavoritedOptimistic) {
          this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1
        } else {
          this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1
        }
        this.isFavoritedOptimistic = !this.isFavoritedOptimistic
      } else {
        this.$router.push({name: 'login'})
      }
    }
  }
}
</script>
