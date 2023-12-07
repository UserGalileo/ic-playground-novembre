import {Client} from "../models";
import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {delay, of} from "rxjs";

let clients: Client[] = [
  {
    id: 'client-1',
    name: 'Mario Rossi'
  },
  {
    id: 'client-2',
    name: 'John Doe'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  // httpClient = inject(HttpClient);

  loadClients() {
    return of(clients).pipe(
      delay(1000)
    )
  }

  deleteClient(id: string) {
    clients = clients.filter(c => c.id !== id);
    return of(id).pipe(
      delay(1000)
    )
  }

  addClient(client: Omit<Client, 'id'>) {
    const newClient = { ...client, id: '' + Math.random() };
    clients = [...clients, newClient];
    return of(newClient).pipe(
      delay(1000)
    )
  }
}
