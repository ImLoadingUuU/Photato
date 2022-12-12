// will use later
import axios from 'axios'
let mtb = {}

mtb.uploadImageToImgur = (base64,callback,onError) => {
    axios({
        method: "POST",
        url: "https://MTBExtendedAPI.imloadinguuu.repl.co/uploadImage",
        data: { image: base64.replace(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/, "") },
    }).then(callback).catch(onError)

}
export default  mtb

