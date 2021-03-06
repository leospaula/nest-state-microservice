import { Controller, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  NatsContext,
  ClientProxy, 
  Client
} from '@nestjs/microservices';
import { stateSerializeCollection, stateSerializer } from './state.helper';
import { StateService } from './state.service';
import { lastValueFrom } from 'rxjs';
import { natsConfig } from './nats.config';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Client(natsConfig)

  client: ClientProxy;

  @MessagePattern('get-states')
  async getStates(@Payload() data: any, @Ctx() context: NatsContext) {
    if (data && data.uf){
      return stateSerializer(await this.stateService.findState(data.uf))
    } else {
      return await this.stateService.getStates().then(async states => {
        return await Promise.all(states.map(async (state)=>{
          const population = await lastValueFrom(this.client.send('get-population', { uf: state.sigla.toLowerCase(), code: state.id }))
          state['populacao'] = population.populacao

          return state
        })).then(states => {
          return { estados: stateSerializeCollection(states) }
        })
      })
    }
  }
}
