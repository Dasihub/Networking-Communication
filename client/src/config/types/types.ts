export interface IMessage {
    message: string
    type: 'info' | 'error' | 'warning' | 'success'
}