<template>
  <span>{{ message }}</span>
</template>

<script>
export default {
  name: 'McvErrorMessage',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Something bad happend'
    }
  }
}
</script>
