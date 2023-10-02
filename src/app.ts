import express, { Application, Request, Response, NextFunction } from 'express';
import { Database } from '../src/connection/db';
import session from 'express-session';
import itemsRouter from './modules/user/user.route';
import { Strategy as Auth0Strategy } from 'passport-auth0';
import passport from 'passport';
import crypto from 'crypto';
import userModel from '../src/modules/user/user.model';

class App {
    public app: Application;
    private randomKey: string = crypto.randomBytes(32).toString('hex');
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.errorHandling();
        this.connectDatabase('mongodb+srv://shams1234:shams1234@cluster0.3jrtd.mongodb.net/?retryWrites=true&w=majority');
        this.configureSession()
        this.configurePassport();
        this.setupRoutes()
    }

    private config(): void {
        this.app.use(express.json());

    }
    private configureSession() {
        this.app.use(
            session({
                secret: this.randomKey,
                resave: false,
                saveUninitialized: false,
            })
        );
    }

    private routes(): void {
        this.app.use('', itemsRouter);
    }

    private configurePassport() {
        const strategy = new Auth0Strategy(
            {
                domain: 'dev-w6baolwuvs2zf4z2.us.auth0.com',
                clientID: 'qCbUUXXnyI87EdNoV8IpHDFtWptR7CjV',
                clientSecret: 'fxAVWtcKv-SOQ90CJkq7sZqTzOkF4K4uk9ZYcP1m2gkKxNmdb9HcSCTnGa6gf0jX',
                callbackURL: 'http://localhost:3000/callback',
                state: true
            },
            (accessToken: string, refreshToken: string, extraParams, profile: any, done: any) => {
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
                return done(null, profile);
            }
        );

        passport.use(strategy);
        passport.serializeUser((user: any, done) => {
            done(null, user);
        });
        passport.deserializeUser((user: any, done) => {
            done(null, user);
        });

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private setupRoutes() {
        const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
            if (req.isAuthenticated()) {
                return next();
            }
            res.redirect('/login');
        };

        this.app.get('/', (req: Request, res: Response) => {
            res.send('Welcome to the home page');
        });

        this.app.get('/login', passport.authenticate('auth0', { scope: 'openid profile email offline_access' }));

        this.app.get('/callback', passport.authenticate('auth0', { failureRedirect: '/login' }), (req: Request, res: Response) => {
            res.redirect('/register');
        });

        this.app.get('/logout', (req: Request, res: Response) => {
            req.logout(() => {
                res.redirect('/');
            });
        });

        this.app.get('/register', isAuthenticated, async (req: Request, res: Response) => {
            try {
                const user = req.user as Record<string, any>;
                const isUserExits = await userModel.findOne({ email: user.emails[0].value })
                if (isUserExits) {
                    res.send({ message: "User already Resister", result: isUserExits })
                } else {
                    const userName = user.displayName;
                    const email = user.emails[0].value;
                    const profileImage = user.picture;
                    const accessToken = user.accessToken;
                    const refreshToken = user.refreshToken;
                    const newUser = new userModel({
                        userName,
                        email,
                        profileImage,
                        accessToken,
                        refreshToken
                    });
                    await newUser.save();
                    res.send({ message: "User Register successflly", result: newUser });
                }
            } catch (error) {
                res.status(500).send('Error saving user.');
            }
        });


    }
    private async connectDatabase(URL: string): Promise<void> {
        const database = new Database();
        await database.connectDb(URL); // Replace with your MongoDB URI
    }

    private errorHandling(): void {
        this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ message: 'Something went wrong!' });
        });
    }
}

export default new App().app;
