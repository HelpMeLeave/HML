export const flattenTeamNames = (teams: { teamNameString?: string[] | null }[]) =>
  teams
    .flatMap((team) => team.teamNameString)
    .filter(Boolean)
    .map((team) => team?.toLowerCase())
