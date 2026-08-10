'use client'
export const StepWrapper = ({
	step,
	current,
	children,
}: {
	step: number
	current: number
	children: ReactNode
}) => {
	return step == current && <>{children}</>
}
