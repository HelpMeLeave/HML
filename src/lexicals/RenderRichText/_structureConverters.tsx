import { Heading } from '@/components/primitives'
import { MainHeading } from '@/components/Structure/Main'
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionHGroup,
  SectionSubtitle,
} from '@/components/Structure/Section'
import { SectionCover } from '@/components/Structure/SectionCover'
import {
  Subsection,
  SubsectionContent,
  SubsectionHeading,
} from '@/components/Structure/Subsection/Subsection'
import { headingID } from '@/lexicals/Features/_lib/slugifyHeadingID'
import { coverOf, isUpload } from '@/lexicals/Features/Duotone/_lib/coverOf'
import { childOf, NTK, type Comp, type StyledContainer } from '@/lexicals/RenderRichText/_lib'
import type { JSXConverter } from '@payloadcms/richtext-lexical/react'
import { Fragment } from 'react'

export const structureConverters: Record<string, JSXConverter<AnySafe>> = {
  // #region ! ---------- SECTION ----------
  'section-container': (props) => {
    const { node, nodesToJSX } = props
    // swapped look: keeps its h2 but renders as a collapsible subsection, without eyebrow, subtitle or cover
    if ((node as StyledContainer).sectionHeadingStyle == 'subsection') {
      const heading = childOf(childOf(node, 'section-hgroup'), 'section-heading')
      return (
        <Subsection variant='subsection'>
          <SubsectionHeading level={2}>
            <span id={heading && headingID(heading)}>
              {nodesToJSX({ nodes: heading?.children ?? [] })}
            </span>
          </SubsectionHeading>
          <SubsectionContent>
            {nodesToJSX({ nodes: childOf(node, 'section-content')?.children ?? [] })}
          </SubsectionContent>
        </Subsection>
      )
    }

    return NTK<typeof Section>(Section, props, {
      // @ts-expect-error non-standard attribute
      'data-slot': 'section',
      'data-variant': 'section',
      className: 'flow',
    })
  },
  'section-hgroup': ({ node, nodesToJSX }) => {
    const cover = coverOf(node)

    if (!cover) {
      return isUpload(node.children[0]) ?
          <SectionHGroup>{nodesToJSX({ nodes: node.children.slice(1) })}</SectionHGroup>
        : NTK(SectionHGroup, { node, nodesToJSX })
    }

    return (
      <SectionCover
        node={node}
        nodesToJSX={nodesToJSX}
        cover={cover}
      />
    )
  },
  'section-heading': ({ node, nodesToJSX }) => {
    return (
      <SectionHeading id={headingID(node)}>{nodesToJSX({ nodes: node.children })}</SectionHeading>
    )
  },
  'section-subtitle': (props) => props.node.children && NTK(SectionSubtitle, props),
  'section-eyebrow': (props) => props.node.children && NTK(SectionEyebrow, props),
  'section-content': (props) => NTK(Fragment, props),
  // #endregion ! --------------------
  // ------------------------------------------------------------
  // #region ! ---------- TOGGLING SUBSECTION ----------
  'subsection-container': (props) => {
    const { node, nodesToJSX } = props

    const style = (node as StyledContainer).subsectionHeadingStyle

    // stepped down: keeps its h3 with the H4 look, content always shown
    // if (style == 'h4') {
    if (style == 'minor' || style == 'h4') {
      const heading = childOf(node, 'subsection-heading')
      return (
        <section
          data-slot='subsection'
          // data-style='h4-heading'
          data-variant='minor'
          // className=':mt-8 my-4 sm:pl-6'>
          className='flow sm:pl-6'>
          <Heading
            level={3}
            // look={4}
            variant='minor'
            id={heading && headingID(heading)}>
            {nodesToJSX({ nodes: heading?.children ?? [] })}
          </Heading>
          {nodesToJSX({ nodes: childOf(node, 'subsection-content')?.children ?? [] })}
        </section>
      )
    }

    // stepped up: keeps its h3 but renders as an always-open section
    if (style == 'section') {
      const heading = childOf(node, 'subsection-heading')
      return (
        <Section
          data-slot='section'
          // data-style='section'>
          data-variant='section'
          className='flow'>
          <SectionHGroup>
            <SectionHeading
              level={3}
              id={heading && headingID(heading)}>
              {nodesToJSX({ nodes: heading?.children ?? [] })}
            </SectionHeading>
          </SectionHGroup>
          {nodesToJSX({ nodes: childOf(node, 'subsection-content')?.children ?? [] })}
        </Section>
      )
    }

    return NTK<typeof Subsection>(Subsection, props)
  },
  'subsection-heading': ({ node, nodesToJSX }) => (
    <SubsectionHeading>
      <span id={headingID(node)}>{nodesToJSX({ nodes: node.children })}</span>
    </SubsectionHeading>
  ),
  'subsection-content': (props) => NTK(SubsectionContent, props),
  // #endregion ! --------------------
  // ------------------------------------------------------------
  // #region ! ---------- HEADINGS ----------
  h4: ({ node, nodesToJSX }) => nodesToJSX({ nodes: [{ ...node, type: 'heading', tag: 'h4' }] }),
  heading: ({ node, nodesToJSX }) => {
    let El: Comp<'h1'> | Comp<'button'>
    const lvl = Number(node.tag[1])
    const props = {
      id: headingID(node),
      level: lvl > 3 ? lvl : undefined,
    }
    switch (node.tag) {
      case 'h1':
        El = MainHeading as Comp<'h1'>
        break
      case 'h2':
        El = SectionHeading as Comp<'h1'>
        break
      case 'h3':
        El = SubsectionHeading as Comp<'button'>
        break
      default:
        El = Heading
    }
    return <El {...props}>{nodesToJSX({ nodes: node.children })}</El>
  },
  // #endregion ! --------------------
}
