<template>
  <n-message-provider>
    <message-handler/>
  </n-message-provider>
  <n-layout v-if="!success">
    <n-result
        status="error"
        title="Failed to Load Project"
        description="File Structure Corrupted. You can only fix it by yourself or delete project data"
    >
      <template #footer>
        <n-button type="error" @click="errorModal = true">Delete Project</n-button>
      </template>
    </n-result>
  </n-layout>
  <n-config-provider :theme="theme" v-if="success" >


   <n-layout style="height: 100vh">
     <br>
     <n-grid  x-gap="12"  cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
       <n-grid-item>
         <n-card title="Create Objects">
           <n-button-group>
             <n-button @click="createText()">
               Create Text
             </n-button>
             <n-button>
               Create Shape
             </n-button>


           </n-button-group>
         </n-card>
       </n-grid-item>
       <n-grid-item>
         <n-card title="High Light! 💡">
           <n-button-group>
             <n-button>
               Bold
             </n-button>
             <n-button>
               Background Color
             </n-button>

           </n-button-group>
         </n-card>
       </n-grid-item>
       <n-grid-item>
         <n-card title="Action">
           <n-button-group>
             <n-button @click="deleteObject" type="error">
               Delete Object
             </n-button>
             <n-button @click="saveData" >
               Save
             </n-button>

           </n-button-group>
         </n-card>
       </n-grid-item>
     </n-grid>
     <canvas id="canvas" width="500px" height="500px" style="border: solid;">

     </canvas>
   </n-layout>
  </n-config-provider>
  <n-modal
      v-model:show="errorModal"
      preset="dialog"
      title="Confirm to Delete"
      content="Are you sure? Your Project Data will be delete forever. You can't undo this action. x"
      positive-text="Sure"
      negative-text="No.."
      @positive-click="deleteProject"
      @negative-click="errorModal = false"
  />
</template>
<script>
import { NButton , darkTheme,NConfigProvider,NButtonGroup,NCard,NGrid,NGridItem,NLayout,NMessageProvider,NResult,NModal} from 'naive-ui'
import messageHandler from './components/content'
import { fabric } from 'fabric'
let canvas = undefined


export default {
  name: 'IMGEditor',

  components: {
    NButton,
    NButtonGroup,
    NConfigProvider,
    NCard,
    NGrid,
    NGridItem,
    NLayout,
    NMessageProvider,
    messageHandler,
    NResult,
    NModal

  },
  methods: {
    createText(){
      let it = new fabric.IText('Text Here.', { left: 100, top: 100 })
      it.set({fill: "#fff"})
      canvas.add(it)
    },
    saveData(){
      window.$message.info('Saving...')
      let data = canvas.toJSON()
      window.$message.info('Converted to JSON Format')
      window.localStorage.setItem(this.$route.query.project,JSON.stringify(data))
      window.$message.info('Saved to Local Storage')
    },
    deleteObject(){

      let active= canvas.getActiveObject()
      if (active !== null) {

        if (active.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          active.canvas = canvas;
          active.forEachObject(function(obj) {
            canvas.remove(obj);
          });
          window.$message.success('Deleted Objects')
        } else {

          canvas.remove(canvas.getActiveObject())
          window.$message.success('Deleted Object')
        }
      } else {
        window.$message.warning('Please Select An Object to Delete!')
      }

    },
    deleteProject(){
      window.localStorage.removeItem(this.$route.query.project)
      window.$message.success('Deleted Project')

    }
  },
  data() {
    return {
      theme: darkTheme,
      success: true,
      errorModal: false
    }
  },
  mounted() {
    canvas = new fabric.Canvas("canvas",{
      width: 500,
      height: 500,
    })
    let it = new fabric.IText('Hello World', { left: 100, top: 100 })
    it.set({fill: "#fff"})
    canvas.add(it)
    console.log(this.$route)

    if (!window.localStorage.getItem(this.$route.query.project)){
      console.log("Seems Project Data not found")
      window.$message.info('Project Data Not Found,Creating...')

      window.localStorage.setItem(this.$route.query.project,JSON.stringify(canvas.toJSON()))
      window.$message.success('Project Created - Version:' + canvas.version)
    } else {
      let item = window.localStorage.getItem(this.$route.query.project)
      window.$message.info("Loading your Project")
     try {
       canvas.loadFromJSON(JSON.parse(item),function(){
         window.$message.success('Project Loaded')
       })
     } catch {
       window.$message.error('Project Failed to Load - File Structure Corrupted')
       this.success =false
     }

    }
  }


}
</script>
