import PersonalTrainers from "../../models/personalTrainers";
import { PayloadPersonalTrainer } from "../../schemas/personalTrainers";

type TPersonalTrainerRepo = {
  create: (
    personalTrainer: PayloadPersonalTrainer
  ) => Promise<PersonalTrainers>;
};

class PersonalTrainerRepo implements TPersonalTrainerRepo {
  create = async (payload: PayloadPersonalTrainer) => {
    return await PersonalTrainers.create(payload);
  };
}

export default new PersonalTrainerRepo();
