export interface IButtonProps {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    navigate?: string;
    onClick?: () => void;
    style: IButtonStyles;
}

export type IButtonStyles = "primary" | "secondary" | "submit" | "disabled";