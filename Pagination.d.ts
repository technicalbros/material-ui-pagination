import * as React from "react";
import PaginationProps from "./PaginationProps";
import PaginationState from "./PaginationState";
export default class Pagination extends React.Component<PaginationProps, PaginationState> {
    state: PaginationState;
    readonly totalPages: number;
    nextPage(): void;
    prevPage(): void;
    renderPages(): any;
    private closeDialog;
    private changePage;
    render(): React.ReactNode;
}
