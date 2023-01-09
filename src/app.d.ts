// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		employee: {
			name: string,
			employeeId: number,
		}
		company: {
			name: string,
			id: number
		}
		role: {
			id: number,
			isAdmin: boolean
		}
	}
	// interface PageData {}
	// interface Error { }
	// interface Platform {}
}
