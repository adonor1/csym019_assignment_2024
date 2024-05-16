// Function to fetch and populate league table and fixtures
function fetchAndPopulateLeagueData() {
  $.ajax({
    url: 'league.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      if (document.getElementById('plTbody')) {
        populateTable(data.fixtures);
      }
      if (document.getElementById('fixturesByMonth')) {
        populateFixtures(data.fixtures);
      }
      if (document.getElementById('top_scorers_table')) {
        populateTopScorers(data.fixtures);
      }
    },
    error: function(error) {
      console.error('Error fetching league.json:', error);
    }
  });
}

function populateTable(fixtures) {
  const plTbody = document.getElementById('plTbody');
  plTbody.innerHTML = ''; // Clear any existing rows

  // Create a map to accumulate team stats
  const teamStats = {};

  // Process each fixture
  fixtures.forEach(fixture => {
    const { home_team, away_team, home_score, away_score } = fixture;

    if (!teamStats[home_team]) {
      teamStats[home_team] = createNewTeamStats(home_team);
    }
    if (!teamStats[away_team]) {
      teamStats[away_team] = createNewTeamStats(away_team);
    }

    updateTeamStats(teamStats[home_team], home_score, away_score);
    updateTeamStats(teamStats[away_team], away_score, home_score);
  });

  // Convert the teamStats object to an array and sort it by points, goal difference, and goals for
  const sortedTeams = Object.values(teamStats).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
    return b.goals_for - a.goals_for;
  });

  // Populate the table with sorted team stats
  sortedTeams.forEach((team, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="team">${team.name}</td>
      <td>${team.played}</td>
      <td>${team.won}</td>
      <td>${team.drawn}</td>
      <td>${team.lost}</td>
      <td>${team.goals_for}</td>
      <td>${team.goals_against}</td>
      <td>${team.goal_difference}</td>
      <td>${team.points}</td>
      <td class="form">${formatForm(team.form)}</td>
    `;
    plTbody.appendChild(row);
  });
}

function createNewTeamStats(teamName) {
  return {
    name: teamName,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goals_for: 0,
    goals_against: 0,
    goal_difference: 0,
    points: 0,
    form: [] // Track the last 5 match outcomes
  };
}

function updateTeamStats(team, goals_for, goals_against) {
  team.played++;
  team.goals_for += goals_for;
  team.goals_against += goals_against;
  team.goal_difference = team.goals_for - team.goals_against;

  if (goals_for > goals_against) {
    team.won++;
    team.points += 3;
    team.form.unshift('W'); // Win
  } else if (goals_for < goals_against) {
    team.lost++;
    team.form.unshift('L'); // Loss
  } else {
    team.drawn++;
    team.points += 1;
    team.form.unshift('D'); // Draw
  }

  // Keep only the last 5 match outcomes
  if (team.form.length > 5) {
    team.form.pop();
  }
}

function populateFixtures(fixtures) {
  const fixturesContainer = document.getElementById('fixturesByMonth');
  fixturesContainer.innerHTML = ''; // Clear any existing content

  const fixturesByMonth = {};

  fixtures.forEach(fixture => {
    const [day, month, year] = fixture.date.split('-');
    const monthYear = `${month}/${year}`;
    if (!fixturesByMonth[monthYear]) {
      fixturesByMonth[monthYear] = [];
    }
    fixturesByMonth[monthYear].push(fixture);
  });

  Object.keys(fixturesByMonth).forEach(monthYear => {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';

    const monthHeading = document.createElement('h3');
    monthHeading.textContent = monthYear;
    monthDiv.appendChild(monthHeading);

    const table = document.createElement('table');
    table.className = 'fixtures-table pl-results';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Date</th>
          <th>Home Team</th>
          <th>Home Score</th>
          <th>Away Score</th>
          <th>Away Team</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');

    fixturesByMonth[monthYear].forEach(fixture => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${fixture.date}</td>
        <td>${fixture.home_team}</td>
        <td>${fixture.home_score}</td>
        <td>${fixture.away_score}</td>
        <td>${fixture.away_team}</td>
      `;
      tbody.appendChild(row);
    });

    monthDiv.appendChild(table);
    fixturesContainer.appendChild(monthDiv);
  });
}

function populateTopScorers(fixtures) {
  const topScorersTable = document.getElementById('top_scorers_table');
  topScorersTable.innerHTML = ''; // Clear any existing rows

  const playerGoals = {};

  fixtures.forEach(fixture => {
    fixture.home_goals.forEach(player => {
      if (!playerGoals[player]) playerGoals[player] = { name: player, team: fixture.home_team, goals: 0 };
      playerGoals[player].goals += 1;
    });

    fixture.away_goals.forEach(player => {
      if (!playerGoals[player]) playerGoals[player] = { name: player, team: fixture.away_team, goals: 0 };
      playerGoals[player].goals += 1;
    });
  });

  const sortedPlayers = Object.values(playerGoals).sort((a, b) => b.goals - a.goals);

  sortedPlayers.forEach((player, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="name">${player.name}</td>
      <td>${player.team}</td>
      <td>${player.goals}</td>
    `;
    topScorersTable.appendChild(row);
  });
}

function formatForm(form) {
  return form.map(result => {
    if (result === 'W') {
      return '<span class="form-box win">W</span>';
    } else if (result === 'L') {
      return '<span class="form-box loss">L</span>';
    } else {
      return '<span class="form-box draw">D</span>';
    }
  }).join('');
}

// Fetch and populate data on page load and then every 3 seconds
$(document).ready(function() {
  fetchAndPopulateLeagueData();
  setInterval(fetchAndPopulateLeagueData, 3000); // Fetch and update data every 3 seconds
});
