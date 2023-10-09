/*
 * Utility function to log to console based on log level
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
 * Eg: beemlog('error', 'Something went wrong');
 */
const beemlog = (
    logLevel: keyof Config,
    ...logs: any[]
) => {
    if (currentConfig[logLevel]) {
        console.log(`${logLevel}: `, ...logs);
    }
};

/*
 * Configure the log levels
 */
beemlog.config = function(newConfig: 'prod' | 'dev' | Partial<Config>) {
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
        currentConfig[logLevel] = newConfig[logLevel] ?? false;
    }
}

export default beemlog;
