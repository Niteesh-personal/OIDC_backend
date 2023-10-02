import express from 'express';
import * as authController from './user.controller';

const authRouter = express.Router();

authRouter.post('/firstNonRepeatChar', authController.findFirstNonRepeatingCharacter);
authRouter.post('/spiralMatrix', authController.spiralMatrix);
authRouter.post('/twoOddOccuring', authController.findTwoOddOccurring);


export default authRouter;

