import { DomainInterface } from './../interfaces/domain.interface';
import { config } from './../config/config';
import { Domain } from '../models/domain';
import { getRepository } from 'typeorm';
import { nanoid } from 'nanoid';
import { RequestType } from '../enums/RequestType';

class DomainService {
  async create(payload: DomainInterface): Promise<Domain> {
    const repository = getRepository(Domain);

    let url: string;

    if (payload.type === RequestType.SHORT) {
      url = `${config.app.scheme}://${config.app.host}/${nanoid(8)}`;
    } else {
      url = `${config.app.scheme}://${
        config.app.host
      }/${nanoid()}+${nanoid()}+${nanoid()}+${nanoid()}`;
    }

    return await repository.save(
      repository.create({ ...payload, processedUrl: url }),
    );
  }
}

export default new DomainService();
