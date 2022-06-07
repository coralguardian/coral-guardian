var $ = jQuery;
$(document).ready(function () {
  $('#coral-orders').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json"
      },
      "order": [1, 'desc'],
      dom: 'Bfrtip',
      buttons: [
        'pageLength',
        {
          // personnalisation du contenu du fichier csv pour ajouter les critères
          extend: 'csvHtml5',
          customize: function (csv) {
            var searchText = $('#coral-orders_filter input').val()
            return searchText ? "Critères de recherche utilisés : '" + searchText + "'\n\n"+  csv : csv;
          }
        }
      ]
    }
  );

  $('#coral-gift-codes').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json"
      },
      "code": [1, 'desc'],
      dom: 'Bfrtip',
      buttons: [
        'pageLength',
        {
          // personnalisation du contenu du fichier csv pour ajouter les critères
          extend: 'csvHtml5',
          customize: function (csv) {
            var searchText = $('#coral-orders_filter input').val()
            return searchText ? "Critères de recherche utilisés : '" + searchText + "'\n\n"+  csv : csv;
          }
        }
      ]
    }
  );
});