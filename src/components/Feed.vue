<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" />
    <div v-if="!feed && !isLoading">
      <span>There are no posts</span>
    </div>

    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              class="author"
              :to="{name: 'userProfile', params: {slug: article.author.username}}"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <mcv-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          class="preview-link"
          :to="{name: 'article', params: {slug: article.slug}}"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/feed'
import { mapState } from 'vuex'
import { limit } from '@/helpers/vars'
import queryString  from 'query-string'

import McvPagination from '@/components/Pagination.vue'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import McvTagList from '@/components/TagList.vue'
import McvAddToFavorites from '@/components/AddToFavorites.vue'

export default {
  name: 'McvFeed',
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTagList,
    McvAddToFavorites
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    limit() {
      return limit
    },
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl)
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>
