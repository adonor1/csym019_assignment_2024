$(document).ready(function() {
    // Fetch Fixtures
    function fetchFixtures() {
        $.ajax({
            url: 'FetchFixtures.php',
            method: 'GET',
            success: function(data) {
                $('#fixturesTbody').html(data);
                addEditAndDeleteEvents();
            }
        });
    }

    // Add Edit and Delete Events for Fixtures
    function addEditAndDeleteEvents() {
        $('.edit-btn').click(function() {
            var row = $(this).closest('tr');
            $('#match_date').val(row.find('.match_date').text());
            $('#fixture').val(row.find('.fixture').text());
            $('#home_team').val(row.find('.home_team').text());
            $('#home_goal').val(row.find('.home_goal').text());
            $('#away_team').val(row.find('.away_team').text());
            $('#away_goal').val(row.find('.away_goal').text());
            $('#matchForm').data('id', row.data('id')); // Store the ID in the form
        });

        $('.delete-btn').click(function() {
            var id = $(this).closest('tr').data('id');
            if (confirm('Are you sure you want to delete this record?')) {
                $.ajax({
                    url: 'DeleteFixture.php',
                    method: 'POST',
                    data: { id: id },
                    success: function(response) {
                        alert(response);
                        fetchFixtures();
                    }
                });
            }
        });
    }

    // Submit Form for Adding or Updating Fixtures
    $('#matchForm').submit(function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        var url = id ? 'UpdateFixture.php' : 'UploadForm.php';
        $.ajax({
            url: url,
            method: 'POST',
            data: $(this).serialize() + (id ? '&id=' + id : ''),
            success: function(response) {
                alert(response);
                fetchFixtures();
                $('#matchForm')[0].reset();
                $('#matchForm').removeData('id'); // Clear the stored ID
            }
        });
    });

    // Fetch League Table
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

    // Add Delete Event for League Table
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

    // Sort League Table by Points
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

    // Create Pie Chart
    function createPieChart(wins, losses, draws, remaining) {
        var ctx = document.getElementById('pieChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Wins', 'Losses', 'Draws', 'Remaining'],
                datasets: [{
                    data: [wins, losses, draws, remaining],
                    backgroundColor: ['#4CAF50', '#F44336', '#FFC107', '#2196F3']
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    // Create Bar Chart
    function createBarChart(teamsData) {
        var ctx = document.getElementById('barChart').getContext('2d');
        var labels = teamsData.map(team => team.name);
        var wins = teamsData.map(team => team.wins);
        var losses = teamsData.map(team => team.losses);
        var draws = teamsData.map(team => team.draws);
        var remaining = teamsData.map(team => team.remaining);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Wins',
                        data: wins,
                        backgroundColor: '#4CAF50'
                    },
                    {
                        label: 'Losses',
                        data: losses,
                        backgroundColor: '#F44336'
                    },
                    {
                        label: 'Draws',
                        data: draws,
                        backgroundColor: '#FFC107'
                    },
                    {
                        label: 'Remaining',
                        data: remaining,
                        backgroundColor: '#2196F3'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });
    }

    // Create Report Button Click Event
    $('#createReportBtn').click(function() {
        var selectedTeams = [];
        $('.teamCheckbox:checked').each(function() {
            var row = $(this).closest('tr');
            var teamData = {
                name: row.find('td').eq(3).text(),
                played: parseInt(row.find('td').eq(4).text()),
                wins: parseInt(row.find('td').eq(5).text()),
                draws: parseInt(row.find('td').eq(6).text()),
                losses: parseInt(row.find('td').eq(7).text()),
                remaining: 38 - parseInt(row.find('td').eq(4).text()) // Assuming 38 games in a season
            };
            selectedTeams.push(teamData);
        });

        if (selectedTeams.length === 0) {
            alert('Please select at least one team.');
            return;
        }

        var totalWins = selectedTeams.reduce((acc, team) => acc + team.wins, 0);
        var totalLosses = selectedTeams.reduce((acc, team) => acc + team.losses, 0);
        var totalDraws = selectedTeams.reduce((acc, team) => acc + team.draws, 0);
        var totalRemaining = selectedTeams.reduce((acc, team) => acc + team.remaining, 0);

        createPieChart(totalWins, totalLosses, totalDraws, totalRemaining);
        createBarChart(selectedTeams);
    });

    // Initialize Functions
    fetchFixtures();
    fetchLeagueTable();
    $("#selectAll").click(function() {
        $("input[type=checkbox]").prop("checked", this.checked);
    });
});
