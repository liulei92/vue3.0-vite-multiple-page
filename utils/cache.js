import axios from "axios"

var cache = {
    get : (key)=>{
        let str = window.localStorage.getItem(key)
        return JSON.parse(str) ?? null
    },
    set : (key, obj)=>{
        let str = JSON.stringify(obj)
        window.localStorage.setItem(key, str)
    },
    remove : (key)=>{
        window.localStorage.removeItem(key)
    },
    clear : ()=>{
        window.localStorage.clear()
    },

}

export default cache