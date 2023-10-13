export interface IFeedback {
    type: "error" | "success" | null;
    message: string;
}