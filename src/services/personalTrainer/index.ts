import PersonalTrainers from "../../models/personalTrainers";
import { PayloadPersonalTrainer } from "../../schemas/personalTrainers";

type TPersonalTrainerService = {
  create: (payload: PayloadPersonalTrainer) => Promise<PersonalTrainers>;
  getById: (id: string) => Promise<PersonalTrainers | null>;
};

class PersonalTrainerService implements TPersonalTrainerService {
  create = async (payload: PayloadPersonalTrainer) => {
    return await PersonalTrainers.create(payload);
  };

  getById = async (id: string) => {
    return await PersonalTrainers.findByPk(id);
  };
}

export default new PersonalTrainerService();
