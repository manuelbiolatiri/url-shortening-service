import { Domain } from '../models/domain';
import { getRepository } from 'typeorm';

class DomainService {
  async create(payload: Partial<Domain>) {
    const repository = getRepository(Domain);
    return await repository.save(repository.create(payload));
  }
}

export default new DomainService();
