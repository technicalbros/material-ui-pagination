import * as React from "react";
export default class Pagination extends React.Component {
    props: {
        classes?: {
            button: string;
            activePage: string;
        };
        hideIfEmpty?: boolean;
        limit: number;
        total: number;
        page: number;
        onChange: (data: {
            page: number;
            offset?: number;
        }) => void;
    };
    state: any;
    readonly totalPages: number;
    nextPage(): void;
    prevPage(): void;
    renderPages(): any;
    render(): React.ReactNode;
}
