import PersonalTrainers from "../../models/personalTrainers";
import { PayloadPersonalTrainer } from "../../schemas/personalTrainers";
import PersonalTrainerRepo from "../../repositories/personalTrainers";

type TPersonalTrainerService = {
  create: (payload: PayloadPersonalTrainer) => Promise<PersonalTrainers>;
};

class PersonalTrainerService implements TPersonalTrainerService {
  create = async (payload: PayloadPersonalTrainer) => {
    return await PersonalTrainerRepo.create(payload);
  };
}

export default new PersonalTrainerService();
