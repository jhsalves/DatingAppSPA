export interface Message {
    id: number;
    senderId: number;
    senderKnownAs: number;
    senderPhotoUrl: number;
    recipientId: number;
    recipientKnownAs: number;
    recipientPhotoUrl: number;
    content: number;
    isRead: number;
    dateRead: number;
    messageSent: number;
}
