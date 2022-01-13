import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
// 这里写一些公共的方法
export default Vue.extend({
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: { ...mapActions('poster', ['getInfoPoster']) },
  components: {}
})
