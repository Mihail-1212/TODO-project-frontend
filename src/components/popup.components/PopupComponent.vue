<template>
  <div class="modal-mask" v-if="isShow">
    <div class="modal-wrapper" @click.self="hideModal()">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupComponent',
  data() {
    return {
      isShow: false
    }
  },
  props: {
    OnOpening: {
      type: Function,
      required: false,
      default: () => {},
    },
    OnOpened: {
      type: Function,
      required: false,
      default: () => {},
    },
    OnClosing: {
      type: Function,
      required: false,
      default: () => {},
    },
    OnClosed: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  methods: {
    hideModal() {
      this.OnClosing()
      this.isShow = false
      this.OnClosed()
    },
    showModal() {
      this.OnOpening()
      this.isShow = true
      this.OnOpened()
    }
  }
}
</script>

<style scoped lang="scss" src="@/assets/scss/popup/popup.scss">
</style>
