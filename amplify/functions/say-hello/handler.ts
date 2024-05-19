
function chechPersinalInformation() {
    var date = new Date();
    const unixTime = date.getTime()
    
    const message = (unixTime % 2 == 0) ? "個人情報が含まれます":"個人情報が含まれません"
    return message
    
}
export const handler = async (event) => {
    console.log(event);
    const message =  chechPersinalInformation()

    
    return {message: message};
  };