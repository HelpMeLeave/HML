declare global {
	// eslint-disable-next-line
	type AnySafe = any
	type AnyObject = Record<string, AnySafe>
	type Sub<T, Target extends keyof T, NewType> = Omit<T, Target> & {
		[key in Target]: NewType
	}

	type Todo = AnySafe

	type Slug<V> = {
		params: Promise<V>
	}

	interface Window {
		db: typeof import('~/server/db/db').default
	}
}

export {}
