import {
  Subsection,
  SubsectionContent,
  SubsectionHeading,
} from '@/components/Structure/Subsection/Subsection'

export const Wrapper = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <Subsection
      className='basis-full'
      heading={title}>
      <SubsectionHeading>{title}</SubsectionHeading>
      <SubsectionContent>{children}</SubsectionContent>
    </Subsection>
  )
}
