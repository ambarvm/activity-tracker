import * as activeWin from 'active-win';
import { EventEmitter } from 'events';
import { basename } from 'path';
import { setInterval } from 'timers';

export class WindowObserver extends EventEmitter {
	private lastName: string;
	private currentName: string;

	constructor(private interval: number = 1000) {
		super();
		this.start();
	}

	private async start() {
		this.currentName = basename(await this.getActiveWindow());
		setInterval(async () => {
			this.currentName = basename(await this.getActiveWindow());

			if (!this.currentName) {
				return;
			}

			if (this.currentName && this.currentName != this.lastName) {
				this.emit('change', this.currentName);
			}

			this.lastName = this.currentName;
		}, this.interval);
	}

	private async getActiveWindow(): Promise<string> {
		return (await activeWin())?.owner.name ?? '';
	}
}
