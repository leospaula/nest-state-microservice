import { Controller, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  NatsContext,
} from '@nestjs/microservices';
import { stateSerializeCollection, stateSerializer } from './state.helper';
import { StateService } from './state.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @MessagePattern('get-states')
  async getStates(@Payload() data: any, @Ctx() context: NatsContext) {
    const response = data && data.uf
        ? stateSerializer(await this.stateService.findState(data.uf))
        : stateSerializeCollection(await this.stateService.getStates())
    return response;
  }
}
