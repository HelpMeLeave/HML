import type { NavSection } from '@/components/Navigation/_types'

export const PLACEHOLDER_SECTIONS: NavSection[] = [
  {
    slug: 'explorer',
    url: '/explorer',
    text: 'Explore',
    children: [
      {
        url: '/map',
        text: 'World Map',
        summary: 'Entry requirements and current conditions, country by country.',
      },
      {
        url: '/',
        text: 'Visa Explorer',
        summary: 'Filter routes by passport, budget, timeline and dependants.',
      },
      {
        url: '/',
        text: 'Compare Destinations',
        summary: 'Put two or three options side by side on the things that matter.',
      },
      {
        url: '/',
        text: 'Cost of Living',
        summary: 'What it actually costs to land and stay for the first six months.',
      },
    ],
  },
  {
    slug: 'get-involved',
    text: 'Get Involved',
    children: [
      {
        url: '/guides/before-you-go',
        text: 'Before You Go',
        summary: 'The decisions that are far harder to reverse once you have moved.',
      },
      {
        url: '/guides/documents',
        text: 'Documents & Paperwork',
        summary: 'What to gather, what to certify, and what to keep copies of.',
      },
      {
        url: '/guides/at-the-border',
        text: 'At the Border',
        summary: 'Your rights at a crossing, and what to do if they are not honoured.',
      },
      {
        url: '/guides/settling-in',
        text: 'Settling In',
        summary: 'Banking, housing, healthcare and school enrolment in the first month.',
      },
      {
        url: '/guides/asylum',
        text: 'Asylum & Protection',
        summary: 'How protection claims work, and where to find real legal help.',
      },
    ],
  },
  {
    slug: 'resources',
    url: '/guides-resources',
    text: 'Resources',
    children: [
      {
        url: 'https://discord.gg/TcHKRgED6y',
        text: 'Discord Community',
        summary: 'Ask questions and compare notes with others who are in this with you.',
      },
      {
        url: '/guides-resources',
        text: 'The Library',
        summary:
          'Guides and resources designed to help you navigate your needs ands to empower your journey',
      },
      {
        url: '/community/local-groups',
        text: 'Local Groups',
        summary: 'Diaspora and arrival networks organised by city.',
      },
      {
        url: '/community/mutual-aid',
        text: 'Mutual Aid',
        summary: 'Practical help offered and requested, without a means test.',
      },
    ],
  },
  {
    url: '/support',
    slug: 'support',
    text: 'Reach Out',
    children: [
      {
        url: '/support',
        text: 'Support',
        summary: 'One-to-one support from someone who has done this before.',
      },
      {
        url: 'https://discord.gg/TcHKRgED6y',
        text: 'Discord Community',
        summary: 'Ask questions and compare notes with others who are in this with you.',
      },
      {
        url: '/leave',
        text: 'Get Ready to Leave',
        summary: 'What we think you should know to get started in your journey',
      },
    ],
  },
  {
    slug: 'about',
    text: 'About Us',
    children: [
      {
        url: '/our-mission',
        text: 'Our Mission',
        summary: 'What we do and why we do it',
      },
      {
        url: '/media-press',
        text: 'Media & Press',
        summary: '-',
      },
    ],
  },
]
