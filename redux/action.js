export const  userAction = (data) => {
    console.log("Does this work as well??")
    return {
        type:'USERLOGGED',
        data:data
    }
}