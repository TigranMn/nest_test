import { PipeTransform, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class UniqueEntity implements PipeTransform {
  constructor(private entityManager: EntityManager) {}
  async transform(value: any) {
    const d = await this.entityManager
      .getRepository('user')
      .createQueryBuilder('user')
      .where({ email: value.email })
      .getOne();
    console.log(d);
    value.id = d.id;
    return value;
  }
}
