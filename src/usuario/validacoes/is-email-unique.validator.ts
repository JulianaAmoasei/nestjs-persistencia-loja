import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailEhUnicoConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async validate(value: string): Promise<boolean> {
    const possibleUser = await this.usuarioRepository.findAndCountBy({
      email: value,
    });
    return possibleUser.length > 0;
  }
}

export const IsEmailUnique = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailEhUnicoConstraint,
    });
  };
};
