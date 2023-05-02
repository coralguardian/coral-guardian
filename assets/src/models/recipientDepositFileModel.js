export default class RecipientDepositFileModel {
  constructor(data) {
    let formData = new FormData();

    if (!data.gift.file) {
      console.error("Missing recipients file");
      return
    }

    formData.append("recipient_file", data.gift.file);

    if (data.gift.message) {
      formData.append("message", data.gift.message)
    }

    if (data.gift.toSendOn) {
      formData.append("sendOn", data.gift.toSendOn.replaceAll("-", ""))
    }

    return formData
  }
}
