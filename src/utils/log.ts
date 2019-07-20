type LogType = '[INFO]' | '[WARN]' | '[SUCCESS]' | '[ERROR]';

const log = (type: LogType, message: string): void => {
  console.log(`${type}  ${message}  --  ${new Date()}`);
};

class Logger {
  info(message: string): void {
    log('[INFO]', message);
  }

  warn(message: string): void {
    log('[WARN]', message);
  }

  err(message: string): void {
    log('[ERROR]', message);
  }

  success(message: string): void {
    log('[SUCCESS]', message);
  }
}

const instance = new Logger();
export default instance;
