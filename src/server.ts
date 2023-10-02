import app from './app';

class Server {
  private port: number;

  constructor() {
    this.port = parseInt(process.env.PORT as string, 10) || 3000;
    this.startServer();
  }

  private startServer(): void {
    app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

new Server();
