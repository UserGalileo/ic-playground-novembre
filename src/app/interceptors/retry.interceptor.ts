import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable, retry, tap} from "rxjs";

export function retryInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  return next(req).pipe(
    tap({
      error: err => console.error('aiaiai, ', err)
    }),
    retry({
      count: 3,
      delay: 1000
    })
  );
}
