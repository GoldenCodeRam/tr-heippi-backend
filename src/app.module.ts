import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './controllers/user/user.controller';
import { EmailService } from './services/email/email.service';
import { CryptoService } from './services/crypto/crypto.service';
import { HospitalController } from './controllers/hospital/hospital.controller';
import { PatientController } from './controllers/patient/patient.controller';
import { MedicController } from './controllers/medic/medic.controller';

@Global()
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController, UserController, HospitalController, PatientController, MedicController],
  providers: [EmailService, CryptoService],
  exports: [EmailService, CryptoService],
})
export class AppModule {}
