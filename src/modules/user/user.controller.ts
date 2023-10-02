

// // export const authorize = (req: Request, res: Response) => {
// //   const auth0Domain = 'dev-w6baolwuvs2zf4z2.us.auth0.com'; // Replace with your Auth0 domain
// //   const clientId = 'U2NU6UJAv04OtDaYVIfogPdDLcevMcEA'; // Replace with your Auth0 client ID
// //   const redirectUri = 'http://localhost:3000/calback'; // Replace with your server's callback URL

// //   const auth0AuthorizeUrl = `https://${auth0Domain}/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid profile email&audience=your-api-identifier`;

// //   res.redirect(auth0AuthorizeUrl);
// // };

// import passport from 'passport';
// import { Request, Response, NextFunction } from 'express';

// export const login = passport.authenticate('auth0', {
//   scope: 'openid profile email offline_access',
// });

// export const callback = passport.authenticate('auth0', {
//   failureRedirect: '/login',
// });

// export const logout = (req: Request, res: Response) => {
//   // req.logout();
//   res.redirect('/');
// };

// // export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
// //   if (req.isAuthenticated()) {
// //     return next();
// //   }
// //   res.redirect('/login');
// // };

// export const welcome = (req: Request, res: Response) => {
//   res.send('Welcome to the home page');
// };

// export const profile = (req: Request, res: Response) => {
//   res.send(`Welcome, ${req.user}!`);
// };


// controller.ts

import { Request, Response, NextFunction } from 'express';
import { firstNonRepeatingCharacter, printSpiralMatrix, findTwoOddOccurringElementsWithCount } from '../../helper/DSfunction';

export const findFirstNonRepeatingCharacter = (req: Request, res: Response, next: NextFunction) => {
    try {
        const inputString = req.body.inputString as string;
        if (!inputString) {
            res.status(400).json({ error: 'Missing inputString query parameter' });
            return;
        }
        const result = firstNonRepeatingCharacter(inputString);
        res.json({ result });
    } catch (error) {
        next(error);
    }
};

export const spiralMatrix = (req: Request, res: Response, next: NextFunction) => {
    try {
        const inputString = req.body.inputString as number;
        if (!inputString) {
            res.status(400).json({ error: 'Missing inputString query parameter' });
            return;
        }
        const result = printSpiralMatrix(inputString);
        res.json({ result });
    } catch (error) {
        next(error);
    }
};

export const findTwoOddOccurring = (req: Request, res: Response, next: NextFunction) => {
    try {
        const arr: number[] = req.body.inputArray
        if (!arr) {
            res.status(400).json({ error: 'Missing inputArray parameter' });
            return;
        }
        const results = findTwoOddOccurringElementsWithCount(arr);
        res.json({ results })
    } catch (error) {
        next(error);
    }
};
