import { Subject } from 'rxjs';
import { RequestState } from './RequestState';

describe('Scoped request loading', () => {
  it('waits for every overlapping request in the same section', () => {
    const state = new RequestState();
    const first = new Subject<void>();
    const second = new Subject<void>();
    state.track('initial', first).subscribe();
    state.track('initial', second).subscribe();
    first.complete();
    expect(state.busy('initial')).toBe(true);
    second.complete();
    expect(state.busy('initial')).toBe(false);
  });

  it('keeps unrelated form sections independent', () => {
    const state = new RequestState();
    const districts = new Subject<void>();
    const centers = new Subject<void>();
    state.track('districts', districts).subscribe();
    state.track('centers', centers).subscribe();
    districts.complete();
    expect(state.busy('districts')).toBe(false);
    expect(state.busy('centers')).toBe(true);
    centers.complete();
  });

  it('ends loading after failure and clears the error on retry', () => {
    const state = new RequestState();
    const request = new Subject<void>();
    state.track('search', request).subscribe(() => {}, () => {});
    request.error(new Error('offline'));
    expect(state.busy('search')).toBe(false);
    expect(state.failed('search')).toBe(true);
    const retry = new Subject<void>();
    state.track('search', retry).subscribe();
    expect(state.failed('search')).toBe(false);
    expect(state.busy('search')).toBe(true);
    retry.complete();
  });

  it('cleans up a cancelled request without reporting an error', () => {
    const state = new RequestState();
    const request = new Subject<void>();
    const subscription = state.track('save', request).subscribe();
    subscription.unsubscribe();
    expect(state.busy('save')).toBe(false);
    expect(state.failed('save')).toBe(false);
  });

  it('unsubscribes pending requests when leaving the page', () => {
    const state = new RequestState();
    const request = new Subject<void>();
    let received = false;
    state.track('search', request).subscribe(() => { received = true; });
    state.destroy();
    request.next();
    expect(received).toBe(false);
    expect(state.busy('search')).toBe(false);
    expect(state.failed('search')).toBe(false);
  });
});
