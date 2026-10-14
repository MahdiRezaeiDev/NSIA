import { defer, Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

/** Loading belongs to the affected section; overlapping requests finish independently. */
export class RequestState {
  private pending: { [key: string]: number } = {};
  private destroyed = new Subject<void>();
  private failures: { [key: string]: boolean } = {};

  busy(...keys: string[]): boolean {
    return keys.some(key => (this.pending[key] || 0) > 0);
  }

  failed(...keys: string[]): boolean { return keys.some(key => !!this.failures[key]); }

  track<T>(key: string, request: Observable<T>): Observable<T> {
    return defer(() => {
      this.pending[key] = (this.pending[key] || 0) + 1;
      this.failures[key] = false;
      return request.pipe(
        takeUntil(this.destroyed),
        tap({ error: () => { this.failures[key] = true; } }),
        finalize(() => { this.pending[key] = Math.max(0, this.pending[key] - 1); })
      );
    });
  }

  destroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
