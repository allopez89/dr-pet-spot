import {
  AnyKeys,
  AnyObject,
  Document,
  EnforceDocument,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entitModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    select?: string,
  ): Promise<T | null> {
    return this.entitModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .select(select)
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>, select?: string) {
    return this.entitModel
      .find(entityFilterQuery, {
        __v: 0,
      })
      .select(select);
  }

  async create(
    createEntityData: (AnyKeys<T> & AnyObject) | undefined,
  ): Promise<T | null> {
    const entity: EnforceDocument<T, {}, {}> = new this.entitModel(
      createEntityData,
    );

    return await entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    return this.entitModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entitModel.deleteOne(entityFilterQuery);

    return deleteResult.deletedCount >= 1;
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entitModel.deleteMany(entityFilterQuery);

    return deleteResult.deletedCount >= 1;
  }
}
