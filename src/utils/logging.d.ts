export declare class Logging {
    private static logLevel;
    private static shouldLog;
    private static formatTimestamp;
    private static logToFile;
    static info(message: string | number): void;
    static warn(message: string | number): void;
    static error(message: string | number): void;
    static debug(message: string | number): void;
}
