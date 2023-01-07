const formatYMDate = (theDateStr)=>{
    let theDate = new Date(theDateStr)
    return `${theDate.getFullYear()}年${theDate.getMonth()+1}月`
}

const formatYMDDate = (theDateStr)=>{
    let theDate = new Date(theDateStr)
    return `${theDate.getFullYear()}年${theDate.getMonth()+1}月${theDate.getDate()}日`
}

const formatYMDateSimple = (theDateStr)=>{
    let theDate = new Date(theDateStr)
    return `${theDate.getFullYear()}.${theDate.getMonth()+1}`
}

const CountDownDay = (endDateStr)=>{
    let endDate = new Date(endDateStr).getTime()
    let now = new Date().getTime()
    return Math.floor((endDate - now) / 1000 / 60 / 60 / 24)
}

export {formatYMDate, formatYMDateSimple, formatYMDDate, CountDownDay}