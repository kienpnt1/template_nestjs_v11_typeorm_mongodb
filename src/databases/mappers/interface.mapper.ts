export interface IMapperDatabase<M, E> {
  fromModelToEntity(model: M, EntityClass: new () => E): E;
  fromEntityToModel(entity: E, ModelClass: new () => M): M;
  forUpdate(entity: E, model: M): E;
}
