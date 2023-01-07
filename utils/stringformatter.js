const subStr = (str, count)=>{
    if(str.length <= count){
        return str
    }else{
        return str.slice(0,count) + '...'
    }
}

export {subStr}