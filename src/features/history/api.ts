import { history as entry } from '#content'

export const history = [...entry.items].sort((a, b) => b.year - a.year)
