const mapping: Record<string, string> = {
  accounts: 'account',
  analyses: 'analysis',
  'chess-positions': 'chess_position',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
