import { sendDraftReminder, sendGhostReminder, sendInActiveReminder } from "../services/notification.services"

export const processNotifications = async () => {
    await sendDraftReminder();
    await sendGhostReminder();
    await sendInActiveReminder();
}