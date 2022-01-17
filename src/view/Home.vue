<template>
  <div class='Home-container'>
    <div class='Home-box'>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      selected: ''
    }
  },
  created () {
    let name = this.$route.name
    if (name == 'Home') {
      name = 'ChatList'
    }
    this.selected = name
  },
  methods: {},
  watch: {
    selected: function (val) {
      this.$router.push({name: val})
    },
    '$route': function (to, from) {
      let name = to.name
      if (to.name == 'Home') {
        this.selected = 'ChatList'
      } else {
        this.selected = to.name
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Home-container {
  font-size: 0.14rem;
}
</style>
