import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, any>();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!this.isCacheable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);

    return cachedResponse
      ? of(cachedResponse)
      : this.sendRequest(req, next);
  }

  private sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, event);
        }
      })
    )
  }

  private isCacheable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }
}
