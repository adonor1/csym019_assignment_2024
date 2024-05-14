// Assuming league.json is available at the same location as the HTML file
fetch('league.json')
  .then(response => response.json())
  .then(data => {
    populateTable(data.fixtures);
  })
  .catch(error => console.error('Error fetching league.json:', error));

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
      <td class="form">${team.form.join(' ')}</td>
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
