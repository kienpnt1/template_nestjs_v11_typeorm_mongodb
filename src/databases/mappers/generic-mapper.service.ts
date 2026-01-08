import { Injectable } from '@nestjs/common';
import { IMapperDatabase } from './interface.mapper';

@Injectable()
export class GenericMapperService<M, E> implements IMapperDatabase<M, E> {
  fromModelToEntity(model: M, EntityClass: new () => E): E {
    if (!model) return;
    const entity = new EntityClass();
    Object.assign(entity, model);
    return entity;
  }

  fromEntityToModel(entity: E, ModelClass: new () => M): M {
    if (!entity) return;
    const model = new ModelClass();
    Object.assign(model, entity);
    return model;
  }

  forUpdate(entity: E, model: M): E {
    if (!entity || !model) return;
    Object.assign(entity, model);
    return entity;
  }
}
