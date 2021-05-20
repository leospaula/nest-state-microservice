import { Module, HttpModule } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  imports: [HttpModule],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
