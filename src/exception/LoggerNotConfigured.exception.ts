export class LoggerNotConfigured extends Error {
  constructor() {
    super(
      'Logger not initialized. Import Logger.forRoot() for logger configuration',
    );
  }
}
