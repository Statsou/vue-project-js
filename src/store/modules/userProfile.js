import userProfileApi from "@/api/userProfile"

const state = {
  isLoading: false,
  data: null,
  error: null
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailure: '[userProfile] getUserProfileFailure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile',
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true,
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = true,
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = true,
    state.error = true
  }
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getUserProfileStart)

      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
