import Relive from '$lib/components/relive.svelte';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

describe('Relive', () => {
	it('mounts with default props', async () => {
		const { container } = render(Relive);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const reliveId = 'abcd1234';
		const { getByTitle } = render(Relive, {
			reliveId,
			width: '500px',
			disable_observer: true,
		});
		const iframe = getByTitle(`relive-${reliveId}`);
		const expected_src = `https://www.relive.cc/view/${reliveId}/widget`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom width', async () => {
		const { container } = render(Relive, {
			reliveId: 'efgh5678',
			width: '80%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const div = iframe?.parentElement;
		expect(div?.style.width).toBe('80%');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Relive, {
			reliveId: 'ijkl9012',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});
