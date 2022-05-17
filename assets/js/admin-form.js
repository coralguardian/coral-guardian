var $ = jQuery;
$(document).ready(function () {

  $("#donation-type").on('change', function (item) {
    var recurrentDateBlock = $("#donation-recurrent-date-block")
    var uniqueDateBlock = $("#donation-unique-date-block")

    if ($(this).val() === "recurrent") {
      recurrentDateBlock.show()
      uniqueDateBlock.hide()
      $("#donation-recurrent-date-block input").each(function(input) {
        $(this).attr("required", "required")
      })
      $("#donation-unique-date-block input").attr("required", false)
    } else {
      recurrentDateBlock.hide()
      uniqueDateBlock.show()
      $("#donation-recurrent-date-block input").each(function(input) {
        $(this).attr("required", false)
      })
      $("#donation-unique-date-block input").attr("required", "required")
    }
  })

  $("#customer-type").on('change', function (item) {
    var companyNameBlock = $("#customer-company-name-block")
    if ($(this).val() === "company") {
      companyNameBlock.show()
      $("#customer-company-name-block input").attr("required", "required")
    } else {
      companyNameBlock.hide()
      $("#customer-company-name-block input").attr("required", false)
    }
  })

  $("#order-type").on('change', function (item) {
    var recipientsFileBlock = $("#block-file-recipients")
    // var adoptionsFileBlock = $("#block-file-adoptions")
    if ($(this).val() === "regular") {
      recipientsFileBlock.hide()
      // adoptionsFileBlock.show()
      // $("#block-file-adoptions input").attr("required", "required")
      $("#block-file-recipients input").attr("required", false)

    } else {
      recipientsFileBlock.show()
      // adoptionsFileBlock.hide()
      $("#block-file-recipients input").attr("required", "required")
      // $("#block-file-adoptions input").attr("required", false)

    }
  })
})