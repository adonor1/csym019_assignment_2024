$(document).ready(function() {
    $("#selectAll").click(function() {
        $("input[type=checkbox]").prop("checked", this.checked);
    });

    function fetchLeagueTable() {
        $.ajax({
            url: 'FetchLeagueTable.php',
            method: 'GET',
            success: function(data) {
                $('#plTbody').html(data);
                addDeleteEvent();
                sortTable();
            }
        });
    }

    function addDeleteEvent() {
        $('.delete-btn').click(function() {
            var row = $(this).closest('tr');
            var id = row.find('.teamCheckbox').val();
            if (confirm('Are you sure you want to delete this record?')) {
                $.ajax({
                    url: 'DeleteTeam.php',
                    method: 'POST',
                    data: { id: id },
                    success: function(response) {
                        alert(response);
                        fetchLeagueTable();
                    }
                });
            }
        });
    }

    function sortTable() {
        var rows = $('#plTbody tr').get();

        rows.sort(function(a, b) {
            var pointsA = parseInt($(a).children('td').eq(11).text());
            var pointsB = parseInt($(b).children('td').eq(11).text());

            return pointsB - pointsA;
        });

        $.each(rows, function(index, row) {
            $(row).children('td').eq(1).text(index + 1);
            $('#plTbody').append(row);
        });
    }

    fetchLeagueTable();
});
