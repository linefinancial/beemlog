/*
 * Beemlog:
 * utility function to log to console based on log level
 */

const defaultConfig = {
    emerg: true,
    alert: true,
    crit: true,
    error: true,
    warning: true,
    notice: true,
    info: true,
    debug: true
};

type Config = typeof defaultConfig;

/*
 * Where we store the current config
 */
const currentConfig = {
    ...defaultConfig,
};

/*
 * The actual log function
 * Eg: log('error', 'Something went wrong');
 */
function log(logLevel: keyof Config, ...logs: any[]) {
    if (currentConfig[logLevel]) {
        console.log(`${logLevel}:`, ...logs);
    }
};

/*
 * Configure the log levels
 */
function config(newConfig: 'prod' | 'dev' | Partial<Config>) {
    let newConfigObj: Partial<Config> = {};
    if (newConfig === 'prod') {
        newConfigObj = {
            emerg: true,
            alert: true,
            crit: true,
            error: true,
            warning: true,
            notice: true,
        };
    } else if (newConfig === 'dev') {
        newConfigObj = defaultConfig;
    } else {
        newConfigObj = newConfig;
    }
    for (const logLevel in currentConfig) {
        currentConfig[logLevel] = newConfigObj[logLevel] ?? false;
    }
}

const beemlog = {
    emerg: (...logs: any[]) => log('emerg', ...logs),
    alert: (...logs: any[]) => log('alert', ...logs),
    crit: (...logs: any[]) => log('crit', ...logs),
    error: (...logs: any[]) => log('error', ...logs),
    warning: (...logs: any[]) => log('warning', ...logs),
    notice: (...logs: any[]) => log('notice', ...logs),
    info: (...logs: any[]) => log('info', ...logs),
    debug: (...logs: any[]) => log('debug', ...logs),
    config,
}

export default beemlog;
