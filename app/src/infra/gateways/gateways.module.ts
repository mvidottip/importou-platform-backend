import { Global, Module } from "@nestjs/common";
import {
  KybGateway,
  NullKybGateway,
} from "@src/infra/gateways/kyb/kyb.gateway";
import {
  NullPaymentGateway,
  PaymentGateway,
} from "@src/infra/gateways/payment/payment.gateway";
import {
  NullRadarGateway,
  RadarGateway,
} from "@src/infra/gateways/radar/radar.gateway";

@Global()
@Module({
  providers: [
    { provide: PaymentGateway, useClass: NullPaymentGateway },
    { provide: KybGateway, useClass: NullKybGateway },
    { provide: RadarGateway, useClass: NullRadarGateway },
  ],
  exports: [PaymentGateway, KybGateway, RadarGateway],
})
export class GatewaysModule {}
