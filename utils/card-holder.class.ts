import { Card } from './card.class'

export class CardColumm {
	cards: Card[] = []

	constructor() {
		this.cards = []
	}
}

export class CardHolder {
	columns: CardColumm[] = []

	constructor(length: number) {
		for (let i = 0; i < length; i++) {
			this.columns[i] = new CardColumm()
		}
	}

	clear() {
		for (let i = 0; i < this.columns.length; i++) {
			this.columns[i].cards = []
		}
	}
}
