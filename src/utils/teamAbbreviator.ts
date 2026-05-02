const teamAbbreviations = [
  { name: 'Arizona Diamondbacks', abbreviation: 'ARI' },
  { name: 'Atlanta Braves', abbreviation: 'ATL' },
  { name: 'Baltimore Orioles', abbreviation: 'BAL' },
  { name: 'Boston Red Sox', abbreviation: 'BOS' },
  { name: 'Chicago Cubs', abbreviation: 'CHC' },
  { name: 'Chicago White Sox', abbreviation: 'CHW' },
  { name: 'Cincinnati Reds', abbreviation: 'CIN' },
  { name: 'Cleveland Guardians', abbreviation: 'CLE' },
  { name: 'Colorado Rockies', abbreviation: 'COL' },
  { name: 'Detroit Tigers', abbreviation: 'DET' },
  { name: 'Houston Astros', abbreviation: 'HOU' },
  { name: 'Kansas City Royals', abbreviation: 'KCR' },
  { name: 'Los Angeles Angels', abbreviation: 'LAA' },
  { name: 'Los Angeles Dodgers', abbreviation: 'LAD' },
  { name: 'Miami Marlins', abbreviation: 'MIA' },
  { name: 'Milwaukee Brewers', abbreviation: 'MIL' },
  { name: 'Minnesota Twins', abbreviation: 'MIN' },
  { name: 'New York Mets', abbreviation: 'NYM' },
  { name: 'New York Yankees', abbreviation: 'NYY' },
  { name: 'Oakland Athletics', abbreviation: 'OAK' },
  { name: 'Philadelphia Phillies', abbreviation: 'PHI' },
  { name: 'Pittsburgh Pirates', abbreviation: 'PIT' },
  { name: 'San Diego Padres', abbreviation: 'SDP' },
  { name: 'San Francisco Giants', abbreviation: 'SFG' },
  { name: 'Seattle Mariners', abbreviation: 'SEA' },
  { name: 'St. Louis Cardinals', abbreviation: 'STL' },
  { name: 'Tampa Bay Rays', abbreviation: 'TBR' },
  { name: 'Texas Rangers', abbreviation: 'TEX' },
  { name: 'Toronto Blue Jays', abbreviation: 'TOR' },
  { name: 'Washington Nationals', abbreviation: 'WSN' },
];

export function teamAbbreviator(teamName: string) {
  const formattedTeam = teamAbbreviations.find((d) => d.name === teamName);
  return formattedTeam?.abbreviation;
}
