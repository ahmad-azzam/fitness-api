import PersonalTrainers from "../../models/personalTrainers";
import { PayloadPersonalTrainer } from "../../schemas/personalTrainers";

type TPersonalTrainerService = {
  create: (payload: PayloadPersonalTrainer) => Promise<PersonalTrainers>;
};

class PersonalTrainerService implements TPersonalTrainerService {
  create = async (payload: PayloadPersonalTrainer) => {
    return await PersonalTrainers.create(payload);
  };
}

export default new PersonalTrainerService();
