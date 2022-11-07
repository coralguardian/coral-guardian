export default class GtagService {
  coralTag = "AW-962379492/tJtfCI3JwJoCEOT98soD";
  reefTag = "AW-962379492/kg71COCr2IwCEOT98soD";
  donationTag = "AW-962379492/RODNCK7buZoCEOT98soD";

  executeTag(element, mode) {
    this.installGtag()

    let tag;
    if (mode !== "adoption") {
      tag = this.donationTag
    } else {
      if (element.productType === "coral") {
        tag = this.coralTag
      } else {
        tag = this.reefTag
      }
    }
    // eslint-disable-next-line
    gtag('event', 'conversion', {
      'send_to': tag,
      'transaction_id': '',
      'value': element.price,
      'currency': "EUR",
      'event_callback': this.reportConversion
    });
    return false;
  }

  reportConversion(url) {
    return function () {
      if (typeof (url) != 'undefined') {
        window.location = url;
      }
    }
  }

  installGtag() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-28782686-1');
    gtag('config', 'AW-962379492');
  }
}
