import MemberController from "../../../controllers/member";
import MemberMiddleware from "../../../middlewares/member";
import PersonalTrainerMiddleware from "../../../middlewares/personalTrainer";
import UserMiddleware from "../../../middlewares/user";
import BaseRouter from "../../base";

class SecureMemberRouter extends BaseRouter {
  routes(): void {
    this.router.get(
      "/:memberId",
      MemberMiddleware.isMemberExist,
      MemberController.getOne
    );

    this.router.patch(
      "/manage_personal_trainer/:personalTrainerId",
      MemberMiddleware.isMember,
      PersonalTrainerMiddleware.isPersonalTrainerExist,
      MemberController.managePersonalTrainer
    );
  }
}

export default SecureMemberRouter;
