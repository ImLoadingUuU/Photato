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
               <n-icon>
                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M4 4.75A.75.75 0 0 1 4.75 4h12.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V5.5h-4.75v8.966A6.471 6.471 0 0 0 11 17.5c0 .886.177 1.73.498 2.5H8.75a.75.75 0 0 1 0-1.5h1.5v-13H5.5v1.25a.75.75 0 0 1-1.5 0v-2zM23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0zm-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1H18z" fill="currentColor"></path></g></svg>
               </n-icon>
             </n-button>
             <n-button>
               <n-icon>
                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm4.5 2.5h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2a.5.5 0 1 0 0-1h-2v-2a.5.5 0 0 0-1 0v2zm4 6.5a2.5 2.5 0 0 0 2.5-2.5V3.268A2 2 0 0 1 14 5v5.5a3.5 3.5 0 0 1-3.5 3.5H5a2 2 0 0 1-1.732-1H10.5z" fill="currentColor"></path></g></svg>
               </n-icon>
             </n-button>
             <n-button @click="uploadModal = true">
               <n-icon>
                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" fill="currentColor"></path></svg>
               </n-icon>
             </n-button>


           </n-button-group>
         </n-card>
       </n-grid-item>

       <n-grid-item>
         <n-card title="Action">
           <n-button-group>
             <n-button @click="deleteObject" type="error">
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path><path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path><path d="M12 2h8v2h-8z" fill="currentColor"></path></svg>
              </n-icon>
             </n-button>
             <n-button @click="saveData" >
               <n-icon>
                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1V9.5A1.5 1.5 0 0 1 5.5 8h5A1.5 1.5 0 0 1 12 9.5V13a1 1 0 0 0 1-1V5.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 10.379 3H10v1.5A1.5 1.5 0 0 1 8.5 6h-2A1.5 1.5 0 0 1 5 4.5V3H4zm2 0v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3H6zm5 10V9.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V13h6zM2 4a2 2 0 0 1 2-2h6.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 14 5.621V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z" fill="currentColor"></path></g></svg>
               </n-icon>
             </n-button>

           </n-button-group>
         </n-card>
       </n-grid-item>
     </n-grid>
     <canvas id="canvas" width="500px" height="500px" style="border: solid;">

     </canvas>
   </n-layout>
    <!--Modals-->
    <n-modal v-model:show="uploadModal">
      <n-card
          title="Upload Files"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
          style="width: 600px"
      >
        <template #header-extra>
          Click outside the modal to close.
        </template>
        <n-tabs type="line" animated>
          <n-tab-pane name="offline" tab="Upload Offline">
           <n-alert type="warning" title="LocalStorage Has Size Limit" >
             As Browser Types,LocalStorage has different Limit. you must set Storage limit to "Unlimited" to Upload Big Files

           </n-alert>
          </n-tab-pane>
          <n-tab-pane name="online" tab="Upload to Online">
            Upload to imgur
            <n-upload
              multiple
              directory-dnd

              :custom-request="uploadImage"
              :max="5"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M14 19h4v2h-4z" fill="currentColor"></path><path d="M6 2v26a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2zm18 26H8V16h16zm0-14H8v-4h16zM8 8V4h16v4z" fill="currentColor"></path></svg>
                </n-icon>
              </div>
              <n-text style="font-size: 16px">
                Drop files here to upload or click
              </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                Don't send your secrets,like credit card. because if you upload it i will steal it.
              </n-p>
            </n-upload-dragger>
          </n-upload>
          </n-tab-pane>
          <n-tab-pane name="url" tab="Insert From URL">
            <n-input placeholder="URL Here"></n-input>
          </n-tab-pane>

        </n-tabs>

        <template #footer>
          Drag your files to here
        </template>
      </n-card>
    </n-modal>
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
import {  NAlert,NTabPane,NTabs,NIcon,NButton , darkTheme,NConfigProvider,NButtonGroup,NCard,NGrid,NGridItem,NLayout,NMessageProvider,NResult,NModal, NUpload,NUploadDragger} from 'naive-ui'
import messageHandler from './components/content'
import axios from 'axios'
import { fabric } from 'fabric'
let canvas = undefined
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};


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
    NModal,
    NIcon,
    NUpload,
    NUploadDragger,
    NTabs,
    NTabPane,
    NAlert

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

    },
    uploadImage(item){
      window.$message.info('Uploading...')
      console.log(item)
       item.onProgress({percent: 10})
        convertBase64(item.file.file).then((data) => {
          console.log(data)
          axios({
            method: "POST",
            url: "https://MTBExtendedAPI.imloadinguuu.repl.co/uploadImage",
            data: { image: data.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "") },


          }).then((res) => {
           let data = res.data.data
            console.log(res)
            item.onFinish()
            window.$message.success(`Uploaded! Delete Hash: ${res.data.data.deletehash} Delete Hash is Important if you want delete asset`,{ duration: 10000 })
            fabric.Image.fromURL(data.link, function(myImg) {
              //i create an extra var for to change some image properties
              var img1 = myImg.set({ left: 100, top: 100, angle: 0 })
             canvas.add(img1)
            })

            //

          })
              .catch((err) => {
                console.log(err)
                item.onError()

                window.$message.error(err.response.data.data.error)
              })
        }).catch((err) => {
          console.log(err)
          item.onError()
          window.$message.error('Upload Failed')
        })


    }
  },
  data() {
    return {
      theme: darkTheme,
      success: true,
      errorModal: false,
      uploadModal: false,
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
