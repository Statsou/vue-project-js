import popularTagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
  getPopularTagsFailure: '[popularTags] getPopularTagsFailure'
}

export const actionTypes = {
  getPopularTags: '[popularTags] getPopularTags'
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.data = null,
    state.isLoading = true
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.data = payload,
    state.isLoading = false
  },
  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false,
    state.error = true
  }
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getPopularTagsStart)

      popularTagsApi
        .getPopularTags()
        .then(tags => {
          context.commit(mutationTypes.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
