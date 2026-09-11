import cron, { TaskFn } from "node-cron";

export const indexCron = (callback: TaskFn) => {
    if(!callback) return;

    cron.schedule("0 9 * * *", callback);
}
