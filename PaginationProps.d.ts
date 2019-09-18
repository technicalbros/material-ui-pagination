import PageChangeData from "./PageChangeData";
export default interface PaginationProps {
    classes?: {
        button: string;
        activePage: string;
    };
    hideIfEmpty?: boolean;
    limit: number;
    total: number;
    page: number;
    onChange: (data: PageChangeData) => void;
}
