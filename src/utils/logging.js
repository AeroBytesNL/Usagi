import chalk from 'chalk';
const levels = {
    none: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    all: 5,
};
function getEnv(key) {
    return process.env[key];
}
export class Logging {
    static shouldLog(level) {
        if (this.logLevel === undefined) {
            console.warn('No log level provided, place set it in .env');
        }
        if (this.logLevel === 'none')
            return false;
        if (this.logLevel === 'all')
            return true;
        return levels[level] <= levels[this.logLevel];
    }
    static formatTimestamp(date) {
        return `[${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ` +
            `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}]`;
    }
    static logToFile(level, message) {
        const basePath = getEnv('MODULES_BASE_PATH');
        if (!basePath) {
            console.warn('MODULES_BASE_PATH not set, skipping log to file.');
            return;
        }
        //appendFileSync(`${basePath}logs/app.log`, `${this.formatTimestamp(new Date())} [${level.toUpperCase()}] ${message}\n`, 'utf-8');
    }
    static info(message) {
        if (!this.shouldLog('info'))
            return;
        const now = new Date();
        console.log(`${this.formatTimestamp(now)} [${chalk.green('INFO')}] ${message}`);
        //this.logToFile('info', message);
    }
    static warn(message) {
        if (!this.shouldLog('warn'))
            return;
        const now = new Date();
        console.log(`${this.formatTimestamp(now)} [${chalk.yellow('WARN')}] ${message}`);
        //this.logToFile('warn', message);
    }
    static error(message) {
        if (!this.shouldLog('error'))
            return;
        const now = new Date();
        console.log(`${this.formatTimestamp(now)} [${chalk.red('ERROR')}] ${message}`);
        //this.logToFile('error', message);
    }
    static debug(message) {
        if (!this.shouldLog('debug'))
            return;
        const now = new Date();
        console.log(`${this.formatTimestamp(now)} [${chalk.blue('DEBUG')}] ${message}`);
        // Uncomment to enable debug logs to file:
        // this.logToFile('debug', message);
    }
}
Logging.logLevel = getEnv('LOG_LEVEL') || 'all';
