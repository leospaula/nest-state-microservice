import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StateService {
  constructor(private http: HttpService){}

  async getStates() {
    return lastValueFrom(this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            .pipe(
              map(response => response.data)
            ))
  }

  async findState(uf) {
    return lastValueFrom(this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            .pipe(
              map(response => response.data.find(state => state.sigla.toLowerCase() == uf))
            ))
  }
}
