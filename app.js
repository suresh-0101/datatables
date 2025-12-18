
let table ="";
$(document).ready(function () {

    table = $('#dataTable').DataTable({
        dom: '<"top"lfB>rt<"bottom"ip><"clear">',
        buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export Excel',
                className: 'dt-btn-excel'
            }
        ],
        data: [],
        columns: [
            { data: 'name' },
            { data: 'email' },
            { data: 'city' }
        ]
    });

// Move DataTables buttons next to search bar
    $(".dt-buttons").appendTo("#dataTable_filter");

// ⭐ Add your custom button "Fulfillment" next to search box
    $("#dataTable_filter").append(
        '<button id="fulfillmentBtn" class="dt-btn-fulfillment">Fulfillment</button>'
    );



});

$('#myTable tbody').on('click', 'tr', function () {
    var rowData = table.row(this).data();
    console.log(rowData);
    alert('Clicked: ' + rowData.name);
});

function loadTable(data) {

    let query = $("#queryParam").val();

    // AJAX call
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        type: "GET",
        dataType: "json",
        data: { q: query }, // send query param
        success: function (response) {

            // Transform API result into table rows
            let formatted = response.map(item => ({
                name: item.name,
                email: item.email,
                city: item.address.city
            }));

            // Update DataTable
            table.clear();
            table.rows.add(formatted);
            table.draw();
        },
        error: function (err) {
            console.error("API Error:", err);
            alert("Failed to load data.");
        }
    });

    alert("hi");
}

