import { BASEURL } from './../utils/constants';
import { DomainInterface } from './../interfaces/domain.interface';
import { Domain } from '../models/domain';
import { getRepository } from 'typeorm';
import { nanoid } from 'nanoid';
import { RequestType } from '../enums/RequestType';

class DomainService {
  async create(payload: DomainInterface): Promise<Domain> {
    let newUrl: string;

    const repository = getRepository(Domain);

    const findUrl = await repository.findOne({
      url: payload.url,
      requestType: payload.type,
    });

    if (findUrl) return findUrl;

    if (payload.type === RequestType.SHORT) {
      newUrl = `${BASEURL}/${nanoid(8)}`;
    } else {
      newUrl = `${BASEURL}/${nanoid()}+${nanoid()}+${nanoid()}+${nanoid()}`;
    }

    return await repository.save(
      repository.create({
        ...payload,
        processedUrl: newUrl,
        requestType: payload.type,
      }),
    );
  }

  async lookUp(processedUrl: string): Promise<Domain> {
    const repository = getRepository(Domain);
    return await repository.findOne({ processedUrl });
  }
}

export default new DomainService();
