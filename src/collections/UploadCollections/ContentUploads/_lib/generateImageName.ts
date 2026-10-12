import type { GenerateImageName } from 'payload'

export const generateImageName: GenerateImageName = ({ sizeName, extension, originalName }) =>
  `${originalName}-${sizeName}.${extension}`
