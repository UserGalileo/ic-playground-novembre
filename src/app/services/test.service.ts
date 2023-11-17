import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TestService {

  foo = false;

  constructor() {
    console.log('Test Service!')
  }
}


@Injectable({ providedIn: 'root' })
export class NewTestService {

  constructor() {
    console.log('New Test Service!')
  }
}
