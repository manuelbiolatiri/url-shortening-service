import { Domain } from '../models/domain';
import { getRepository } from 'typeorm';

class DomainService {
  async create(payload: any) {
    const repository = getRepository(Domain);
    return await repository.save(payload);
  }
}

export default new DomainService();
