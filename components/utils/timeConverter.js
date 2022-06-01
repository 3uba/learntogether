const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



export const secondstoddmmyy = (s) => {
    let date = new Date(1970, 0, 1, 2)
    // strefy czasowe do zrobienia
    
    date.setSeconds(s)
    
    let now = new Date()

    if((now - date)/1000/60 < 60) {
        return (`${Math.round((now - date)/1000/60)} minutes ago`)
    } else if (((now - date)/1000)/60/60 < 24) {
        return (`${Math.round(((now - date)/1000)/60/60)} ${Math.round(((now - date)/1000)/60/60) != 1 ? "hours ago" : "hour ago"}`)
    }
    
    return (`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`)
}