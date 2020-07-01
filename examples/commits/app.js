/* global Vue */

var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

/**
 * Actual demo
 */

new Vue({

  el: '#demo',

  data: {
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null,
    msg:'tttt'
  },

  created: function () {
    this.fetchData()
  },
  component: {
    childComponent
  },
  watch: {
    currentBranch: 'fetchData'
  },
  mounted: function() {
    console.log('父组件mounted');
  },
  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    getMsg:function(data){
      console.log(data);
   },
   postMsg () {
      console.log('父组件中响应的')
   },
   parentCreate(){
    console.log("父组件 created");
   },

    fetchData: function () {
      var self = this
      if (navigator.userAgent.indexOf('PhantomJS') > -1) {
        // use mocks in e2e to avoid dependency on network / authentication
        setTimeout(function () {
          self.commits = window.MOCKS[self.currentBranch]
        }, 0)
      } else {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', apiURL + self.currentBranch)
        xhr.onload = function () {
          self.commits = JSON.parse(xhr.responseText)
          console.log(self.commits[0].html_url)
        }
        xhr.send()
      }
    },
    onClick(e) {
      console.log('click', e);
    }
  }
})

var childComponent =  Vue.component('child',{
  template:"<div><p @click='showMsg'>{{childMsg}}</p></div>",
  data:function(){
   return {
      childMsg:"Hello child"
   }
  },
  mounted: function() {
    console.log('子组件mounted');
  },
  name: 'child',
  created:function(){
   console.log("子组件created");
  },
  props:['msg1','msg2'],
  methods:{
     showMsg:function(){
       this.$emit('childclick', '子组件抛出去吧');
     }
  }
});

