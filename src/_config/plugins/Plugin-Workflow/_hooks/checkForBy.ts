export const checkForBy = ({
  baseSlug,
  changedBy,
  bySystem,
}: {
  baseSlug: string
  changedBy?: number
  bySystem?: boolean
}) => {
  if (!changedBy && !bySystem)
    throw new Error(
      `Plugin-Workflow: a save on '${baseSlug}' has no user and did not declare \`bySystem\`.`
    )
}
