<template>
  <n-message-provider>
    <message-handler/>
  </n-message-provider>
  <n-config-provider :theme="theme" >
    <n-layout has-sider style="height: 100vh">
      <n-layout has-sider>
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <n-menu
              v-model:value="activeKey"
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout>

          <n-layout>
            <h1>Welcome to Potato!</h1>
            <n-button @click="createProject = true" >Create Project</n-button>
            <br>
            <hr>
            <h1>Projects</h1>
            <p>Project will be saved in LocalStorage</p>
            <n-alert title="No Project Founds" type="info" v-if="!getLocalStoage('projectList')">

              Theres no Project Founds,Did you cleared your Browser Data?
              <n-button>Create New Project!</n-button>
            </n-alert>
            <n-alert title="Loaded" type="success" v-if="getLocalStoage('projectList')">
              Saves Has Been Founded in LocalStorage
            </n-alert>
            <div v-if="getLocalStoage('projectList')">
              <n-list>

                <n-list-item v-for="(data,index) in getLocalStoageAsJSON('projectList').projects" :key="index">
                  <template #suffix>
                    <n-button @click="$router.push({ path: 'edit', query: { project: data.fileName }})">Load</n-button>
                    <n-button @click="deleteObject(data.name)" type="error">Delete</n-button>
                  </template>
                  <n-thing :title="data.name" :title-extra="data.time" description="description">

                  </n-thing>
                </n-list-item>


              </n-list>
            </div>
          </n-layout>
        </n-layout>
        </n-layout>
      </n-layout>

    <n-modal v-model:show="createProject" preset="dialog" title="Dialog">
      <template #header>
        <div>New Project</div>
      </template>
      <div>Create New Project</div>
      <n-input  placeholder="Project Name" required v-model:value="prName"/>
      <br>
      <n-input placeholder="Project Size Y" required v-model:value="prY"/>
      <br>
      <n-input placeholder="Project Size X" required  v-model:value="prX" />
      <br>
      <n-select v-model:value="presets" placeholder="Select a Presets" :options="options" />
      <br>
      <template #action>
        <n-button type="success" @click="createNewProject()">Create</n-button>
        <n-button type="error" @click="createProject = false">Dont Create</n-button>
      </template>
    </n-modal>
  </n-config-provider>
</template>

<script>

import { NButton ,NLayout,NModal,NInput,darkTheme,NConfigProvider,NListItem,NList,NAlert,NThing,NSelect,NMessageProvider,NLayoutSider,NMenu} from 'naive-ui'
import messageHandler from './components/content'
const menuOptions = [
  {
    label: 'Home',
    key: 'home',
    icon: () => <HomeOutlined />
  },
  {
    label: 'About',
    key: 'about',
    icon: () => <UserOutlined />
  },
  {
    label: 'Help',
    key: 'Help',
    icon: () => <ContactsOutlined />
  }
]

export default {

  name: 'HomeView',
  data() {
    return {
      menuOptions,
      createProject: false,
      theme: darkTheme,
      prName: "Simple Thing",
      prX: 0,
      prY: 0,
      presets: "",
      options: [
        {
          label: "only in ohio",
          value: "ohio"
        }
      ]
    }
  },
  methods: {
    createNewProject: function(){
      console.log(window.localStorage.length)
      console.log(this.prName)
      console.log(this.prX)
      console.log(this.prY)
      let plist = JSON.parse(localStorage.getItem("projectList"))
      plist.projects.push({
        name: this.prName,
        x: this.prX,
        y: this.prY,
        fileName: this.prName,
        time: new Date().toLocaleString("en-US")
      })
      if (this.presets) {
        localStorage.setItem(this.prName, JSON.stringify(require("./ohio.json")))
      }
      localStorage.setItem("projectList",JSON.stringify(plist))
      location.reload()
    },
    getLocalStoage: function (name){
      return localStorage.getItem(name)
    },
    getLocalStoageAsJSON: function(name){
      return JSON.parse(localStorage.getItem(name))
    },
    deleteObject: function (prName) {
      let projectList = JSON.parse(localStorage.getItem("projectList"))
      console.log("Deleteing..")
      for (let i = 0; i < projectList.projects.length; i++) {
        console.log("Objecct")
        console.log(projectList.projects[i])
       if (prName == projectList.projects[i].name) {
         projectList.projects.splice(i,1)
          localStorage.setItem("projectList",JSON.stringify(projectList))
         location.reload()
       } else {
         window.$message.warning("Project Not Found,Maybe Project Hasbeen already deleted?")
       }
      }
    }
  },
  setup() {
    if (!localStorage.getItem("projectList")){
      let json = {
        projects: []
      }
      window.localStorage.setItem("projectList",JSON.stringify(json))
    }

  },
  components: {
    NButton,
    NLayout,
    NModal,
    NInput,
    NConfigProvider,
    NListItem,
    NList,
    NAlert,
    NThing,
    NSelect,
    NMessageProvider,
    messageHandler,
    NLayoutSider,
    NMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
